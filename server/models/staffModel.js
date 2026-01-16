const { poolPromise, sql } = require('../config/db_config');

const getAllStaff = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT Id, Staff_Name FROM Staff_Master WHERE Is_Active = 1 ORDER BY Staff_Name ASC');
        return result.recordset;
    } catch (err) {
        console.error('SQL error in getAllStaff', err);
        throw err;
    }
};

module.exports = {
    getAllStaff
};
