const faqs = [
  {
    question: '¿Qué servicios presta TNS?',
    answer:
      'TNS presta soluciones de transporte terrestre de carga líquida y seca en Colombia, con enfoque en seguridad, trazabilidad y eficiencia operativa.',
  },
  {
    question: '¿Dónde está ubicada TNS?',
    answer:
      'TNS cuenta con oficina principal en Ocaña y una sucursal en Cúcuta, en el departamento de Norte de Santander.',
  },
  {
    question: '¿Cómo puedo cotizar un servicio de transporte?',
    answer:
      'Puede cotizar desde la sección de contacto del sitio web o a través del botón de WhatsApp disponible en la página principal.',
  },
  {
    question: '¿En qué horarios atiende TNS?',
    answer:
      'La atención es de lunes a viernes de 08:00 a.m. a 12:00 p.m. y de 02:00 p.m. a 06:00 p.m.; sábados de 08:00 a.m. a 12:00 p.m.',
  },
];

export const FaqSection = () => (
  <section className="bg-surface-low py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-secondary mb-4 block">
          Preguntas frecuentes
        </span>
        <h2 className="text-3xl md:text-4xl font-black uppercase text-primary">
          Lo que más preguntan
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((item) => (
          <article key={item.question} className="bg-white border border-primary/10 rounded-sm p-6">
            <h3 className="text-lg font-bold text-primary mb-2">{item.question}</h3>
            <p className="text-primary/70 leading-relaxed">{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
