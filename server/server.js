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

db.query('select * from display_employee_view;', (err, rows, fields) => {
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


app.post('/adduser', (req, res) => {
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

app.get('/ownerview', (req, res) => {
    const owner_view = 'SELECT * FROM display_owner_view;';
    db.query(owner_view, (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
});

app.get('/employeeview', (req, res) => {
    const employee_view = 'select * from display_employee_view;';
    db.query(employee_view, (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
});

app.get('/driverview', (req, res) => {
    const driver_view = 'select * from display_driver_view;';
    db.query(driver_view, (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
});

app.get('/locationview', (req, res) => {
    const location_view = 'select * from display_location_view;';
    db.query(location_view, (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
});

app.get('/productview', (req, res) => {
    const product_view = 'select * from display_product_view;';
    db.query(product_view, (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
});

app.get('/serviceview', (req, res) => {
    const service_view = 'select * from display_service_view;';
    db.query(service_view, (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
});



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