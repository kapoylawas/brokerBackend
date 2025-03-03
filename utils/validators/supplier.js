// Import express validator
const { body } = require("express-validator");

// Import prisma client
const prisma = require('../../prisma/client');

const validateSupplier = [
    body("name").notEmpty().withMessage("Nama supplier tidak boleh kosong"),
    body("no_hp")
    .notEmpty().withMessage("no handphone supplier tidak boleh kosong")
    .custom(async(no_hp, { req }) => {
        // Use findFirst instead of findUnique
        const existingPhone = await prisma.supplier.findFirst({
            where: { no_hp: no_hp },
        });

        if (existingPhone && (!req.params.id || existingPhone.id !== parseInt(req.params.id))) {
            throw new Error("No handphone supplier sudah terdaftar");
        }

        return true;
    }),
]

module.exports = { validateSupplier }