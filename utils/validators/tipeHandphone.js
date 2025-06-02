const { body } = require("express-validator");

const validateTipeHandphone = [
    body("name").notEmpty().withMessage("Nama tipe handphone tidak boleh kosong"),
]

module.exports = { validateTipeHandphone }