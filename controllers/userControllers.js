const express = require("express");
const { ValidationError } = require("yup");
const { addUser, updateUserHighestScore } = require("../services/userServices");
const { localGuard } = require("../auth");

const route = express.Router();

route.get('/',(req,res) => {
  res.send('hello from the user get route')});
route.post("/signup", async (req, res, next) => {
    try {
        const user = req.body;
        await addUser(user);
        res.status(201).send();
    } 
    catch (err) {
        handleValidationError(err, req, res);
        next(err);
    }
});

route.get("/user", localGuard, async (req, res, next) => {
    res.json(req.user);
});

route.put("/user", localGuard, async (req, res, next) => {
  try {
    const user = await updateUserHighestScore(req.user.id, req.body.hights_score);
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
});

// error
function handleValidationError(err, req, res) {
    if (err instanceof ValidationError) {
        return res.status(400).json(err);
    }
    if (err.code && (err.code.slice(0, 2) === "23" || err.code.slice(0, 2) === "22")) {
        console.error(err.message);
        res.status(400);
        return res.json({
            status: 400,
            responseText: "Bad Request",
            message: err.message,
        });
    }
}

module.exports = route;
