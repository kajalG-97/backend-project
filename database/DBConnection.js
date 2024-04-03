import mongoose from "mongoose";

// MongoDB database configuration
export const DBConnection = (app, port) => {
  mongoose
    .connect(
      "mongodb+srv://kajalganorkar:7gI4ROrDNPtC117l@cluster0.ix4rhla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Connected to DB");
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => console.log("failed to connect mongoDB", error));
};
