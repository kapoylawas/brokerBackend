//import validator
const { validateLogin } = require("./auth");
const { validateSupplier } = require("./supplier");
const { validateBarangMasuk } = require("./barangMasuk");
const { validateHandphone } = require("./handphone");
const { validateAksesoris } = require("./aksesoris");
const { validateTipeHandphone } = require("./tipeHandphone");
const { validateImei } = require("./imei");

//export validator
module.exports = {
    validateLogin,
    validateSupplier,
    validateBarangMasuk,
    validateHandphone,
    validateAksesoris,
    validateTipeHandphone,
    validateImei
};