'use client';

import { useActionState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export function ContactForm() {
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
      <div className="space-y-3">
        <Label htmlFor="name" className="text-gray-900 dark:text-white font-semibold">Nombre</Label>
        <Input id="name" name="name" placeholder="Tu nombre" required className="h-12"/>
        {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name.join(', ')}</p>}
      </div>
      <div className="space-y-3">
        <Label htmlFor="email" className="text-gray-900 dark:text-white font-semibold">Email</Label>
        <Input id="email" name="email" type="email" placeholder="tu@email.com" required className="h-12"/>
        {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>}
      </div>
      <div className="space-y-3">
        <Label htmlFor="message" className="text-gray-900 dark:text-white font-semibold">Mensaje</Label>
        <Textarea id="message" name="message" placeholder="Escribe tu mensaje aquí..." rows={5} required />
        {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message.join(', ')}</p>}
      </div>
      <Button type="submit" className="w-full bg-primary dark:bg-white text-white dark:text-black font-black py-4 px-10 rounded-lg hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-lg !mt-10 h-auto">
        Enviar Mensaje
      </Button>
    </form>
  );
}
