const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => console.log("Successfully connected to DB"))
  .catch((e) => console.error("error connecting to the DB", e));

const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
