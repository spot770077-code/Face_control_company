const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); // JSONni o'qish uchun

const employeesRoute = require('./routes/employees'); // employees.js faylini ulash
app.use("/api/employees", employeesRoute); // employees.js ni /api/employeesga ulash

// PostgreSQL ulanish
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// Test API
app.get("/", (req, res) => {
    res.send("Server ishlayapti!");
});

app.listen(3000, () => {
    console.log("Server 3000-portda ishlayapti");
});


// Ulanishni tekshirish
pool.connect()
    .then(() => {
        console.log("PostgreSQL databazaga ulandik!");
    })
    .catch(err => {
        console.error("Ulanishda xato:", err);
    });

module.exports = pool;
