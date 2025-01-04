'use client';
import React from 'react';

const TermsAndConditions = () => {
    return (
        <section className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
            <div className="max-w-prose mx-auto">

                {/* Título */}
                <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
                    Términos y Condiciones de Captación de Datos
                </h1>

                {/* Contenido */}
                <div className="text-gray-700 leading-relaxed text-justify space-y-5 text-sm sm:text-base">
                    <p>
                        <strong className="text-gray-900">1. Recopilación de Datos Personales:</strong> Al completar este formulario,
                        estarás proporcionando información personal que puede incluir, pero no se limita a,
                        tu nombre, dirección de correo electrónico, número de teléfono y otra información relevante.
                    </p>
                    <p>
                        <strong className="text-gray-900">2. Uso de Datos:</strong> Los datos recopilados a través de este formulario serán utilizados
                        con el propósito de tenerte en nuestra base de datos, compartir tu información con aliados
                        relevantes y comunicarnos contigo para compartirte información relevante de Startups Calendar.
                    </p>
                    <p>
                        <strong className="text-gray-900">3. Privacidad y Confidencialidad:</strong> Mantenemos la confidencialidad y la seguridad
                        de tus datos personales. No compartiremos, venderemos ni alquilaremos tu información a terceros
                        sin tu consentimiento (el cual otorgas a Startups Calendar al enviar tus datos) a menos que sea requerido por ley.
                    </p>
                    <p>
                        <strong className="text-gray-900">4. Consentimiento:</strong> Al enviar este formulario, otorgas tu consentimiento para que
                        recopilemos, almacenemos y procesemos tus datos personales de acuerdo con estos términos y condiciones.
                    </p>
                    <p>
                        <strong className="text-gray-900">5. Derechos del Titular de los Datos:</strong> Tienes derecho a acceder a tus datos personales,
                        corregirlos, eliminarlos y objetar su procesamiento. Si deseas ejercer alguno de estos derechos,
                        contáctanos a través de{' '}
                        <a
                            href="mailto:contacto@botopia.tech"
                            className="text-blue-500 font-medium hover:underline"
                        >
                            contacto@botopia.tech
                        </a>.
                    </p>
                    <p>
                        <strong className="text-gray-900">6. Cookies y Tecnologías de Rastreo:</strong> Podemos utilizar cookies u otras tecnologías de rastreo
                        para mejorar tu experiencia en nuestro sitio web. Puedes revisar nuestra Política de Cookies para
                        obtener más información al respecto.
                    </p>
                    <p>
                        <strong className="text-gray-900">7. Cambios en los Términos y Condiciones:</strong> Nos reservamos el derecho de modificar estos
                        términos y condiciones en cualquier momento. Cualquier cambio será publicado en esta página.
                    </p>
                    <p>
                        <strong className="text-gray-900">8. Menores de Edad:</strong> Este formulario no está dirigido a menores de edad. Si eres menor
                        de edad, debes obtener el consentimiento de tus padres o tutores antes de completar este formulario.
                    </p>
                    <p>
                        Al completar y enviar este formulario, confirmas que has leído y entendido estos términos y condiciones,
                        y estás de acuerdo en cumplir con ellos. Si no estás de acuerdo, te recomendamos que no completes el formulario.
                        Si tienes alguna pregunta o inquietud acerca de estos términos y condiciones, por favor contáctanos antes de proceder.
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        Fecha de entrada en vigencia: <strong>14/08/2023</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                        <strong>Startups Calendar</strong> powered by <strong>Botopia Technology S.A.S.</strong> and <strong>Lens PR</strong>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;
