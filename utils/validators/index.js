//import validator
const { validateLogin } = require("./auth");
const { validateSupplier } = require("./supplier");

//export validator
module.exports = {
    validateLogin,
    validateSupplier
};