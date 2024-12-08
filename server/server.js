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
  
    //console.log(rows);
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

// add owner handling
app.post('/addowner', (req, res) => {
    const users = "call add_owner(?)";
    const values = [       
        req.body.username,
        req.body.fname,
        req.body.lname,
        req.body.address,
        req.body.bdate]

    db.query(users, [values], (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

// add business handling
app.post('/addbusiness', (req, res) => {
    const users = "call add_business(?)";
    const values = [       
        req.body.long_name,
        req.body.rating,
        req.body.spent,
        req.body.location]

    db.query(users, [values], (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

// add employee handling
app.post('/add_employees', (req, res) => {
    const users = "call add_employee(?)";
    const values = [       
        req.body.username,
        req.body.fname,
        req.body.lname,
        req.body.address,
        req.body.bdate,
        req.body.taxID,
        req.body.hired, 
        req.body.experience,
        req.body.salary]

    db.query(users, [values], (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

// add product handling
app.post('/add_product', (req, res) => {
    const users = "call add_product(?)";
    const values = [       
        req.body.barcode,
        req.body.name,
        req.body.weight]

    db.query(users, [values], (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

// add worker handling
app.post('/add_worker_role', (req, res) => {
    const users = "call add_worker_role(?)";
    const values = [       
        req.body.username]

    db.query(users, [values], (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

// add van handling
app.post('/addvan', (req, res) => {
    const users = "call add_van(?)";
    const values = [       
        req.body.id,
        req.body.tag,
        req.body.fuel,
        req.body.capacity,
        req.body.sales,
        req.body.driven_by]

    db.query(users, [values], (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

// add driver role handling
app.post('/add_driver_role', (req, res) => {
    const users = "call add_driver_role(?)";
    const values = [       
        req.body.username,
        req.body.licenseID,
        req.body.licenseType,
        req.body.experience]

    db.query(users, [values], (err, data) => {
        if(err){
            return res.json({Error: err})
        }
        return res.json(data)
    })
})

// display views handling
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

// start_funding handling
app.post('/start_funding', (req, res) => {
    const users = "call start_funding(?)";
    const values = [       
        req.body.ip_owner,
        req.body.ip_amount,
        req.body.ip_long_name,
        req.body.ip_fund_date]

    db.query(users, [values], (err, data) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message, values);
            return res.status(500).json({
                Error: 'Failed to start funding.',
                Details: err.sqlMessage || err.message
            });
        }
        if (data.affectedRows === 0) { // Use 'data' instead of 'result'
            return res.status(400).json({
                Error: 'No rows affected. Funding may not have started.'
            });
        }
        return res.status(200).json({
            Message: 'Funding successfully started!'
        });
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

// (add_worker_role) Handling the procedure
app.post('/api/add-worker-role', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }

    const sql = 'CALL add_worker_role(?)';
    const values = [username];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to add worker role. Please try again.' });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ Message: `Worker role added for username: ${username}.` });
        } else {
            return res.status(200).json({ Message: `No changes made. Username ${username} may not exist or already has a worker/driver role.` });
        }
    });
});

// (add_product) Handling the procedure
app.post('/api/add-product', (req, res) => {
    const { productName, productPrice, productCategory } = req.body;

    if (!productName || !productPrice || !productCategory) {
        return res.status(400).json({ message: 'Product name, price, and category are required.' });
    }

    const sql = 'CALL add_product(?, ?, ?)';
    const values = [productName, productPrice, productCategory];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({ Error: 'Failed to add product. Please check your inputs.' });
        }

        return res.status(200).json({ Message: 'Product added successfully!' });
    });
});

// (add_driver_role) Handling the procedure
app.post('/api/add-driver-role', (req, res) => {
    const { username, licenseID, licenseType, driverExperience } = req.body;

    // Validate input
    if (!username || !licenseID || !licenseType || driverExperience === undefined) {
        return res.status(400).json({
            message: 'Username, licenseID, licenseType, and driverExperience are required.',
        });
    }

    const sql = 'CALL add_driver_role(?, ?, ?, ?)';
    const values = [username, licenseID, licenseType, driverExperience];

    // Execute the query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({
                error: 'Failed to add driver role. Please check your inputs.',
            });
        }

        return res.status(200).json({
            message: 'Driver role added successfully!',
        });
    });
});

// (add_employee) Handling the procedure
app.post('/api/add-employee', (req, res) => {
    const {
        username,
        firstName,
        lastName,
        address,
        birthdate,
        taxID,
        hired,
        employeeExperience,
        salary,
    } = req.body;

    // Validate input
    if (
        !username ||
        !firstName ||
        !lastName ||
        !address ||
        !birthdate ||
        !taxID ||
        !hired ||
        employeeExperience === undefined ||
        salary === undefined
    ) {
        return res.status(400).json({
            message: 'All fields are required.',
        });
    }

    const sql = 'CALL add_employee(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        username,
        firstName,
        lastName,
        address,
        birthdate,
        taxID,
        hired,
        employeeExperience,
        salary,
    ];

    // Execute the query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing stored procedure:', err.message);
            return res.status(500).json({
                error: 'Failed to add employee. Please check your inputs.',
            });
        }

        return res.status(200).json({
            message: 'Employee added successfully!',
        });
    });
});

// db.end();