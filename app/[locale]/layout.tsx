import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/header';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata = {
  title: 'Startups Calendar',
  description: 'Descubre los próximos eventos de Startups y Tecnología',
};

export default async function RootLayout({
  children,
  params,
 }: {
   children: React.ReactNode;
   params: Promise<{ locale: string }>;  
  }) {
    const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={(await params).locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 flex flex-col h-[100dvh] font-roboto">
        <NextIntlClientProvider locale={(await params).locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
