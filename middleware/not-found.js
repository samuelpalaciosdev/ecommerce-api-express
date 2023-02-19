const notFound = (req, res) => res.status(404).send(`Route does not exist ${req.originalUrl}`);

module.exports = notFound;
