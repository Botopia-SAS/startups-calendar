import { useState } from 'react';

const useSubmitEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submitEvent = async (formData: any): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_ENDPOINT}?sheetName=${process.env.NEXT_PUBLIC_SHEET_NAME_EVENTS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setMessage('Evento enviado con éxito.');
        return { success: true, message: 'Evento enviado con éxito.' };
      } else {
        setMessage(result.message || 'Error al enviar el evento.');
        return { success: false, message: result.message || 'Error al enviar el evento.' };
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor.');
      return { success: false, message: 'Error al conectar con el servidor.' };
    } finally {
      setIsLoading(false);
    }
  };

  return { submitEvent, isLoading, message, setMessage };
};

export default useSubmitEvent;
