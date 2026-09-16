import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://rothanaemily_db_user:5JUF0w87bBDfF7Gz@cluster0.sqsfclz.mongodb.net/4PsPizza",
    )
    .then(() => console.log("DB connected "));
};
