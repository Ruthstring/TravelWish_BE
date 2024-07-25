const { cloudinary } = require('../cloudinaryConfig');
const { pool } = require('../DB/dbConnection');

const uploadImage = async (req, res) => {
  console.log('Request received for image upload');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);

  const filePath = req.file.path;
  console.log('File path:', filePath);

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'country_images',
    });
    console.log('Upload to Cloudinary result:', result);

    // Save image URL and public_id in the database
    await pool.query('UPDATE user1_countries SET image_url = $1, public_id = $2 WHERE id = $3', [
      result.secure_url,
      result.public_id,
      req.body.countryId,
    ]);
    console.log('Database updated with image URL and public_id');

    // Respond with success and the Cloudinary URL and public_id
    res.json({ success: true, url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

module.exports = {
  uploadImage,
};

// const uploadImage = async (req, res) => {
//   console.log('Request received for image upload');
//   console.log('Request body:', req.body);
//   console.log('Request file:', req.file);
  
//   const filePath = req.file.path;
//   console.log('File path:', filePath);

//   try {
//     // Upload the image to Cloudinary
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'country_images',
//     });
//     console.log('Upload to Cloudinary result:', result);
    
//     // Delete the local file after uploading
//     fs.unlinkSync(filePath);
//     console.log('Local file deleted:', filePath);

//     // Save image URL and public_id in the database
//     await pool.query('UPDATE user1_countries SET image_url = $1, public_id = $2 WHERE id = $3', [
//       result.secure_url,
//       result.public_id,
//       req.body.countryId,
//     ]);
//     console.log('Database updated with image URL and public_id');

//     res.json({ success: true, url: result.secure_url, public_id: result.public_id });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// };

// module.exports = {
//   uploadImage,
// };

// const uploadImage = async (req, res) => {
//   try {
//     const file = req.file;
//     const result = file.path;

//     // Save image URL and public_id in the database
//     await pool.query('UPDATE user1_countries SET image_url = $1, public_id = $2 WHERE id = $3', [
//       result.secure_url,
//       result.public_id,
//       req.body.countryId,
//     ]);

//     res.json({ success: true, url: result.secure_url, public_id: result.public_id });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// };



// module.exports = {
//   uploadImage,
// };