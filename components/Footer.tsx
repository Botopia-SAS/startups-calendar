'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer'); // Traducciones del namespace 'Footer'

  return (
    <footer className="bg-gray-50 text-black py-4 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo o Información */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Startups Calendar Logo"
            className="h-8"
          />
          <span className="text-sm md:text-base">{t('Copyright')}</span>
        </div>

        {/* Navegación */}
        <nav className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="/politicas"
            className="text-sm md:text-base text-gray-400 hover:text-white"
          >
            {t('Policies')}
          </a>
          <a
            href="/privacidad"
            className="text-sm md:text-base text-gray-400 hover:text-white"
          >
            {t('Privacy')}
          </a>
          <a
            href="/contacto"
            className="text-sm md:text-base text-gray-400 hover:text-white"
          >
            {t('Contact')}
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
