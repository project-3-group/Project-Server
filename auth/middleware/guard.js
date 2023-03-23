const localGuard = (req, res, next) => {
  if (!req.user) res.status(401).send({ message: "Not Authorized" });

  next();
};

module.exports = localGuard;
