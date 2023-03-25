const yup = require("yup");
const bcrypt = require("bcrypt");
const client = require("../db/dbConfig");

const users = [];

// signup user data validation
let createUserDto = yup.object({
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

const addUser = async (userData) => {
    const validUser = await createUserDto.validate(userData, { abortEarly: false });

    const hashedPass = await bcrypt.hash(userData.password, 10);
    const user = {
        id: users.length,
        first_name: validUser.first_name,
        last_name: validUser.last_name,
        email: validUser.email,
        password: hashedPass,
    };

    const sql = `INSERT INTO users (first_name, last_name, email, password, highest_score)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING (first_name, last_name, email, highest_score);`;

    const value = [user.first_name, user.last_name, user.email, user.password, 0];
    const newUser = await client.query(sql, value);
    return newUser;
};

const getUserByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email=$1`;
    const resp = await client.query(sql, [email]);
    if (resp.rowCount === 0) return null;

    return resp.rows[0];
};

const getUserById = async (id) => {
    const sql = `SELECT * FROM users WHERE id=$1`;
    const resp = await client.query(sql, [id]);
    if (resp.rowCount === 0) return null;

    return resp.rows[0];
};

const updateUserHighestScore = async (id, highestScore) => {
    const sql = "UPDATE users SET highest_score = $1 WHERE id = $2 RETURNING *;";
    const resp = await client.query(sql, [highestScore, id]);
    return resp.rows[0];
};

const User = { addUser, getUserByEmail, getUserById, updateUserHighestScore };

module.exports = User;
