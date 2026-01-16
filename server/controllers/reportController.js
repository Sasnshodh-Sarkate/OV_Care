const reportModel = require('../models/reportModel');

const getReports = async (req, res) => {
    try {
        const reports = await reportModel.getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

const addReport = async (req, res) => {
    try {
        await reportModel.createReport(req.body);
        res.status(200).json({ message: 'Success! New Care Plan record created.' });
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        await reportModel.updateReport(id, req.body);
        res.status(200).json({ message: 'Success! Care Plan record updated.' });
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

module.exports = {
    getReports,
    addReport,
    updateReport
};
