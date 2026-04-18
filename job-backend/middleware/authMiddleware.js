// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        // Bearer token remove
        if (token.startsWith("Bearer")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// 🔥 Role-based middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

// 👑 Admin only middleware (Fixed email)
const isAdmin = (req, res, next) => {
    if (req.user.email !== "ravinderyadav092007@gmail.com") {
        return res.status(403).json({ message: "Admin only access" });
    }
    next();
};

module.exports = { protect, authorizeRoles, isAdmin };