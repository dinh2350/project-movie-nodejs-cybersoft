const multer = require("multer");
const { getTimeStampMilliSecond } = require("../ultils/date");

const upLoadAvatarMiddleware = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // google storage, aws s3
      cb(null, "./public/images/avatar");
    },
    filename: (req, file, cb) => {
      cb(null, `${getTimeStampMilliSecond()}_${file.originalname}`);
    },
  });

  const upload = multer({ storage });
  return upload.single("avatar");
};

module.exports = {
  upLoadAvatarMiddleware,
};
