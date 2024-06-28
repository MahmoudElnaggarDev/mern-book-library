const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("من فضلك قم بملئ جميع الخانات");
  }

  if (!validator.isEmail(email)) {
    throw Error("البريد الإلكتروني غير صالح");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("كلمة المرور يجب أن تحتوي على حروف كبيرة وصغيرة ورموز وأرقام");
  }

  const emailExist = await this.findOne({ email });

  if (emailExist) {
    throw Error("البريد الإلكتروني مستخدم مسبقًا");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("من فضلك قم بملئ جميع الخانات");
  }

  if (!validator.isEmail(email)) {
    throw Error("البريد الإلكتروني غير صالح");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("البريد الإلكتروني غير موجود");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("كلمة المرور خاطئة");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
