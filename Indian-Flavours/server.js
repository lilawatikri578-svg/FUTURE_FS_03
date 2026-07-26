const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/menu", (req, res) => {
    res.render("menu");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.get("/booking", (req, res) => {
    res.render("booking");
});
app.post("/booking", (req, res) => {
    const { name, email, phone, date, time, guests, message } = req.body;

    const sql = `
    INSERT INTO bookings
    (name, phone, email, persons, booking_date, booking_time, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, phone, email, guests, date, time, message],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Booking Failed");
            }

            res.send("Booking Successful!");
        }
    );
});



app.get("/contact", (req, res) => {
    res.render("contact");
});
app.post("/contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    const sql = `
    INSERT INTO contacts
    (name, email, subject, message)
    VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Message Failed");
        }

        res.send("Message Sent Successfully!");
    });
});
app.get("/admin-login", (req, res) => {
    res.render("admin-login");
});

app.get("/admin-dashboard", (req, res) => {
    res.render("admin-dashboard");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});