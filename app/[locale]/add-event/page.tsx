'use client';
import React, { FormEvent, useState } from 'react';
import useSubmitEvent from '@/hooks/useSubmitEvent';
import Link from 'next/link';

const AddEvent = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState(''); // Hora de finalización
  const [location, setLocation] = useState('');
  const [isDateTBD, setIsDateTBD] = useState(false); // Por definir para Fecha
  const [isEndDateTBD, setEndIsDateTBD] = useState(false); // Por definir para Fecha
  const [isEndDateNA, setIsEndDateNA] = useState(false);
  const [isTimeTBD, setIsTimeTBD] = useState(false); // Por definir para Hora
  const [isEndTimeTBD, setIsEndTimeTBD] = useState(false); // Por definir para Hora de Finalización
  const [isLocationTBD, setIsLocationTBD] = useState(false); // Por definir para Ubicación
  const [logo, setLogo] = useState('https://example.com/default-logo.png');
  const [link, setLink] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativeRole, setRepresentativeRole] = useState(''); // Cargo del representante
  const [representativeEmail, setRepresentativeEmail] = useState(''); // Correo del representante
  const [representativePhone, setRepresentativePhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('+57'); // Código del celular
  const [representativeLinkedIn, setRepresentativeLinkedIn] = useState(''); // Nuevo estado para LinkedIn
  const [representativeId, setRepresentativeId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [messageimg, setMessage] = useState('');
  const [isLoadingg, setIsLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [isPriceTBD, setIsPriceTBD] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [currency, setCurrency] = useState(''); // Moneda seleccionada
  const [isInvitationOnly, setIsInvitationOnly] = useState(false); // Nuevo estado


  const { submitEvent, isLoading, message } = useSubmitEvent();

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setLogo(data.secure_url); // Guarda el enlace público de la imagen
      setMessage('Imagen cargada con éxito');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setMessage('Error al subir la imagen. Por favor, intenta nuevamente.');
    } finally {
      setIsUploading(false);
      setIsLoading(false); // Restablece el estado de carga
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const finalForm = {
      name,
      description,
      date: isDateTBD ? 'Por definir' : date,
      endDate: isEndDateTBD ? 'Por definir' : isEndDateNA ? 'No aplica' : endDate,
      time: isTimeTBD ? 'Por definir' : time,
      endTime: isEndTimeTBD ? 'Por definir' : endTime,
      location: isLocationTBD ? 'Por definir' : location,
      link: isInvitationOnly ? `${link || '(Solo con invitación)'}` : link,
      price: isFree ? 'Gratis' : isPriceTBD ? 'Por definir' : `${price} ${currency}`,

    };

    const form = {
      name,
      description,
      date: finalForm.date,
      endDate: finalForm.endDate,
      time: finalForm.time,
      endTime: finalForm.endTime,
      location: finalForm.location,
      logo: logo || 'https://example.com/default-logo.png',
      link: finalForm.link,
      companyName,
      companyEmail,
      companyId,
      representativeName,
      representativeRole, // Cargo del representante
      representativeEmail, // Correo del representante
      representativePhone: `${phoneCode.replace('+', '')} ${representativePhone}`, // Elimina el símbolo '+' del código // Código del celular + teléfono
      representativeLinkedIn, // Incluido en los datos enviados
      representativeId,
      price: finalForm.price,
      status: 'Pendiente', // Estado predeterminado
    }

    const response = await fetch('/api/submit', {
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

    alert(content.message)

    // Limpiar el formulario
    // Limpiar el formulario
    setName('');
    setDescription('');
    setDate('');
    setEndDate('');
    setTime('');
    setEndTime(''); // Limpiar hora de finalización
    setLocation('');
    setLogo('https://example.com/default-logo.png');
    setLink('');
    setIsInvitationOnly(false); // Limpia el checkbox
    setPrice('');
    setCompanyName('');
    setCompanyEmail('');
    setCompanyId('');
    setRepresentativeName('');
    setRepresentativeRole('');
    setRepresentativeEmail('');
    setRepresentativePhone('');
    setPhoneCode('+57');
    setRepresentativeLinkedIn(''); // Limpia el LinkedIn
    setRepresentativeId('');
    setIsFree(false);
    setIsLoading(false);
  }

  const locale = 'en'; // Define the locale variable

  return (
    <section className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Formulario</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {/* Información de la Empresa */}
          <h2 className="text-xl font-bold mb-4 text-black">Información general</h2>
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
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyEmail">
              Correo de la Empresa
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyEmail"
              type="email"
              name="companyEmail"
              placeholder="Correo electrónico de la empresa"
              value={companyEmail}
              onChange={e => setCompanyEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyWebSide">
              Sitio web de la empresa
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyId"
              type="text"
              name="companyId"
              placeholder="Sitio web de la empresa"
              value={companyId}
              onChange={e => setCompanyId(e.target.value)}
            />
          </div>

          {/* Información del Representante */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="representativeName">
              Nombre del representante
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeName"
              type="text"
              name="representativeName"
              placeholder="Escribe el nombre del representante"
              value={representativeName}
              onChange={e => setRepresentativeName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn del representante</label>
            <input
              type="url"
              placeholder="Enlace de LinkedIn"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={representativeLinkedIn}
              onChange={(e) => setRepresentativeLinkedIn(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Código del Celular</label>
            <select
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="57">+57 (Colombia)</option>
              <option value="1">+1 (Estados Unidos)</option>
              <option value="54">+54 (Argentina)</option>
              <option value="591">+591 (Bolivia)</option>
              <option value="55">+55 (Brasil)</option>
              <option value="56">+56 (Chile)</option>
              <option value="506">+506 (Costa Rica)</option>
              <option value="53">+53 (Cuba)</option>
              <option value="593">+593 (Ecuador)</option>
              <option value="503">+503 (El Salvador)</option>
              <option value="502">+502 (Guatemala)</option>
              <option value="509">+509 (Haití)</option>
              <option value="504">+504 (Honduras)</option>
              <option value="52">+52 (México)</option>
              <option value="505">+505 (Nicaragua)</option>
              <option value="507">+507 (Panamá)</option>
              <option value="595">+595 (Paraguay)</option>
              <option value="51">+51 (Perú)</option>
              <option value="1-787">+1-787 (Puerto Rico)</option>
              <option value="1-939">+1-939 (Puerto Rico)</option>
              <option value="598">+598 (Uruguay)</option>
              <option value="58">+58 (Venezuela)</option>

              {/* Agrega más códigos según sea necesario */}
            </select>
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
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="representativeId">
              Correo electrónico del representante
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeId"
              type="text"
              name="representativeId"
              placeholder="Número de identificación del representante"
              value={representativeId}
              onChange={e => setRepresentativeId(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Cargo</label>
            <input
              type="text"
              placeholder="Cargo del representante"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={representativeRole}
              onChange={(e) => setRepresentativeRole(e.target.value)}
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
              onChange={e => setName(e.target.value)}
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

          {/* Fecha */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-2">Fecha de inicio</h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Checkbox: Por definir */}
              <div className="block text-gray-700 text-sm font-medium mr-8">
                Por definir
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isDateTBD}
                    onChange={(e) => setIsDateTBD(e.target.checked)}
                    className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-2"
                  />
                </label>
              </div>

              {/* Input: Fecha */}
              <div className="flex-grow">
                <input
                  type="date"
                  className={`rounded-lg w-full py-4 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDateTBD ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isDateTBD}
                  required={!isDateTBD}
                />
              </div>
            </div>
          </div>

          {/* Fecha */}
          <div className="mb-10">
            <h1 className="text-lg font-semibold mb-2">Fecha de finalización</h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Checkbox: Por definir */}
              <div className="block text-gray-700 text-sm font-medium mr-8">
                Por definir
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isEndDateTBD}
                    onChange={(e) => {
                      setEndIsDateTBD(e.target.checked);
                      if (e.target.checked) setIsEndDateNA(false); // Desactivar "No aplica" si se marca "Por definir"
                    }}
                    className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-2"
                  />
                </label>
              </div>

              {/* Nuevo Checkbox: No aplica */}
              <div className="block text-gray-700 text-sm font-medium mr-8">
                No aplica
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isEndDateNA}
                    onChange={(e) => {
                      setIsEndDateNA(e.target.checked);
                      if (e.target.checked) setEndIsDateTBD(false); // Desactivar "Por definir" si se marca "No aplica"
                    }}
                    className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-2"
                  />
                </label>
              </div>

              {/* Input: Fecha */}
              <div className="flex-grow">
                <input
                  type="date"
                  className={`rounded-lg w-full py-4 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEndDateTBD ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isEndDateTBD}
                  required={!isEndDateTBD && !isEndDateNA}
                />
              </div>
            </div>
          </div>



          {/* Hora */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-2">Hora de inicio</h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Checkbox: Por definir */}
              <div className='block text-gray-700 text-sm font-medium mr-8'>
                Por definir
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isTimeTBD}
                    onChange={(e) => setIsTimeTBD(e.target.checked)}
                    className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-2"
                  />
                </label>
              </div>

              {/* Input: Hora */}
              <div className="flex-grow">
                <input
                  type="time"
                  className={`rounded-lg w-full py-4 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isTimeTBD ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={isTimeTBD}
                  required={!isTimeTBD}
                />
              </div>
            </div>
          </div>


          {/* Hora de Finalización */}
          <div className="mb-10">
            <h1 className="text-lg font-semibold mb-2">Hora de Finalización</h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Checkbox: Por definir */}
              <div className="block text-gray-700 text-sm font-medium mr-8">
                Por definir
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isEndTimeTBD}
                    onChange={(e) => setIsEndTimeTBD(e.target.checked)}
                    className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-2"
                  />
                </label>
              </div>

              {/* Input: Hora de Finalización */}
              <div className="flex-grow">
                <input
                  type="time"
                  className={`rounded-lg w-full py-4 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEndTimeTBD ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={isEndTimeTBD}
                  required={!isEndTimeTBD}
                />
              </div>
            </div>
          </div>


          {/* Ubicación */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-2">Ubicación</h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Checkbox: Por definir */}
              <div className="block text-gray-700 text-sm font-medium mr-8">
                Por definir
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isLocationTBD}
                    onChange={(e) => setIsLocationTBD(e.target.checked)}
                    className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-2"
                  />
                </label>
              </div>

              {/* Input: Ubicación */}
              <div className="flex-grow">
                <label className="block text-gray-700 text-sm font-medium">Ubicación</label>
                <input
                  type="text"
                  className={`rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLocationTBD ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  placeholder="Escribe la ubicación o link"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isLocationTBD}
                  required={!isLocationTBD}
                />
              </div>
            </div>
          </div>


          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-2">Logo del Evento</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="logo"
              type="file"
              name="logo"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
            {logo && logo !== 'https://example.com/default-logo.png' && !isUploading && (
              <p className="text-sm text-green-500 mt-2">
                Imagen cargada con éxito: <a href={logo} target="_blank" rel="noopener noreferrer">Ver Imagen</a>
              </p>
            )}
          </div>

          {/* Enlace del Evento */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-2">Enlace del Evento</h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Checkbox: Invitación */}
              <div className="block text-gray-700 text-sm font-medium mr-8">
                Solo por <br /> invitación
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isInvitationOnly}
                    onChange={(e) => setIsInvitationOnly(e.target.checked)}
                    className="h-8 w-8 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-2"
                  />
                </label>
              </div>

              {/* Input: Enlace del Evento */}
              <div className="flex-grow">
                <label className="block text-gray-700 text-sm font-medium">Enlace</label>
                <input
                  className={`rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isInvitationOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  id="link"
                  type="url"
                  name="link"
                  placeholder="Enlace oficial del evento"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  disabled={isInvitationOnly}
                  required={!isInvitationOnly}
                />
              </div>
            </div>
          </div>


          {/* Precio del Evento */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-2">Precio del Evento</h1>
            <div className="relative">
              <select
                value={price} // Estado para controlar el selector
                onChange={(e) => {
                  const value = e.target.value;
                  setPrice(value); // Actualiza el estado del precio
                  setIsFree(value === 'Gratis'); // Actualiza si es Gratis
                  setIsPriceTBD(value === 'Por definir'); // Actualiza si es Por definir
                }}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-500 px-4 py-3 pr-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Por definir">Por definir</option>
                <option value="Pago">Pago</option>
                <option value="Gratis">Gratis</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.516 7.548L10 11.486l4.484-3.938 1.032 1.152-5.516 4.832-5.516-4.832z" />
                </svg>
              </div>
            </div>
          </div>


          {/* Botón Enviar */}
          <div className="flex items-center justify-center py-4">
            <button
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg shadow-gray-500 focus:outline-none focus:shadow-outline ${(isUploading || isLoading) && 'opacity-50 cursor-not-allowed'
                }`}
              type="submit"
              disabled={isUploading || isLoading} // Deshabilita el botón durante la carga o envío
            >
              {isUploading
                ? 'Subiendo Imagen...'
                : isLoading
                  ? 'ENVIANDO . . .'
                  : 'Enviar'}
            </button>
          </div>
          {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </form>
        {/* Nota de términos y condiciones */}
        <p className="text-center mt-4 text-gray-500 text-sm">
          {"*Al enviar tus datos a Startups Calendar aceptas nuestros"}{' '}
          <Link
            href={`/${locale}/terms-and-conditions`}
            className="text-orange-500 hover:underline">
            {"Términos y Condiciones"}
          </Link>
        </p>

        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </div>

    </section>
  );
};

export default AddEvent;
