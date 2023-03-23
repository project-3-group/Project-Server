const users = [];

const addUser = (user) => {
  users.push(user);
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
