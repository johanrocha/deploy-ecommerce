import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.development.env' });

// Custom Provider --> Cloudinary
// luego lo nyecamos en el modulo
export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_APY_KEY,
      api_secret: process.env.CLOUDINARY_APY_SECRET, // Click 'View API Keys' above to copy your API secret
    });
  },
};
