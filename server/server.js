import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE 
})


app.listen(8081, ()=> {
    console.log("Listening");
})

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.message);
//     } else {
//         console.log('Connected to the MySQL database!');
//     }
// });

db.connect();

db.query('SELECT * from users', (err, rows, fields) => {
  if (err) throw err;

  console.log(rows);
})


app.get('/', (req, res) => {
    const users = "SELECT * from users;";
    db.query(users, (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

app.post('/create', (req, res) => {
    const users = "insert into users (username, fname, lname, address, birthdate) values(?); ";
    const values = [       
        req.body.username,
        req.body.fname,
        req.body.lname,
        req.body.address,
        req.body.birthdate]

    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json({Error: "Error"})
        }
        return res.json(data)
    })
})



app.put('/update/:username', (req, res) => {
    const users = "update users set fname = ?, lname = ?, address = ?, birthdate = ? where username = ?; ";
    const values = [       
        req.body.username,
        req.body.fname,
        req.body.lname,
        req.body.address,
        req.body.birthdate]
    const username = req.params.username;
    db.query(sql, [...values, username], (err, data) => {
        if(err){
            return res.json({Error: "Error"})
        }
        return res.json(data)
    })
})


app.delete('/delete/:username', (req, res) => {
    const users = "delete from users where username = ?; ";
    const username = req.params.username;
    db.query(sql, [username], (err, data) => {
        if(err){
            return res.json({Error: "Error"})
        }
        return res.json(data)
    })
})







// db.end();