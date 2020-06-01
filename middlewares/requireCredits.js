//
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(401).send({ error: "Not enough credits" });
  }
  next(); //lets let this user continue on to the request handler
};
