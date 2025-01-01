'use client';
import React, { FormEvent, useState } from 'react';
import useSubmitEvent from '@/hooks/useSubmitEvent';
import { set } from 'mongoose';

const AddEvent = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState('https://example.com/default-logo.png');
  const [link, setLink] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativePhone, setRepresentativePhone] = useState('');
  const [representativeId, setRepresentativeId] = useState('');

  const { submitEvent, isLoading, message } = useSubmitEvent();

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      name,
      description,
      date,
      time,
      location,
      logo: logo || 'https://example.com/default-logo.png',
      link,
      companyName,
      companyEmail,
      companyId,
      representativeName,
      representativePhone,
      representativeId,
    }  

    const response = await fetch('/api/submit',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
    console.log(response)
    const content = await response.json();

    console.log(content)

    alert(content.data.tableRange)

    setName('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setLogo('');
    setLink('');
    setCompanyName('');
    setCompanyEmail('');
    setCompanyId('');
    setRepresentativeName('');
    setRepresentativePhone('');
    setRepresentativeId('');   

    //Submit via API
    console.log(form);
  }

  const handleFileChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      name,
      description,
      date,
      time,
      location,
      logo,
      link,
      companyName,
      companyEmail,
      companyId,
      representativeName,
      representativePhone,
      representativeId,
    }  
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Agrega tu Evento</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {/* Información de la Empresa */}
          <h2 className="text-xl font-bold mb-4">Información de la Empresa</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Nombre de la Empresa
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              type="text"
              name="companyName"
              placeholder="Escribe el nombre de la empresa"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyEmail">
              Email de la Empresa
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyEmail"
              type="email"
              name="companyEmail"
              placeholder="Correo electrónico de la empresa"
              value={companyEmail}
              onChange={e => setCompanyEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyId">
              NIT o Identificación Fiscal
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyId"
              type="text"
              name="companyId"
              placeholder="Número de identificación de la empresa"
              value={companyId}
              onChange={e => setCompanyId(e.target.value)}
              required
            />
          </div>

          {/* Información del Representante */}
          <h2 className="text-xl font-bold mb-4">Información del Representante</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="representativeName">
              Nombre del Representante
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeName"
              type="text"
              name="representativeName"
              placeholder="Escribe el nombre del representante"
              value={representativeName}
              onChange={e => setRepresentativeName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="representativePhone">
              Teléfono del Representante
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativePhone"
              type="tel"
              name="representativePhone"
              placeholder="Teléfono del representante"
              value={representativePhone}
              onChange={e => setRepresentativePhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="representativeId">
              Cédula o Identificación Oficial
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeId"
              type="text"
              name="representativeId"
              placeholder="Número de identificación del representante"
              value={representativeId}
              onChange={e => setRepresentativeId(e.target.value)}
              required
            />
          </div>

          {/* Información del Evento */}
          <h2 className="text-xl font-bold mb-4">Información del Evento</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Nombre del Evento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="eventName"
              type="text"
              name="eventName"
              placeholder="Escribe el nombre del evento"
              value={name}
              onChange={ e => setName(e.target.value) }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              placeholder="Escribe una breve descripción del evento"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Fecha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Hora
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              name="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Ubicación
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              name="location"
              placeholder="Escribe la ubicación o el enlace si es virtual"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
              Logo del Evento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="logo"
              type="file"
              name="logo"
              accept="image/*"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
              Enlace del Evento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="link"
              type="url"
              name="link"
              placeholder="Enlace oficial del evento"
              value={link}
              onChange={e => setLink(e.target.value)}
              required
            />
          </div>

          {/* Botón Enviar */}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
          {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default AddEvent;
