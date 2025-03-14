// Import jsonwebtoken untuk pembuatan token JWT
const jwt = require("jsonwebtoken");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createSupplier = async(req, res) => {
    try {
        // Mencari kode terakhir yang ada di database
        const lastSupplier = await prisma.supplier.findFirst({
            orderBy: {
                kode: 'desc',
            },
        });

        // Menentukan kode berikutnya
        let nextKode = 101; // Default kode jika belum ada data
        if (lastSupplier) {
            nextKode = parseInt(lastSupplier.kode) + 1;
        }

        // Menyisipkan data pengguna baru dengan kode yang telah dihasilkan
        const suppliers = await prisma.supplier.create({
            data: {
                kode: nextKode.toString(), // Mengubah kode menjadi string
                name: req.body.name,
                no_hp: req.body.no_hp,
            },
        });

        // Mengirimkan respons
        res.status(201).send({
            meta: {
                success: true,
                message: "Supplier berhasil ditambahkan",
            },
            data: suppliers,
        });
    } catch (error) {
        // Jika terjadi kesalahan, kirim respons kesalahan internal server
        res.status(500).send({
            meta: {
                success: false,
                message: "Terjadi kesalahan di server",
            },
            errors: error,
        });
    }
};

const allSupplier = async(req, res) => {
    try {
        // Ambil kategori 
        const supplier = await prisma.supplier.findMany({
            select: {
                id: true,
                kode: true,
                name: true,
                no_hp: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: {
                kode: "desc",
            }
        });

        // Kirim respons
        res.status(200).send({
            // Meta untuk respons dalam format JSON
            meta: {
                success: true,
                message: "Berhasil mendapatkan semua supplier",
            },
            // Data supplier
            data: supplier,
        });
    } catch (error) {
        // Jika terjadi kesalahan, kirim respons kesalahan internal server
        res.status(500).send({
            // Meta untuk respons dalam format JSON
            meta: {
                success: false,
                message: "Terjadi kesalahan di server",
            },
            // Data kesalahan
            errors: error,
        });
    }
}

module.exports = {
    createSupplier,
    allSupplier
}