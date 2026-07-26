const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "indian_flavours"
});

connection.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed:", err.message);
    } else {
        console.log("✅ Database Connected Successfully");
    }
});

module.exports = connection;
