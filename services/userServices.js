const yup = require("yup");
const bcrypt = require("bcrypt");

const users = [];

// signup user data validation
let userDto = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const addUser = async (user) => {
  const validUser = await userDto.validate(user, { abortEarly: false });

  const hashedPass = await bcrypt.hash(user.password, 10);
  const newUser = {
    id: users.length,
    first_name: validUser.first_name,
    last_name: validUser.last_name,
    email: validUser.email,
    password: hashedPass,
  };

  users.push(newUser);
};

const getAllUser = () => users;

const getUserByEmail = (email) => {
  const user = users.find((user) => user.email === email);
  if (user === undefined) return null;

  return user;
};

const getUserById = (id) => {
  const user = users.find((user) => user.id === id);
  if (user === undefined) return null;

  return user;
};

const User = { addUser, getAllUser, getUserByEmail, getUserById };

module.exports = User;
