const staffModel = require('../models/staffModel');

const getStaff = async (req, res) => {
    try {
        const staff = await staffModel.getAllStaff();
        res.status(200).json(staff);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

module.exports = {
    getStaff
};
