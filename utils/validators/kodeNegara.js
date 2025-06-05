const { body } = require("express-validator");
// Import prisma client
const prisma = require("../../prisma/client");

const validateKodeNegara = [
    body("name")
    .notEmpty()
    .withMessage("Kode negara tidak boleh kosong")
    .custom(async(name, { req }) => {
        const existingKodeNegara = await prisma.kode_negara.findFirst({
            where: { name: name },
        });

        // Jika nama kode negara sudah ada dan bukan untuk update (tidak ada req.params.id)
        if (
            existingKodeNegara &&
            (!req.params.id || existingKodeNegara.id !== parseInt(req.params.id))
        ) {
            throw new Error("Kode negara handphone sudah terdaftar");
        }

        return true;
    }),
];

module.exports = { validateKodeNegara };