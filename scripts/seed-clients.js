const fs = require('fs');
const path = require('path');
const https = require('https');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const clientsData = [
  { name: 'Ecopetrol', domain: 'ecopetrol.com.co' },
  { name: 'Terpel', domain: 'terpel.com' },
  { name: 'Palnorte', domain: 'palnorte.com.co' },
  { name: 'Oleologistic', domain: 'oleologistic.com' },
  { name: 'Oleonorte', domain: 'oleonorte.com' },
  { name: 'Madeiros', domain: 'madeiros.co' },
  { name: 'Cooperativa de Caficultores del Catatumbo', domain: 'cooperativacaficultoresdelcatatumbo.com' },
  { name: 'Coagronorte', domain: 'coagronorte.com.co' },
  { name: 'Inveragro', domain: 'inveragro.com.co' },
  { name: 'Psl Proanalisis', domain: 'proanalisis.com' },
  { name: 'Rafael del Castillo', domain: 'rafaeldelcastillo.com' },
  { name: 'Arrocera Gelves', domain: 'arroceragelves.com' },
  { name: 'Arrocera Agua Clara', domain: 'aguaclara.com.co' },
  { name: 'Unionagro', domain: 'unionagro.com' },
  { name: 'Centro de Arroces', domain: 'centrodearroces.com' },
  { name: 'Comercializadora Gran señora', domain: null },
  { name: 'Coopecafenor', domain: 'coopecafenor.com' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
            return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadLogo(domain, name) {
  if (!domain) return null;
  const url = `https://logo.clearbit.com/${domain}?size=400`;
  const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  
  const clientsDir = path.join(__dirname, '..', 'public', 'clients');
  if (!fs.existsSync(clientsDir)) {
    fs.mkdirSync(clientsDir, { recursive: true });
  }

  const destPath = path.join(clientsDir, `${safeName}.png`);
  
  try {
    await downloadFile(url, destPath);
    console.log(`[✓] Logo descargado: ${name}`);
    return `/clients/${safeName}.png`;
  } catch (error) {
    console.log(`[!] No se pudo descargar logo para: ${name} (${domain}): ${error.message}`);
    if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
    }
    return null;
  }
}

async function main() {
  console.log('Iniciando descarga y configuración de clientes...');
  
  await prisma.client.deleteMany();
  
  for (let i = 0; i < clientsData.length; i++) {
    const { name, domain } = clientsData[i];
    console.log(`Procesando: ${name}...`);
    
    let logoUrl = await downloadLogo(domain, name);
    if (!logoUrl) logoUrl = '';

    await prisma.client.create({
      data: {
        name,
        logoUrl,
        websiteUrl: domain ? `https://${domain}` : null,
        order: i,
      }
    });
  }

  console.log('Semillado completado con éxito!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
