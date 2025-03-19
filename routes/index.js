// routes/index.js
const express = require("express");
const moment = require("moment-timezone"); // Import moment-timezone

// Init express router
const router = express.Router();

// Import validators and middleware
const {
  validateLogin,
  validateSupplier,
  validateBarangMasuk,
  validateHandphone,
  validateAksesoris,
} = require("../utils/validators");
const { handleValidationErrors, verifyToken } = require("../middlewares");

// Import controllers
const loginController = require("../controllers/LoginController");
const supplierController = require("../controllers/SupplierController");
const barangMasukController = require("../controllers/BarangMasukController");
const handPhoneController = require("../controllers/HandPhoneController");
const aksesorisController = require("../controllers/AksesorisController");

// Define routes
const routes = [
  // Login route
  {
    method: "post",
    path: "/login",
    middlewares: [validateLogin, handleValidationErrors],
    handler: loginController.login,
  },

  // Supplier route
  {
    method: "post",
    path: "/suppliers",
    middlewares: [verifyToken, validateSupplier, handleValidationErrors],
    handler: supplierController.createSupplier,
  },
  {
    method: "get",
    path: "/supplier-all",
    middlewares: [verifyToken],
    handler: supplierController.allSupplier,
  },

  // HandPhone route
  {
    method: "get",
    path: "/hand-phone",
    middlewares: [verifyToken],
    handler: handPhoneController.allHandPhone,
  },
  {
    method: "post",
    path: "/hand-phone",
    middlewares: [verifyToken, validateHandphone, handleValidationErrors],
    handler: handPhoneController.createPhone,
  },

  // Barang masuk route
  {
    method: "post",
    path: "/barang-masuk",
    middlewares: [verifyToken, validateBarangMasuk, handleValidationErrors],
    handler: barangMasukController.createBarangMasuk,
  },
  {
    method: "get",
    path: "/barang-masuk",
    middlewares: [verifyToken],
    handler: barangMasukController.findBarangMasuk,
  },
  {
    method: "get",
    path: "/barang-masuk/:id",
    middlewares: [verifyToken],
    handler: barangMasukController.findBarangMasukById,
  },
  {
    method: "put",
    path: "/barang-masuk/:id",
    middlewares: [verifyToken, validateBarangMasuk, handleValidationErrors],
    handler: barangMasukController.updateBarangMasuk,
  },

  // Aksesoris route
  {
    method: "post",
    path: "/aksesoris",
    middlewares: [verifyToken, validateAksesoris, handleValidationErrors],
    handler: aksesorisController.createAksesoris,
  },
  {
    method: "get",
    path: "/aksesoris",
    middlewares: [verifyToken],
    handler: aksesorisController.allAksesoris,
  },
];

// Helper function to create routes
const createRoutes = (routes) => {
  routes.forEach(({ method, path, middlewares, handler }) => {
    router[method](
      path,
      ...middlewares,
      (req, res, next) => {
        // Menambahkan waktu Indonesia ke dalam objek respons
        const currentTime = moment().tz("Asia/Jakarta").format(); // Mengambil waktu saat ini dalam WIB
        res.locals.currentTime = currentTime; // Menyimpan waktu dalam res.locals
        next(); // Melanjutkan ke handler berikutnya
      },
      handler
    );
  });
};

// Create routes
createRoutes(routes);

// Export router
module.exports = router;