# Proyecto TNS

Este es un proyecto construido con [Next.js](https://nextjs.org/) y utiliza [Prisma](https://www.prisma.io/) como ORM para conectarse a una base de datos PostgreSQL (alojada en Supabase).

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión recomendada)
- Una base de datos PostgreSQL (por ejemplo, a través de Supabase)

## Configuración Inicial

### 1. Variables de Entorno

Para que el proyecto funcione correctamente, es **obligatorio** configurar las variables de entorno. Crea un archivo llamado `.env` en la raíz del proyecto y agrega la siguiente estructura con tus credenciales:

```env
# Variables de Supabase
NEXT_PUBLIC_DATABASE_SUPABASE_ANON_KEY="tu_anon_key"
NEXT_PUBLIC_DATABASE_SUPABASE_PUBLISHABLE_KEY="tu_publishable_key"
DATABASE_SUPABASE_URL="tu_supabase_url"

# Credenciales de base de datos Postgres
DATABASE_POSTGRES_DATABASE="postgres"
DATABASE_POSTGRES_HOST="tu_host"
DATABASE_POSTGRES_USER="postgres"
DATABASE_POSTGRES_PASSWORD="tu_password"

# Variables de conexión para Prisma (¡Muy importantes!)
# Se utilizan para el Pooler de conexiones (pgbouncer) y conexión directa
DATABASE_POSTGRES_PRISMA_URL="postgres://usuario:password@host:6543/postgres?sslmode=require&pgbouncer=true"
DATABASE_POSTGRES_URL="postgres://usuario:password@host:6543/postgres?sslmode=require&supa=base-pooler.x"
DATABASE_POSTGRES_URL_NON_POOLING="postgres://usuario:password@host:5432/postgres?sslmode=require"

# Llaves secretas de Supabase (Auth / Service Role)
DATABASE_SUPABASE_JWT_SECRET="tu_jwt_secret"
DATABASE_SUPABASE_SECRET_KEY="tu_secret_key"
DATABASE_SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key"
```

Asegúrate de reemplazar los valores de las variables (especialmente `DATABASE_POSTGRES_PRISMA_URL` y `DATABASE_POSTGRES_URL_NON_POOLING`) con los proporcionados por el panel de tu base de datos en Supabase para que Prisma pueda establecer la conexión exitosamente.

### 2. Instalación de Dependencias

Instala los paquetes necesarios del proyecto ejecutando:

```bash
npm install
```

### 3. Configuración de Prisma

Dado que el proyecto utiliza Prisma, después de configurar tus variables de entorno necesitas sincronizar y generar el cliente de Prisma basado en el archivo `prisma/schema.prisma`.

Para generar el cliente de Prisma de forma local ejecuta:

```bash
npx prisma generate
```

Si es la primera vez que configuras la base de datos o si necesitas crear las tablas en tu base de datos remota basándote en el esquema actual de Prisma, ejecuta:

```bash
npx prisma db push
```

*(Nota: si en el futuro se manejan historiales de migraciones, podrías usar `npx prisma migrate dev` en lugar de `db push`).*

Opcionalmente, si el proyecto cuenta con un script para poblar la base de datos con datos iniciales (Seed), puedes correr:

```bash
npx prisma db seed
```

### 4. Iniciar el Servidor de Desarrollo

Una vez configuradas las variables de entorno y preparado Prisma, ya puedes arrancar la aplicación en modo desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación corriendo.
