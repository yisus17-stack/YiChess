'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .regex(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ']+$/, 'El nombre solo puede contener letras y espacios.'),
  email: z.string().email('Por favor, introduce una dirección de email válida.'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Por favor, corrige los errores e intenta de nuevo.',
      success: false,
    };
  }
  
  console.log('New contact form submission:', validatedFields.data);

  return {
    message: '¡Gracias por tu mensaje! Lo hemos recibido correctamente.',
    success: true,
    errors: undefined,
  };
}
