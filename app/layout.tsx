// app/layout.tsx
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/header';
import { Roboto } from '@next/font/google';
import { Montserrat } from '@next/font/google';

// Configuración de la fuente Roboto
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

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
    <html lang="en" className={montserrat.className}>
      <body className="bg-gray-100 flex flex-col h-[100dvh]">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
