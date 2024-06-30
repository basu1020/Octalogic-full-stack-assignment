const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config()

// Extracting data from env file. 
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE
} = process.env;

// Create a MySQL connection
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    no_of_wheels INT,
    model VARCHAR(255)
  )
`;

// Data to be inserted
const vehicleData = [
    { type: 'hatchback', no_of_wheels: 4, model: 'Ford Fiesta' },
    { type: 'hatchback', no_of_wheels: 4, model: 'Volkswagen Golf' },
    { type: 'hatchback', no_of_wheels: 4, model: 'Honda Fit' },
    { type: 'suv', no_of_wheels: 4, model: 'Toyota RAV4' },
    { type: 'suv', no_of_wheels: 4, model: 'Jeep Grand Cherokee' },
    { type: 'suv', no_of_wheels: 4, model: 'Subaru Outback' },
    { type: 'sedan', no_of_wheels: 4, model: 'Honda Accord' },
    { type: 'sedan', no_of_wheels: 4, model: 'Toyota Camry' },
    { type: 'sedan', no_of_wheels: 4, model: 'Nissan Altima' },
    { type: 'cruiser', no_of_wheels: 2, model: 'Harley-Davidson Softail' },
    { type: 'cruiser', no_of_wheels: 2, model: 'Indian Scout' },
    { type: 'cruiser', no_of_wheels: 2, model: 'Yamaha V Star 650' },
    { type: 'sports', no_of_wheels: 2, model: 'Porsche 911' },
    { type: 'sports', no_of_wheels: 2, model: 'Chevrolet Corvette' },
    { type: 'sports', no_of_wheels: 2, model: 'Nissan 370Z' },
];

// Function to seed data
function seedData() {
    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error(`Error creating table: ${err.message}`);
        connection.end();
        return;
      }
  
      console.log('Table created successfully.');
  
      const insertQuery = 'INSERT INTO vehicles (type, no_of_wheels, model) VALUES (?, ?, ?)';
      let insertedCount = 0;
  
      function insertNextData() {
        if (insertedCount < vehicleData.length) {
          const vehicle = vehicleData[insertedCount];
          connection.query(insertQuery, [vehicle.type, vehicle.no_of_wheels, vehicle.model], (err, results) => {
            if (err) {
              console.error(`Error inserting data: ${err.message}`);
            } else {
              console.log(`Data inserted with ID ${results.insertId}`);
            }
            insertedCount++;
            insertNextData();
          });
        } else {
          connection.end();
          console.log('Disconnected from MySQL database.');
        }
      }
  
      insertNextData();
    });
  }
  
  connection.connect((err) => {
    if (err) {
      console.error(`Error connecting to MySQL: ${err.message}`);
    } else {
      console.log('Connected to MySQL database.');
      seedData();
    }
  });
