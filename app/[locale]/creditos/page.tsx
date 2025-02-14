import React from "react";
import { useTranslations } from "next-intl";

const CreditosBotopia = () => {
  const t = useTranslations("Credits");

  return (
    <div className="mt-16 md:mt-24 bg-gradient-to-b from-purple-700 to-white text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center py-12 md:py-28">
        {/* Título */}
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          {t("Title")} <br /><span className="text-gradient-to-r from-purple-700 to-black">Botopia Technology S.A.S</span>!
        </h2>

        {/* Descripción */}
        <p className="text-white text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed justify-center p-6">
          {t("Description")}
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col justify-center items-center gap-4">
          <a
            href="https://botopia.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold animate-bounce bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 sm:px-6 rounded-lg shadow-lg shadow-gray-500 transition-all duration-300 sm:text-base w-full text-center"
          >
            {t("CTA.More")}
          </a>
          <a
            href="https://botopia.tech/contacto"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:bg-purple-600 text-black py-3 px-4 sm:px-6 rounded-lg shadow-lg shadow-gray-500 transition-all duration-300 text-sm w-full text-center"
          >
            {t("CTA.Contact")}
          </a>
        </div>
      </div>

      {/* Decoración o ícono */}
      <div className="mt-8 sm:mt-12">
        <img
          src="/botopia.svg"
          alt="Botopia Logo"
          className="mx-auto w-16 h-auto"
        />
      </div>
    </div>
  );
};

export default CreditosBotopia;
