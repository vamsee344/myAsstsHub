import axiosClient from './client/axiosClient';

/**
 * Property Service
 * Handles all property CRUD, uploads, and categories
 */
const propertyService = {
  /**
   * Fetch categories from /api/v1/categories
   */
  getCategories: async () => {
    try {
      return await axiosClient.get('/categories');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch paginated and filtered property listings
   * @param {Object} query - page, per_page, category, properfor, city, status, search
   */
  getProperties: async (query = {}) => {
    try {
      return await axiosClient.get('/properties', { params: query });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get property details by ID
   */
  getPropertyById: async (id) => {
    try {
      return await axiosClient.get(`/properties/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Add a new property asset with cover and gallery images
   * @param {Object} data - Form data fields
   */
  addProperty: async (data) => {
    try {
      const formData = new FormData();
      
      // Basic text fields from Postman
      const textFields = [
        'category', 'ptitle', 'properfor', 'description', 'psqft', 
        'price', 'nobed', 'nobath', 'fl', 'park', 'furstatus', 
        'address', 'landmark', 'city', 'state', 'country', 
        'start_date', 'avail', 'amenities', 'security', 
        'privacystatus', 'event_tags', 'buildage', 'proptax', 'mainfee'
      ];
      
      textFields.forEach(f => {
         if (data[f] !== undefined) formData.append(f, data[f]);
      });

      // Cover image (filecover)
      if (data.filecover) {
         formData.append('filecover', {
            uri: data.filecover,
            name: 'cover.jpg',
            type: 'image/jpeg'
         });
      }

      // Documentation images (imagefile[])
      if (data.galleryImages && Array.isArray(data.galleryImages)) {
         data.galleryImages.forEach((imgUri, index) => {
            formData.append('imagefile[]', {
               uri: imgUri,
               name: `gallery_${index}.jpg`,
               type: 'image/jpeg'
            });
         });
      }

      // Floor Layout (layout)
      if (data.layout) {
         formData.append('layout', {
            uri: data.layout,
            name: 'layout.jpg',
            type: 'image/jpeg'
         });
      }

      // Video File (video_file)
      if (data.video_file) {
         formData.append('video_file', {
            uri: data.video_file,
            name: 'property_video.mp4',
            type: 'video/mp4'
         });
      }

      // Documents / Brochures (documents[])
      if (data.documents && Array.isArray(data.documents)) {
         data.documents.forEach((docUri, index) => {
            formData.append('documents[]', {
               uri: docUri,
               name: `document_${index}.pdf`,
               type: 'application/pdf'
            });
         });
      }

      return await axiosClient.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update an existing property
   */
  updateProperty: async (id, data) => {
    try {
      // Basic JSON update for metadata
      return await axiosClient.put(`/properties/${id}`, data);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a property listing
   */
  deleteProperty: async (id) => {
    try {
      return await axiosClient.delete(`/properties/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export default propertyService;
