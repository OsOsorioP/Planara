import { connect } from "mongoose";

const db = () => {
  const url = String(process.env.MONGO_URI);
  connect(url)
    .then(() => {
      console.log("Estas conectado a mongoDB", process.env.MONGO_URI);
    })
    .catch((error) => {
      console.log("No encuentro mongoDB", error);
    });
};

export default db;
