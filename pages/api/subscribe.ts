import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type SubscriberForm = {
  fullName: string;
  email: string;
  company: string;
  city: string;
  country: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body as SubscriberForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Agregar los datos a Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Newsletter!A1:E1', // Cambia el rango para incluir la columna de país
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [body.fullName, body.email, body.company, body.city, body.country],
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Suscripción realizada con éxito.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
