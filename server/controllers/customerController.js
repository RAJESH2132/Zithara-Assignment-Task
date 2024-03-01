const db = require("../models/db");

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM customer_data");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCustomers,
};
