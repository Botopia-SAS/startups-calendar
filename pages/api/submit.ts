import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

type SheetForm = {
    name: String
    description: String
    date: String
    time: String
    location: String
    logo: String
    link: String
    companyName: String
    companyEmail: String
    companyId: String
    representativeName: String
    representativePhone: String
    representativeId: String
    price: String
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Method not allowed' });
    }

    const body = req.body as SheetForm;
    console.log('Clave:', process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'));

    try {
        //prepare auth
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets'
            ]
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Eventos!A1:O1', // Incluye las nuevas columnas
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[
                    body.name || '',
                    body.description || '',
                    body.date || '',
                    body.time || '',
                    body.location || '',
                    body.logo || '',
                    body.link || '',
                    body.companyName || '',
                    body.companyEmail || '',
                    body.companyId || '',
                    body.representativeName || '',
                    body.representativePhone || '',
                    body.representativeId || '',
                    body.price || '',
                    'Pendiente', // Estado predeterminado
                ]],
            },
        });


        console.log(response.data);

        return res.status(200).json({
            success: true,
            message: 'Evento enviado con éxito.',
            data: response.data
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
}