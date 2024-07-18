const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add id to req object
  const authHeader = req.header("Authorization");
	const token = authHeader && authHeader.split(" ")[1];
  
  
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(`Token verification failed: ${error.message}`);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
