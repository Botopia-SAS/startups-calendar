// app/layout.tsx
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/header';

export const metadata = {
  title: 'Startups Calendar',
  description: 'Descubre los próximos eventos de Startups y Tecnología',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 flex flex-col h-[100dvh] font-roboto">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
