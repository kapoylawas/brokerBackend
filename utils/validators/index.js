//import validator
const { validateLogin } = require("./auth");
const { validateSupplier } = require("./supplier");
const { validateBarangMasuk } = require("./barangMasuk");

//export validator
module.exports = {
    validateLogin,
    validateSupplier,
    validateBarangMasuk
};