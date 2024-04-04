import mongoose from "mongoose";

// MongoDB database configuration
export const DBConnection = (app, port) => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB");
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => console.log("failed to connect mongoDB", error));
};
