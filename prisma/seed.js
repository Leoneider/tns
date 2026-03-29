const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // --- SERVICIOS ---
  await prisma.service.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        title: 'Carga Líquida',
        description: 'Ofrecemos el servicio de transporte de carga líquida con altos estándares de seguridad, garantizando el manejo adecuado de cada producto desde su origen hasta el destino final. Operamos bajo estrictos protocolos de seguridad, control de calidad y cumplimiento normativo, minimizando riesgos y garantizando la integridad del producto durante todo el proceso logístico.',
        details: 'Hidrocarburo,Combustible,Combustóleo,Aceite de palma',
        category: 'LIQUID',
        icon: 'Droplets',
        order: 1,
      },
      {
        title: 'Carga Seca',
        description: 'Prestamos el servicio especializado de transporte de carga seca, aplicando protocolos de seguridad, control operativo y trazabilidad que garantizan la integridad de la mercancía desde el punto de origen hasta su destino final.',
        details: 'Café,Arroz,Harina,Fertilizante,Cigarrillos,Cacao,Cerámica,Abono',
        category: 'DRY',
        icon: 'Package',
        order: 2,
      },
      {
        title: 'Profesionales destacados',
        description: 'Contamos con un equipo de profesionales altamente calificados, comprometidos con la excelencia operativa y la satisfacción de nuestros clientes.',
        details: '',
        category: 'RESOURCE',
        icon: 'Users',
        order: 3,
      },
      {
        title: 'Conductores capacitados',
        description: 'Transportadores con amplia experiencia en el manejo de carga especial, formados bajo los más altos estándares de seguridad vial y operativa.',
        details: '',
        category: 'RESOURCE',
        icon: 'UserCheck',
        order: 4,
      },
      {
        title: 'Flota especializada',
        description: 'Disponemos de una flota moderna y adecuada para cada tipo de carga, garantizando condiciones óptimas de transporte en cada operación.',
        details: '',
        category: 'RESOURCE',
        icon: 'Truck',
        order: 5,
      },
      {
        title: 'Plataforma de gestión',
        description: 'Sistema integral para el control de mantenimiento, documentación de vehículos y conductores, inspecciones vehiculares y revisiones preoperacionales.',
        details: '',
        category: 'RESOURCE',
        icon: 'ClipboardList',
        order: 6,
      },
      {
        title: 'Rastreo satelital',
        description: 'Acceso a plataformas de monitoreo satelital en tiempo real para garantizar la localización y seguridad de cada carga durante todo el trayecto.',
        details: '',
        category: 'RESOURCE',
        icon: 'Satellite',
        order: 7,
      },
    ],
  });

  console.log('✅ Services seeded successfully!');

  // --- NOTICIAS ---
  await prisma.news.deleteMany();

  await prisma.news.createMany({
    data: [
      {
        title: 'Renovación de nuestra flota de vehículos',
        content: 'En TNS continuamos apostando por la innovación y la seguridad en nuestras operaciones. Este mes hemos integrado nuevos tractocamiones de última tecnología a nuestra flota especializada en carga líquida. Estos vehículos no solo ofrecen mayor eficiencia en el consumo de combustible, sino que además cuentan con los más recientes sistemas de seguridad activa y pasiva, garantizando la protección de nuestros conductores y la integridad de la carga en cada viaje.',
        imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop',
        date: new Date('2024-03-15T10:00:00Z'),
      },
      {
        title: 'Nueva certificación en Seguridad Vial',
        content: 'En nuestro firme compromiso con la protección de todos los actores en la vía y la excelencia operativa, hemos logrado renovar y obtener la prestigiosa certificación ISO para Sistemas de Gestión de Seguridad Vial. Este logro es un reflejo de los altos estándares que aplicamos en la capacitación de nuestros conductores, el mantenimiento riguroso de la flota y la planificación integral de cada ruta a nivel nacional e internacional.',
        imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455aeb0?q=80&w=1776&auto=format&fit=crop',
        date: new Date('2024-02-28T08:30:00Z'),
      },
      {
        title: 'Expansión de rutas nacionales para carga seca',
        content: 'Respondiendo a la creciente demanda de nuestros clientes en el sector de alimentos y materiales de construcción, TNS ha habilitado nuevas rutas de transporte de carga seca conectando directamente la región de Norte de Santander con los principales puertos del Caribe colombiano. Esta expansión estratégica nos permite agilizar los tiempos de tránsito, optimizar los costos logísticos y ofrecer un servicio ininterrumpido a lo largo de las principales vías del país.',
        imageUrl: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=2070&auto=format&fit=crop',
        date: new Date('2024-01-10T14:45:00Z'),
      }
    ]
  });

  console.log('✅ News seeded successfully!');

  // --- CLIENTES ---
  await prisma.client.deleteMany();

  await prisma.client.createMany({
    data: [
      {
        name: 'Ecopetrol',
        logoUrl: '/clients/ecopetrol.svg',
        websiteUrl: 'https://www.ecopetrol.com.co',
        order: 1,
      },
      {
        name: 'Terpel',
        logoUrl: '/clients/terpel.png',
        websiteUrl: 'https://www.terpel.com',
        order: 2,
      },
      // {
      //   name: 'Palnorte',
      //   logoUrl: 'https://ui-avatars.com/api/?name=Palnorte&background=4CAF50&color=fff&size=300&font-size=0.33',
      //   websiteUrl: 'https://palnortesas.com.co',
      //   order: 3,
      // },
      // {
      //   name: 'Oleologistic',
      //   logoUrl: 'https://ui-avatars.com/api/?name=Oleologistic&background=F57C00&color=fff&size=300&font-size=0.33',
      //   websiteUrl: '',
      //   order: 4,
      // },
      // {
      //   name: 'Oleonorte',
      //   logoUrl: 'https://ui-avatars.com/api/?name=Oleonorte&background=00796B&color=fff&size=300&font-size=0.33',
      //   websiteUrl: '',
      //   order: 5,
      // },
      // {
      //   name: 'Madeiros',
      //   logoUrl: 'https://ui-avatars.com/api/?name=Madeiros&background=7B1FA2&color=fff&size=300&font-size=0.33',
      //   websiteUrl: '',
      //   order: 6,
      // },
      {
        name: 'Cooperativa de Caficultores del Catatumbo',
        logoUrl: '/clients/coopercafe.png',
        websiteUrl: 'https://cooperacafe.com',
        order: 7,
      },
      {
        name: 'Coagronorte',
        logoUrl: '/clients/coagronorte.webp',
        websiteUrl: 'https://coagronorte.com.co',
        order: 8,
      },
      {
        name: 'Inveragro',
        logoUrl: '/clients/inveragro.png',
        websiteUrl: 'https://inveragro.com.co',
        order: 9,
      },
      {
        name: 'Psl Proanalisis',
        logoUrl: '/clients/psl-pronalisis.png',
        websiteUrl: 'https://pslproanalisis.com',
        order: 10,
      },
      {
        name: 'Rafael del Castillo',
        logoUrl: '/clients/rafael.png',
        websiteUrl: 'https://rafaeldelcastillo.com.co',
        order: 11,
      },
      {
        name: 'Arrocera Gelves',
        logoUrl: '/clients/arroz-gelvez.png',
        websiteUrl: 'https://gelvezdistribuciones.com',
        order: 12,
      },
      {
        name: 'Arrocera Agua Clara',
        logoUrl: '/clients/arrocera-aguaclara.png',
        websiteUrl: '',
        order: 13,
      },
      {
        name: 'Unionagro',
        logoUrl: '/clients/unionagro.png',
        websiteUrl: '',
        order: 14,
      },
      {
        name: 'Centro de Arroces',
        logoUrl: '/clients/centro-arroces.png',
        websiteUrl: '',
        order: 15,
      },
      {
        name: 'Comercializadora Gran señora',
        logoUrl: '/clients/granseñora.png',
        websiteUrl: '',
        order: 16,
      },
      {
        name: 'Coopecafenor',
        logoUrl: '/clients/coopecafenor.png',
        websiteUrl: '',
        order: 17,
      }
    ]
  });

  console.log('✅ Clients seeded successfully!');

  // --- PROYECTOS SOCIALES ---
  await prisma.socialProject.deleteMany();

  await prisma.socialProject.createMany({
    data: [
      {
        title: 'Entrega de Kits Escolares en Tibú',
        description: 'Llevamos 64 kits de materiales educativos (cuadernos, lápices, colores y mochilas) a niños y niñas de la Institución Educativa Rural de Tibú, impactando directamente su rendimiento academic.',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
        order: 1,
      },
      {
        title: 'Apoyo a Familias en Sardinata',
        description: 'Visitamos a 20 familias vulnerables de Sardinata, entregando mercados familiares y brindando acompañamiento psicosocial en alianza con la Alcaldía Local.',
        imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200',
        order: 2,
      },
      {
        title: 'Jornada de Pintura — San Agustín de los Pozos',
        description: 'Jornada de embellecimiento y adecuación de la escuela rural de San Agustín de los Pozos, con la participación voluntaria de colaboradores de TNS y líderes de la comunidad.',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
        order: 3,
      },
      {
        title: 'Día del Niño con la Comunidad',
        description: 'Celebramos el Día del Niño con actividades lúdicas, juegos y obsequios para más de 150 niños de las comunidades de Tibú y Sardinata. Un día lleno de alegría y esperanza.',
        imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1200',
        order: 4,
      },
      {
        title: 'Formación en Habilidades para la Vida',
        description: 'Realizamos talleres de liderazgo, emprendimiento y habilidades socioemocionales dirigidos a jóvenes de 7 instituciones educativas del norte de Santander.',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
        order: 5,
      },
      {
        title: 'Reforestación y Cuidado Ambiental',
        description: 'Junto a docentes y estudiantes sembramos más de 200 árboles nativos en la cuenca del río Catatumbo, como parte de nuestro compromiso con el medio ambiente y el futuro de la región.',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
        order: 6,
      },
    ],
  });

  console.log('✅ Social Projects seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
