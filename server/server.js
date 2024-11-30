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

// (add_service) Handling the procedure
app.post('/add_service', (req, res) => {
    const { id, long_name, home_base, manager } = req.body;

    const sql = 'CALL add_service(?, ?, ?, ?)'; 
    const values = [id, long_name, home_base, manager];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to add service. Please check your inputs.' });
        }
        return res.status(200).json({ Message: 'Service added successfully!' });
    });
});

// (add_location) Handling the procedure
app.post('/add_location', (req, res) => {
    const { label, x_coord, y_coord, space } = req.body;

    const sql = 'CALL add_location(?, ?, ?, ?)'; 
    const values = [label, x_coord, y_coord, space];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to add location. Please check your inputs.' });
        }
        return res.status(200).json({ Message: 'Location added successfully!' });
    });
});

// (start_funding) Fetch owners for the dropdown
app.get('/owners', (req, res) => {
    const sql = 'SELECT username FROM business_owners';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching owners:', err.message);
            return res.status(500).json({ Error: 'Failed to fetch owners.' });
        }
        return res.status(200).json(result);
    });
});

// (start_funding) Fetch businesses for the dropdown
app.get('/businesses', (req, res) => {
    const sql = 'SELECT long_name FROM businesses';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching businesses:', err.message);
            return res.status(500).json({ Error: 'Failed to fetch businesses.' });
        }
        return res.status(200).json(result);
    });
});

// (start_funding) Handling the procedure
app.post('/start_funding', (req, res) => {
    const { ip_owner, ip_long_name, ip_amount, ip_fund_date } = req.body;

    const sql = 'CALL start_funding(?, ?, ?, ?)';
    const values = [ip_owner, ip_long_name, ip_amount, ip_fund_date];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to start funding.' });
        }
        return res.status(200).json({ Message: 'Funding successfully started!' });
    });
});

// (takeover_van) Fetch drivers for the dropdown
app.get('/drivers', (req, res) => {
    const sql = 'SELECT username FROM drivers';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching drivers:', err.message);
            return res.status(500).json({ Error: 'Failed to fetch drivers.' });
        }
        return res.status(200).json(result);
    });
});

// (takeover_van) Fetch vans for the dropdown
app.get('/vans', (req, res) => {
    const sql = 'SELECT id FROM vans';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching vans:', err.message);
            return res.status(500).json({ Error: 'Failed to fetch vans.' });
        }
        return res.status(200).json(result);
    });
});

// (takeover_van) Handling the procedure
app.post('/takeover_van', (req, res) => {
    const { username, id, tag } = req.body;

    const sql = 'CALL takeover_van(?, ?, ?)';
    const values = [username, id, tag];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to takeover van.' });
        }
        return res.status(200).json({ Message: 'Van takeover successful!' });
    });
});

// (load_van) Fetch vans for the dropdown
app.get('/vans', (req, res) => {
    const sql = 'SELECT id FROM vans';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching vans:', err.message);
            return res.status(500).json({ Error: 'Failed to fetch vans.' });
        }
        return res.status(200).json(result);
    });
});

// (load_van) Fetch products for the dropdown
app.get('/products', (req, res) => {
    const sql = 'SELECT barcode FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching products:', err.message);
            return res.status(500).json({ Error: 'Failed to fetch products.' });
        }
        return res.status(200).json(result);
    });
});

// (load_van) Handle the procedure
app.post('/load_van', (req, res) => {
    const { id, tag, barcode, num_packages, price } = req.body;

    const sql = 'CALL load_van(?, ?, ?, ?, ?)';
    const values = [id, tag, barcode, num_packages, price];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to load van.' });
        }
        return res.status(200).json({ Message: 'Van loaded successfully!' });
    });
});

// (refuel_van) Handle the procedure
app.post('/refuel_van', (req, res) => {
    const { id, tag, amount } = req.body;

    const sql = 'CALL refuel_van(?, ?, ?)';
    const values = [id, tag, amount];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to refuel van.' });
        }
        return res.status(200).json({ Message: 'Van refueled successfully!' });
    });
});

// (drive_van) Handle the procedure
app.post('/drive_van', (req, res) => {
    const { id, tag, destination } = req.body;

    const sql = 'CALL drive_van(?, ?, ?)';
    const values = [id, tag, destination];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to drive van.' });
        }
        return res.status(200).json({ Message: 'Van driven successfully!' });
    });
});

// (purchase_product) Handle the procedure
app.post('/purchase_product', (req, res) => {
    const { long_name, id, tag, barcode, quantity } = req.body;

    const sql = 'CALL purchase_product(?, ?, ?, ?, ?)';
    const values = [long_name, id, tag, barcode, quantity];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to purchase product.' });
        }
        return res.status(200).json({ Message: 'Product purchased successfully!' });
    });
});

// db.end();