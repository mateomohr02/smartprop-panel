import { uploadMultimedia } from "@/utils/uploadMultimedia";
import { setFormData } from "@/helpers/setFormData";

export const submitPropertyMultimedia = async (media, token, tenantId) => {
  try {
    let uploadedImages = { urls: [] };
    let uploadedVideos = { urls: [] };

    // 📸 Subir imágenes solo si existen
    if (media?.images?.length) {
      const parsedImages = setFormData(media.images);
      uploadedImages = await uploadMultimedia(parsedImages, token, tenantId);
    }

    // 🎥 Subir videos solo si existen
    if (media?.videos?.length) { // ✅ cambio aquí
      const parsedVideos = setFormData(media.videos); // ✅ cambio aquí
      uploadedVideos = await uploadMultimedia(parsedVideos, token, tenantId);
    }

    return {
      images: uploadedImages.urls || [],
      videos: uploadedVideos.urls || [],
    };
  } catch (error) {
    console.error("Error al subir multimedia:", error);
    throw error;
  }
};
