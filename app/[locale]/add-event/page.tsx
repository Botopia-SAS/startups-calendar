'use client';
import React, { FormEvent, useState } from 'react';
import useSubmitEvent from '@/hooks/useSubmitEvent';

const AddEvent = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState(''); // Hora de finalización
  const [location, setLocation] = useState('');
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
  const [isFree, setIsFree] = useState(false);


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
    setIsLoading(true); // Indica que el formulario está siendo enviado

    const form = {
      name,
      description,
      date,
      time,
      endTime, // Hora de finalización
      location,
      logo: logo || 'https://example.com/default-logo.png',
      link,
      companyName,
      companyEmail,
      companyId,
      representativeName,
      representativeRole, // Cargo del representante
      representativeEmail, // Correo del representante
      representativePhone: `${phoneCode.replace('+', '')} ${representativePhone}`, // Elimina el símbolo '+' del código // Código del celular + teléfono
      representativeLinkedIn, // Incluido en los datos enviados
      representativeId,
      price: isFree ? 'Gratis' : price,
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
    setTime('');
    setEndTime(''); // Limpiar hora de finalización
    setLocation('');
    setLogo('https://example.com/default-logo.png');
    setLink('');
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

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Agrega tu Evento</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {/* Información de la Empresa */}
          <h2 className="text-xl font-bold mb-4 text-black">Información de la Empresa</h2>
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
            />
          </div>

          {/* Información del Representante */}
          <h2 className="text-xl font-bold mb-4 text-black">Información del Representante</h2>
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
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn del Representante</label>
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
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Cargo del Representante</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Hora de Finalización</label>
            <input
              type="time"
              placeholder="Hora de finalización"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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

          {/* Precio del Evento */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Precio del Evento
            </label>
            <div className="flex items-center gap-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                name="price"
                placeholder="Escribe el precio en dólares"
                value={isFree ? 'Gratis' : price}
                onChange={e => setPrice(e.target.value)}
                disabled={isFree}
                required={!isFree}
              />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={e => {
                    setIsFree(e.target.checked);
                    if (e.target.checked) setPrice('Gratis');
                    else setPrice('');
                  }}
                />
                Gratis
              </label>
            </div>
          </div>

          {/* Botón Enviar */}
          <div className="flex items-center justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(isUploading || isLoading) && 'opacity-50 cursor-not-allowed'
                }`}
              type="submit"
              disabled={isUploading || isLoading} // Deshabilita el botón durante la carga o envío
            >
              {isUploading
                ? 'Subiendo Imagen...'
                : isLoading
                  ? 'Enviando...'
                  : 'Enviar'}
            </button>

          </div>
          {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default AddEvent;
