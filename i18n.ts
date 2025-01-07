import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ['en', 'es']; // Idiomas soportados

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;
    if (!locale || !locales.includes(locale)) {
        notFound(); // Mostrar una página 404 si el locale no es válido
    }

    // Cargar los mensajes del idioma correspondiente
    const messages = await import(`./messages/${locale}.json`).then((mod) => mod.default);

    return {
        locale,
        messages, // Devuelve los mensajes traducidos
    };
});
