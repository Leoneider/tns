import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.DATABASE_SUPABASE_URL!;
const supabaseServiceKey = process.env.DATABASE_SUPABASE_SERVICE_ROLE_KEY!;

// Initialize a single supabase client for server-side usage
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Uploads an image file to the Supabase "tns-images" bucket.
 * 
 * @param file The file object (from FormData)
 * @param folder The folder inside the bucket (e.g. 'noticias', 'clientes')
 * @returns The public URL of the uploaded image
 */
export async function uploadImageToSupabase(file: File, folder: string): Promise<string> {
  // Check if file is provided and has size
  if (!file || file.size === 0) {
    throw new Error('El archivo está vacío o no es válido');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Clean filename: remove special chars, spaces, and prepend timestamp
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueFilename = `${folder}/${Date.now()}-${safeName}`;

  const { data, error } = await supabase.storage
    .from('tns-images')
    .upload(uniqueFilename, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error('Error al subir la imagen a Supabase: ' + error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from('tns-images')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
