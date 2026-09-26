import { NextRequest } from 'next/server';
import { createClient } from '../../../../../src/lib/supabase/server';
import { portfolioItemSchema } from '../../../../../src/lib/validators';
import { jsonResponse, errorResponse, handleApiError } from '../../../../../src/lib/api-response';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: professionalId } = params;
    const supabase = createClient();

    // 1. Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return errorResponse('Authentication required', 401);
    }

    // 2. Role check
    if (user.user_metadata?.role !== 'professional') {
      return errorResponse('Forbidden: only professionals can manage portfolio items', 403);
    }

    // 3. Ownership check
    const { data: pro, error: proError } = await supabase
      .from('professionals')
      .select('id, user_id')
      .eq('id', professionalId)
      .single();

    if (proError || !pro) {
      return errorResponse('Professional not found', 404);
    }

    if (pro.user_id && pro.user_id !== user.id) {
      return errorResponse('Forbidden: You can only modify your own portfolio', 403);
    }

    // 4. Handle multipart/form-data vs JSON
    const contentType = req.headers.get('content-type') || '';
    let itemData: {
      title: string;
      category?: string;
      location?: string;
      imageUrl?: string;
      description?: string;
      tags?: string[];
      type?: 'image' | 'video' | 'audio';
    };

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const title = formData.get('title') as string;
      const category = (formData.get('category') as string) || '';
      const location = (formData.get('location') as string) || '';
      const description = (formData.get('description') as string) || '';
      const tagsRaw = formData.get('tags') as string;
      const type = ((formData.get('type') as string) || 'image') as 'image' | 'video' | 'audio';

      let tags: string[] = [];
      if (tagsRaw) {
        try {
          tags = JSON.parse(tagsRaw);
        } catch {
          tags = tagsRaw.split(',').map((t) => t.trim());
        }
      }

      let uploadedUrl: string | undefined;

      if (file) {
        // Validate MIME type
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          return errorResponse(
            `Invalid file type '${file.type}'. Allowed types: JPEG, PNG, WebP, GIF.`,
            400
          );
        }

        // Validate File size
        if (file.size > MAX_FILE_SIZE) {
          return errorResponse(
            `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB).`,
            400
          );
        }

        // Upload to Supabase Storage in portfolio/{professionalId}/... folder path
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `${professionalId}/${fileName}`;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          return errorResponse(`Storage upload failed: ${uploadError.message}`, 500);
        }

        const { data: publicUrlData } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath);

        uploadedUrl = publicUrlData.publicUrl;
      }

      itemData = {
        title,
        category,
        location,
        imageUrl: uploadedUrl || (formData.get('imageUrl') as string) || '',
        description,
        tags,
        type,
      };
    } else {
      const body = await req.json();
      itemData = body;
    }

    const validated = portfolioItemSchema.parse(itemData);
    const itemId = `port_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const { data: created, error: insertError } = await supabase
      .from('portfolio_items')
      .insert({
        id: itemId,
        professional_id: professionalId,
        title: validated.title,
        category: validated.category,
        location: validated.location,
        image_url: validated.imageUrl || null,
        description: validated.description,
        tags: validated.tags,
        type: validated.type,
      })
      .select()
      .single();

    if (insertError) {
      return errorResponse(insertError.message, 400);
    }

    return jsonResponse(created, 201);
  } catch (err) {
    return handleApiError(err);
  }
}
