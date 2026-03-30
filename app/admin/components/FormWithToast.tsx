'use client';

import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { isRedirectError } from 'next/dist/client/components/redirect';

export default function FormWithToast({
  action,
  children,
  successMessage,
  className,
  resetOnSuccess = true,
}: {
  action: (formData: FormData) => Promise<any>;
  children: React.ReactNode;
  successMessage?: string;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await action(formData);
        
        // If the action returned an error inside an object:
        if (result && typeof result === 'object' && result.error) {
          toast.error(result.error);
          return;
        }

        toast.success(successMessage || 'Operación completada exitosamente');
        if (resetOnSuccess) {
          formRef.current?.reset();
        }
      } catch (e: any) {
        if (isRedirectError(e)) {
          toast.success(successMessage || 'Operación completada exitosamente');
          throw e; // Let Next.js handle the redirect
        } else {
          console.error(e);
          toast.error('Ocurrió un error inesperado al procesar la solicitud');
        }
      }
    });
  };

  return (
    <fieldset disabled={isPending} className="contents">
      <form ref={formRef} action={handleSubmit} className={className}>
        {children}
      </form>
    </fieldset>
  );
}
