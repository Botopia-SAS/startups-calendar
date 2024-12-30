import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo o Información */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Startups Calendar Logo"
            className="h-8"
          />
          <span className="text-sm md:text-base">© 2023 Startups Calendar</span>
        </div>

        {/* Navegación */}
        <nav className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="/politicas"
            className="text-sm md:text-base text-gray-400 hover:text-white"
          >
            Políticas
          </a>
          <a
            href="/privacidad"
            className="text-sm md:text-base text-gray-400 hover:text-white"
          >
            Privacidad
          </a>
          <a
            href="/contacto"
            className="text-sm md:text-base text-gray-400 hover:text-white"
          >
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
