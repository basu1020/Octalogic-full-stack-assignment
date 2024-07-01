// app.js

const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Extracting data from env file.
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE
} = process.env;

// Create Sequelize instance
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

// Define Vehicle model
const Vehicle = sequelize.define('Vehicles', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  no_of_wheels: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Data to be inserted
const vehicleData = [
    { type: 'hatchback', no_of_wheels: 4, model: 'Ford Fiesta' },
    { type: 'hatchback', no_of_wheels: 4, model: 'Volkswagen Golf' },
    { type: 'hatchback', no_of_wheels: 4, model: 'Honda Fit' },
    { type: 'suv', no_of_wheels: 4, model: 'Toyota RAV4' },
    { type: 'suv', no_of_wheels: 4, model: 'Jeep Grand Cherokee' },
    { type: 'suv', no_of_wheels: 4, model: 'Subaru Outback' },
    { type: 'sedan', no_of_wheels: 4, model: 'Honda City' },
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
async function seedData() {
  try {
    // Sync the model with the database to ensure the table exists
    await sequelize.sync({ force: true });

    // Seed data
    await Vehicle.bulkCreate(vehicleData);

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the connection
    await sequelize.close();
    console.log('Disconnected from MySQL database.');
  }
}

// Connect to database and seed data
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database.');

    // Call the seed function
    seedData();
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });
