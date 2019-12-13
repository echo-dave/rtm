const cloudinary = require("cloudinary").v2;
const path = require("path");
// const cloudinary = require("cloudinary-core");

module.exports = function(filename) {
  const eager_options = [
    {
      width: 200,
      height: 133,
      crop: "scale",
      format: "jpg"
    }
  ];
  //   filename = path.join(__dirname, "../public/upload" ,filename)
  console.log(filename);

  return cloudinary.uploader
    .upload(path.join(__dirname, "../public/upload", filename), {
      use_filename: true,
      eager: eager_options,
      public_id: filename.slice(0, -4)
    })
    .then(function(image, err) {
      console.log("upload");
      console.log(
        "* public_id for the uploaded image is generated by Cloudinary's service."
      );
      console.log("* " + image.public_id);
      console.log("* " + image.url);
      console.log(image);
      return image.eager[0].secure_url;
      //   resolve(image)
    })
    .catch(function(err) {
      if (err) {
        console.warn(err);
      }
    });
};
