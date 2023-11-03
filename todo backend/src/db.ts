import mongoose from "mongoose";

let connection = null;

const connectToDatabase = async () => {
  if (connection == null) {
    console.log("Creating new connection to the database....");
    const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    if (connection) {
      console.log("A new db connection established");
    }
    return connection;
  }
  console.log(
    "Connection already established, reusing the existing connection"
  );
};

export default connectToDatabase;
