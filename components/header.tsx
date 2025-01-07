'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const Header = () => {
  const t = useTranslations('Header'); // Traducciones del namespace 'Header'
  const router = useRouter();
  const pathname = usePathname(); // Obtén la ruta actual

  // Estado para el idioma actual
  const [currentLanguage, setCurrentLanguage] = useState('es');

  useEffect(() => {
    // Obtener el idioma actual de la URL
    const locale = pathname?.split('/')[1] || 'es'; // Suponiendo que el idioma está al inicio de la ruta
    setCurrentLanguage(locale);
  }, [pathname]);

  const changeLanguage = (lang: string) => {
    if (lang !== currentLanguage && pathname) {
      const newPathname = `/${lang}${pathname.replace(/^\/[a-z]{2}/, '')}`;
      router.push(newPathname);
    }
  };

  return (
    <header className="bg-white shadow w-full z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center py-4 space-x-6">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Startups Calendar Logo"
              className="h-8 md:h-12"
            />
          </a>

          {/* Dropdown para cambiar idioma */}
          <div className="relative flex items-center space-x-6">
            <select
              value={currentLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="es">Es</option>
              <option value="en">En</option>
            </select>
          </div>

          {/* Navigation Links */}
          <nav className="flex justify-end space-x-6">
            <a
              href="/noticias"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              {t('Aboutus')}
            </a>
            <a
              href="/blog"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              {t('Blog')}
            </a>
            <a
              href="/aliados"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              {t('Partners')}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
