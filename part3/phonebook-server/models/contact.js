const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((r) => console.log("successfully connected to MONGODB"))
  .catch((e) => console.error("could not connect to DB", e));

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

contactSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
