import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();


const db = mysql.createConnection({
    host: "sql9.freemysqlhosting.net",
    user: "sql9597072",
    password: "prcwC6ezyI",
    database: "sql9597072",
    // port: 3306
})

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "test",
//     // port: 8800
// })

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello World");
});

app.get("/books", (req, res) => {

    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created successfully")
    });
});

app.delete("/books/:id", (req, res) => {

    const bookId = req.params.id;

    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully")
    });

});

app.put("/books/:id", (req, res) => {

    const bookId = req.params.id;

    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been updates successfully")
    });


});


app.listen(8888, () => {
    console.log("Server is running on port 8800");
});
