'use client';

import { useActionState, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const nameRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ']+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialState = {
  message: '',
  errors: undefined as
    | {
      name?: string[];
      email?: string[];
      message?: string[];
      captchaToken?: string[];
    }
    | undefined,
  success: false,
};

export function ContactForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [clientErrors, setClientErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Mensaje Enviado',
        description: state.message,
      });
    } else if (state.message && state.errors) {
      toast({
        title: 'Error de Validación',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-8">
      {/* NOMBRE */}
      <div className="space-y-3">
        <Label htmlFor="name" className="text-gray-900 dark:text-white font-semibold">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Tu nombre"
          required
          className="h-12"
          onChange={(e) => {
            const value = e.target.value;
            let error = '';
            if (value.length < 3) error = 'El nombre debe tener al menos 3 caracteres.';
            else if (!nameRegex.test(value)) error = 'El nombre solo puede contener letras y espacios.';
            setClientErrors((prev) => ({ ...prev, name: error }));
          }}
        />

        {clientErrors.name && (
          <p className="text-sm text-destructive">{clientErrors.name}</p>
        )}


        {state.errors?.name && (
          <p className="text-sm text-destructive">
            {state.errors.name.join(', ')}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div className="space-y-3">
        <Label htmlFor="email" className="text-gray-900 dark:text-white font-semibold">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
          className="h-12"
          onChange={(e) => {
            const value = e.target.value;
            const error = emailRegex.test(value)
              ? ''
              : 'Introduce un email válido.';
            setClientErrors((prev) => ({ ...prev, email: error }));
          }}
        />

        {clientErrors.email && (
          <p className="text-sm text-destructive">{clientErrors.email}</p>
        )}

      </div>

      {/* MENSAJE */}
      <div className="space-y-3">
        <Label htmlFor="message" className="text-gray-900 dark:text-white font-semibold">
          Mensaje
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Escribe tu mensaje aquí..."
          rows={5}
          required
          onChange={(e) => {
            const value = e.target.value;
            const error =
              value.length < 10
                ? 'El mensaje debe tener al menos 10 caracteres.'
                : '';
            setClientErrors((prev) => ({ ...prev, message: error }));
          }}
        />

        {clientErrors.message && (
          <p className="text-sm text-destructive">{clientErrors.message}</p>
        )}

      </div>

      {/* CAPTCHA */}
      <div className="flex justify-center pt-4">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => setCaptchaToken(token)}
        />
      </div>

      {/* TOKEN OCULTO */}
      <input type="hidden" name="captchaToken" value={captchaToken ?? ''} />

      {/* BOTÓN */}
      <Button
        type="submit"
        disabled={
          !captchaToken ||
          !!clientErrors.name ||
          !!clientErrors.email ||
          !!clientErrors.message
        }
        className="w-full bg-primary dark:bg-white text-white dark:text-black font-black py-4 px-10 rounded-lg hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-lg !mt-10 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enviar Mensaje
      </Button>

    </form>
  );
}
