'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

interface Policy {
  id: string;
  code: string;
  title: string;
}

interface DeleteConfirmModalProps {
  policy: Policy;
  deleteAction: (formData: FormData) => Promise<any>;
}

export default function DeleteConfirmModal({ policy, deleteAction }: DeleteConfirmModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const formData = new FormData();
    formData.set('id', policy.id);

    startTransition(async () => {
      try {
        await deleteAction(formData);
        toast.success('Política eliminada correctamente');
        setOpen(false);
      } catch (e: any) {
        toast.error('Error al eliminar la política');
        console.error(e);
      }
    });
  };

  return (
    <>
      {/* Trigger button — icon only with tooltip */}
      <div className="relative group/del">
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-200 bg-white text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
          aria-label="Eliminar política"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium bg-gray-900 text-white rounded-lg opacity-0 group-hover/del:opacity-100 transition-opacity whitespace-nowrap z-10">
          Eliminar
        </span>
      </div>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isPending && setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-5">
              <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
              ¿Eliminar política?
            </h2>
            <p className="text-gray-500 text-center text-sm mb-1">
              Esta acción no se puede deshacer.
            </p>
            <p className="text-center text-gray-800 font-semibold text-sm mb-8 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <span className="text-red-600 text-xs font-bold block mb-1">{policy.code}</span>
              {policy.title}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  'Sí, eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
