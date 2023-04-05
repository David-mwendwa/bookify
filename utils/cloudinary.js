import cloudinary from 'cloudinary';

/**
 * Add cloudinary configurations
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload cloudnary image(s)
 * @param {*} req express request object - to access image from request body
 * @param {*} options image options as object i.e folder: path to cloudinary storage folder, width, crop, public_id etc
 * @returns object containing public_id, secure_url
 * @example uploadCloudinaryImage(req, {folder: '<appname>/images', width: '400', crop: 'scale'});
 */
const uploadCloudinaryImage = async (req, options) => {
  try {
    let file =
      req.body?.avatar ||
      req.body?.avatars ||
      req.body?.photo ||
      req.body?.photos ||
      req.body?.image ||
      req.body?.images ||
      req.body?.pic ||
      req.body?.pics ||
      req.body?.picture ||
      req.body?.pictures ||
      req.body?.profilePic ||
      req.body?.profilePics;
    if (file) {
      return await cloudinary.v2.uploader.upload(file, {
        resource_type: 'auto',
        ...options,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete cloudinary image
 * @param {*} image image to delete
 */
// TODO: confirm if the image param is parsed, is from cloudinary and has public id
const deleteCloudinaryImage = async (image) => {
  await cloudinary.v2.uploader.destroy(image.public_id);
};

export { uploadCloudinaryImage, deleteCloudinaryImage };
