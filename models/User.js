const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already registered"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.set("timestamps",true);

module.exports = mongoose.model("users", userSchema);
