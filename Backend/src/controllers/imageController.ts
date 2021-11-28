import * as Yup from "yup";

import cloudinary from "cloudinary";
import errorHandler from "../utils/errorHandler";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload a image
// @route   POST /image/upload
// @access  Private
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        errors: ["Image is not available for upload.!"],
      });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    return res.status(200).send({
      url: result.secure_url,
      public_id: result.public_id,
      asset_id: result.asset_id,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Delete a image
// @route   DELETE /image/delete/:id
// @access  Private
export const removeFile = async (req, res) => {
  const { id } = req.params;

  const schema = Yup.object().shape({
    id: Yup.string().required("Image ID is a required field"),
  });

  try {
    await schema.validate(
      {
        id,
      },
      { abortEarly: false }
    );

    await cloudinary.v2.uploader.destroy(id);

    return res.status(200).send({ message: "File deleted successfully" });
  } catch (err) {
    errorHandler(res, err);
  }
};
