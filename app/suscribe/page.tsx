'use client';
import React, { useState } from 'react';

const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    empresa: '',
    ciudad: '',
    pais: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      sheetName: 'Newsletter', // Nombre de la hoja en Google Sheets
      ...formData,
    };

    try {
      const endpoint = process.env.NEXT_PUBLIC_GOOGLE_ENDPOINT;
      if (!endpoint) {
        throw new Error('NEXT_PUBLIC_GOOGLE_ENDPOINT is not defined');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Suscripción enviada con éxito');
        setFormData({
          nombre: '',
          correo: '',
          empresa: '',
          ciudad: '',
          pais: '',
        });
      } else {
        alert('Hubo un error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al enviar los datos');
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Suscríbete al Newsletter</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Escribe tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Correo */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="correo"
              type="email"
              name="correo"
              placeholder="Escribe tu correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Empresa */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
              Empresa
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="empresa"
              type="text"
              name="empresa"
              placeholder="Escribe el nombre de tu empresa"
              value={formData.empresa}
              onChange={handleChange}
            />
          </div>

          {/* Ciudad */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciudad">
              Ciudad
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ciudad"
              type="text"
              name="ciudad"
              placeholder="Escribe tu ciudad"
              value={formData.ciudad}
              onChange={handleChange}
            />
          </div>

          {/* País */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pais">
              País
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pais"
              type="text"
              name="pais"
              placeholder="Escribe tu país"
              value={formData.pais}
              onChange={handleChange}
            />
          </div>

          {/* Botón Enviar */}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Suscribirse
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
