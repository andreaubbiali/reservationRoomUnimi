const mongoose = require("mongoose");

const { MONGO_URI, DBNAME } = process.env;

mongoose.set('debug', true);

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(MONGO_URI, {
            dbName: DBNAME,
        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};