const multer = require("multer");
const path = require("path");
const fs = require("fs");

function addImage(imgPath) {
  fs.readdir(imgPath, (error) => {
    if (error) {
      console.error("fail to make uploads folder.");
    }
  });
<<<<<<< HEAD
=======
  // const storage = multer({ dest: "uploads/" });
>>>>>>> 136ac2edab4dab7f345059257269d50c9025780b
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
<<<<<<< HEAD
  });

  return multer({ storage: storage });
=======
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  return multer({ storage: storage });
  // return storage;
>>>>>>> 136ac2edab4dab7f345059257269d50c9025780b
}

export { addImage };
