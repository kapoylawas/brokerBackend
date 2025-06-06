const { body } = require("express-validator");
// Import prisma client
const prisma = require("../../prisma/client");

const validateImei = [
  body("imei")
    .notEmpty()
    .withMessage("Imei tidak boleh kosong")
    .custom(async (imei, { req }) => {
      const existingImei = await prisma.imei.findFirst({
        where: { imei: imei },
      });

      // Jika IMEI sudah ada dan bukan untuk update (tidak ada req.params.id)
      if (
        existingImei &&
        (!req.params.id || existingImei.id !== parseInt(req.params.id))
      ) {
        throw new Error("IMEI handphone sudah terdaftar");
      }

      return true;
    }),
];

module.exports = { validateImei };
