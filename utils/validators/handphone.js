// Import express validator
const { body } = require("express-validator");

const validateHandphone = [
    body("name").notEmpty().withMessage("Nama handphone tidak boleh kosong"),
]

module.exports = { validateHandphone }