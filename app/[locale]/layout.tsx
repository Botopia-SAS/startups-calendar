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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Rubik+Vinyl&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-gray-50 flex flex-col h-[100dvh] font-roboto">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
