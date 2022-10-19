const multer = require("multer");
const path = require("path");
const fs = require("fs");

function addImage(imgPath) {
  fs.readdir(imgPath, (error) => {
    if (error) {
      console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    }
  });
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  });

  return multer({ storage: storage });
}

export { addImage };
