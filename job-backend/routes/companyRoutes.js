const express = require("express");
const {
    createCompany,
    getAllCompanies,
    getSingleCompany,
    updateCompany,
    deleteCompany,
} = require("../controllers/companyController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

//  clean REST API
router.post("/", protect, authorizeRoles('admin'), createCompany);
router.get("/", getAllCompanies);
router.get("/:id", getSingleCompany);
router.put("/:id", protect, authorizeRoles('admin'), updateCompany);
router.delete("/:id", protect, authorizeRoles('admin'), deleteCompany);

module.exports = router;