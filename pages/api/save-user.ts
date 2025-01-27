import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const data = req.body;

    // Obtener la IP del usuario
    const forwarded = req.headers['x-forwarded-for'] as string | undefined;
    const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress || 'Unknown IP';

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Verificar si la hoja "Visitors" existe
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });
    const sheetNames = sheetMetadata.data.sheets?.map((sheet) => sheet.properties?.title);
    if (!sheetNames?.includes('Visitors')) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: 'Visitors' },
              },
            },
          ],
        },
      });
    }

    // Leer las IPs ya registradas
    const existingIps = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Visitors!E2:E', // Columna de IPs
    });

    const ipList = existingIps.data.values?.flat() || [];
    if (ipList.includes(ip)) {
      return res.status(200).json({ success: false, message: 'IP ya registrada' });
    }

    // Agregar los datos junto con la IP a la hoja "Visitors"
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Visitors!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            data.name,
            data.company,
            data.country,
            data.email,
            ip,
            new Date().toISOString(),
          ],
        ],
      },
    });

    res.status(200).json({ success: true, message: 'Datos guardados en Google Sheets' });
  } catch (error) {
    console.error('Error guardando en Google Sheets:', error);
    res.status(500).json({ success: false, message: 'Error al guardar en Google Sheets' });
  }
}
