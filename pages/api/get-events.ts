import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets'
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Eventos!A1:T', // Asegúrate de ajustar el rango a tus datos
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json({ success: true, events: [] });
    }

    // Obtener las filas, ignorando la primera fila (encabezados)
    const headers = rows[0];
    const events = rows.slice(1).map((row) => {
      const event = headers.reduce((acc, header, index) => {
        acc[header] = row[index] || '';
        return acc;
      }, {});
      return event;
    });

    // Filtrar eventos aprobados
    const approvedEvents = events.filter((event) => event['Estado'] === 'Aprobado');

    return res.status(200).json({ success: true, events: approvedEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
