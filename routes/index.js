// routes/index.js
const express = require('express');
const moment = require('moment-timezone'); // Import moment-timezone

// Init express router
const router = express.Router();

// Import validators and middleware
const { validateLogin, validateSupplier } = require('../utils/validators');
const { handleValidationErrors, verifyToken } = require('../middlewares');

// Import controllers
const loginController = require('../controllers/LoginController');
const supplierController = require('../controllers/SupplierController');

// Define routes
const routes = [
    // Login route
    { method: 'post', path: '/login', middlewares: [validateLogin, handleValidationErrors], handler: loginController.login },

    // Supplier route
    { method: 'post', path: '/suppliers', middlewares: [verifyToken, validateSupplier, handleValidationErrors], handler: supplierController.createSupplier },
];

// Helper function to create routes
const createRoutes = (routes) => {
    routes.forEach(({ method, path, middlewares, handler }) => {
        router[method](path, ...middlewares, (req, res, next) => {
            // Menambahkan waktu Indonesia ke dalam objek respons
            const currentTime = moment().tz("Asia/Jakarta").format(); // Mengambil waktu saat ini dalam WIB
            res.locals.currentTime = currentTime; // Menyimpan waktu dalam res.locals
            next(); // Melanjutkan ke handler berikutnya
        }, handler);
    });
};

// Create routes
createRoutes(routes);

// Export router
module.exports = router;