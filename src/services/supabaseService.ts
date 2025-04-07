
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { FaceShapeResult } from '@/services/faceShape/types';

export async function saveAnalysisResult(result: FaceShapeResult): Promise<string> {
  try {
    // Generate a unique session ID if user is not logged in
    const sessionId = uuidv4();
    
    // Upload image to Supabase Storage
    let imageUrl = result.imageUrl;
    
    // Only upload if it's a data URL (not already stored)
    if (imageUrl && imageUrl.startsWith('data:')) {
      const base64Data = imageUrl.split(',')[1];
      const fileName = `${sessionId}.jpg`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('face_images')
        .upload(fileName, decode(base64Data), {
          contentType: 'image/jpeg',
          cacheControl: '3600'
        });
      
      if (uploadError) {
        console.error("Error uploading image:", uploadError);
      } else if (uploadData) {
        // Get the public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('face_images')
          .getPublicUrl(fileName);
          
        if (urlData) {
          imageUrl = urlData.publicUrl;
        }
      }
    }
    
    // Save analysis data to database
    const { data, error } = await supabase
      .from('face_analysis')
      .insert({
        session_id: sessionId,
        primary_shape: result.primaryShape,
        scores: result.scores,
        tips: result.tips,
        image_url: imageUrl
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error saving analysis:", error);
      throw error;
    }
    
    return data.id;
  } catch (error) {
    console.error("Failed to save analysis:", error);
    throw error;
  }
}

export async function getAnalysisById(id: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('face_analysis')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // No data found
        return null;
      }
      console.error("Error fetching analysis:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Failed to fetch analysis:", error);
    throw error;
  }
}

// Helper function to decode base64
function decode(base64String: string): Uint8Array {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Add helper function to generate shareable link
export function getResultUrl(id: string): string {
  return `/result/${id}`;
}
