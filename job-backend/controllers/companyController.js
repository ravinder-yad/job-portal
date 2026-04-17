const Company = require("../models/Company");

// ✅ CREATE COMPANY
const createCompany = async (req, res) => {
    try {
        const { name, logo, website, location, industry, description, size, foundedYear } = req.body;

        if (!name || !location || !industry) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const company = await Company.create({
            name,
            logo,
            website,
            location,
            industry,
            description,
            size,
            foundedYear,
            createdBy: req.user.id, // 🔥 FIXED
        });

        res.status(201).json({
            message: "Company created successfully",
            company,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ GET ALL COMPANIES (FILTER)
const getAllCompanies = async (req, res) => {
    try {
        const { keyword, location } = req.query;

        let query = {};

        if (keyword) {
            query.name = { $regex: keyword, $options: "i" };
        }

        if (location) {
            query.location = location;
        }

        const companies = await Company.find(query);

        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ GET SINGLE COMPANY (POPULATE 🔥)
const getSingleCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
            .populate("jobs")
            .populate("followers", "name email");

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.json(company);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ UPDATE COMPANY (OWNER ONLY 🔐)
const updateCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        if (company.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updated = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ DELETE COMPANY (OWNER ONLY 🔐)
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        if (company.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await company.deleteOne();

        res.json({ message: "Company deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createCompany,
    getAllCompanies,
    getSingleCompany,
    updateCompany,
    deleteCompany,
};