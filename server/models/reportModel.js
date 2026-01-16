const { poolPromise, sql } = require('../config/db_config');

const getAllReports = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Care_Planning ORDER BY Created_On DESC');
    return result.recordset.map(record => ({
        ...record,
        Status: record.Status === true || record.Status === 1 ? "Open" : "Closed",
        Is_Fin_Text: record.Is_Fin === true || record.Is_Fin === 1 ? "Final" : "Draft"
    }));
};

const createReport = async (data) => {
    const pool = await poolPromise;

    const safeString = (val, maxLen) => {
        const str = String(val || '');
        return maxLen ? str.slice(0, maxLen) : str;
    };
    const safeInt = (val) => {
        const p = parseInt(val);
        return isNaN(p) ? null : p;
    };
    const safeBigInt = (val) => {
        if (val === null || val === undefined || val === "") return null;
        return String(val);
    };
    const safeDate = (val) => (val && val !== "" ? val : null);

    const query = `
    INSERT INTO Care_Planning (
        Last_Modified_On, Last_Modified_By, OV_TenantId, Young_Person_Id,
        all_in_one_care_and_behavior_plan, What_Makes_Me_ME, What_you_need_to_know_about_me,
        This_is_what_makes_me, This_is_how_you_will_know_when_I_am, Good_day_Bad_Day,
        My_Routines, My_Personal_Care, How_I_communicate, My_Health, What_I_like_to_eat,
        Playing, Helping_me_with_independence, Behaviour_that_may_Challenge_others,
        How_to_keep_me_safe, My_Family, My_Family_Ofsted, Professional_And_Health_contacts,
        My_School_Information, How_YOU_can_help_contribute_to_MY_Education,
        My_Goals_Plans_and_Targets, Plan_Sign, Version, Staff_Signature_Id,
        Sent_to_Social_Worker, Method, Approved_on, KeyWorker_Signature_Id,
        Young_Person_Signature_Id, Manager_Signature_Id, Status, ReportDate,
        Filter_Date, Is_Fin, Is_Simple, Last_ReviewDate, Staff_Signature_Date,
        Key_Worker_Signature_Date, Manager_Signature_Date, Created_On, Created_By
    ) VALUES (
        @Now, @Last_Modified_By, @OV_TenantId, @Young_Person_Id,
        @all_in_one_care_and_behavior_plan, @What_Makes_Me_ME, @What_you_need_to_know_about_me,
        @This_is_what_makes_me, @This_is_how_you_will_know_when_I_am, @Good_day_Bad_Day,
        @My_Routines, @My_Personal_Care, @How_I_communicate, @My_Health, @What_I_like_to_eat,
        @Playing, @Helping_me_with_independence, @Behaviour_that_may_Challenge_others,
        @How_to_keep_me_safe, @My_Family, @My_Family_Ofsted, @Professional_And_Health_contacts,
        @My_School_Information, @How_YOU_can_help_contribute_to_MY_Education,
        @My_Goals_Plans_and_Targets, @Plan_Sign, @Version, @Staff_Signature_Id,
        @Sent_to_Social_Worker, @Method, @Approved_on, @KeyWorker_Signature_Id,
        @Young_Person_Signature_Id, @Manager_Signature_Id, @Status, @ReportDate,
        @Filter_Date, @Is_Fin, @Is_Simple, @Last_ReviewDate, @Staff_Signature_Date,
        @Key_Worker_Signature_Date, @Manager_Signature_Date, @Now, @Created_By
    )`;

    const request = pool.request();
    const now = new Date();
    request.input('Now', sql.DateTime, now);

    request.input('Last_Modified_By', sql.NVarChar(150), safeString(data.Last_Modified_By || data.Created_By || 'System', 150));
    request.input('OV_TenantId', sql.Int, safeInt(data.OV_TenantId) || 0);
    request.input('Created_By', sql.NVarChar(150), safeString(data.Created_By || 'System', 150));
    request.input('Young_Person_Id', sql.BigInt, safeBigInt(data.Young_Person_Id));
    request.input('Version', sql.Int, safeInt(data.Version));
    request.input('Status', sql.Bit, data.Status === 'Open' ? 1 : 0);
    request.input('ReportDate', sql.Date, safeDate(data.ReportDate));
    request.input('Filter_Date', sql.DateTime, safeDate(data.Filter_Date));
    request.input('Is_Fin', sql.Bit, (data.Is_Fin === true || data.Is_Fin === "true" || data.Is_Fin === 1) ? 1 : 0);
    request.input('Is_Simple', sql.Bit, (data.Is_Simple === true || data.Is_Simple === "true" || data.Is_Simple === 1) ? 1 : 0);
    request.input('Last_ReviewDate', sql.Date, safeDate(data.Last_ReviewDate));
    request.input('Method', sql.Int, safeInt(data.Method));

    request.input('all_in_one_care_and_behavior_plan', sql.NVarChar, data.all_in_one_care_and_behavior_plan || null);
    request.input('What_Makes_Me_ME', sql.NVarChar, data.What_Makes_Me_ME || null);
    request.input('What_you_need_to_know_about_me', sql.NVarChar, data.What_you_need_to_know_about_me || null);
    request.input('This_is_what_makes_me', sql.NVarChar, data.This_is_what_makes_me || null);
    request.input('This_is_how_you_will_know_when_I_am', sql.NVarChar, data.This_is_how_you_will_know_when_I_am || null);
    request.input('Good_day_Bad_Day', sql.NVarChar, data.Good_day_Bad_Day || null);
    request.input('My_Routines', sql.NVarChar, data.My_Routines || null);
    request.input('My_Personal_Care', sql.NVarChar, data.My_Personal_Care || null);
    request.input('How_I_communicate', sql.NVarChar, data.How_I_communicate || null);
    request.input('My_Health', sql.NVarChar, data.My_Health || null);
    request.input('What_I_like_to_eat', sql.NVarChar, data.What_I_like_to_eat || null);
    request.input('Playing', sql.NVarChar, data.Playing || null);
    request.input('Helping_me_with_independence', sql.NVarChar, data.Helping_me_with_independence || null);
    request.input('Behaviour_that_may_Challenge_others', sql.NVarChar, data.Behaviour_that_may_Challenge_others || null);
    request.input('How_to_keep_me_safe', sql.NVarChar, data.How_to_keep_me_safe || null);
    request.input('My_Family', sql.NVarChar, data.My_Family || null);
    request.input('My_Family_Ofsted', sql.NVarChar, data.My_Family_Ofsted || null);
    request.input('Professional_And_Health_contacts', sql.NVarChar, data.Professional_And_Health_contacts || null);
    request.input('My_School_Information', sql.NVarChar, data.My_School_Information || null);
    request.input('How_YOU_can_help_contribute_to_MY_Education', sql.NVarChar, data.How_YOU_can_help_contribute_to_MY_Education || null);
    request.input('My_Goals_Plans_and_Targets', sql.NVarChar, data.My_Goals_Plans_and_Targets || null);
    request.input('Plan_Sign', sql.NVarChar, data.Plan_Sign || null);

    request.input('Staff_Signature_Id', sql.BigInt, safeBigInt(data.Staff_Signature_Id));
    request.input('KeyWorker_Signature_Id', sql.BigInt, safeBigInt(data.KeyWorker_Signature_Id));
    request.input('Young_Person_Signature_Id', sql.BigInt, safeBigInt(data.Young_Person_Signature_Id));
    request.input('Manager_Signature_Id', sql.BigInt, safeBigInt(data.Manager_Signature_Id));

    request.input('Staff_Signature_Date', sql.DateTime, safeDate(data.Staff_Signature_Date));
    request.input('Key_Worker_Signature_Date', sql.DateTime, safeDate(data.Key_Worker_Signature_Date));
    request.input('Manager_Signature_Date', sql.DateTime, safeDate(data.Manager_Signature_Date));
    request.input('Sent_to_Social_Worker', sql.DateTime, safeDate(data.Sent_to_Social_Worker));
    request.input('Approved_on', sql.DateTime, safeDate(data.Approved_on));

    try {
        return await request.query(query);
    } catch (err) {
        console.error("CREATE_REPORT_ERROR:", err.message);
        throw err;
    }
};

const updateReport = async (id, data) => {
    const pool = await poolPromise;

    const safeString = (val, maxLen) => {
        const str = String(val || '');
        return maxLen ? str.slice(0, maxLen) : str;
    };
    const safeInt = (val) => {
        const p = parseInt(val);
        return isNaN(p) ? null : p;
    };
    const safeBigInt = (val) => {
        if (val === null || val === undefined || val === "") return null;
        return String(val);
    };
    const safeDate = (val) => (val && val !== "" ? val : null);

    const query = `
    UPDATE Care_Planning SET
        Last_Modified_On = @Now,
        Last_Modified_By = @Last_Modified_By,
        OV_TenantId = @OV_TenantId,
        Young_Person_Id = @Young_Person_Id,
        all_in_one_care_and_behavior_plan = @all_in_one_care_and_behavior_plan,
        What_Makes_Me_ME = @What_Makes_Me_ME,
        What_you_need_to_know_about_me = @What_you_need_to_know_about_me,
        This_is_what_makes_me = @This_is_what_makes_me,
        This_is_how_you_will_know_when_I_am = @This_is_how_you_will_know_when_I_am,
        Good_day_Bad_Day = @Good_day_Bad_Day,
        My_Routines = @My_Routines,
        My_Personal_Care = @My_Personal_Care,
        How_I_communicate = @How_I_communicate,
        My_Health = @My_Health,
        What_I_like_to_eat = @What_I_like_to_eat,
        Playing = @Playing,
        Helping_me_with_independence = @Helping_me_with_independence,
        Behaviour_that_may_Challenge_others = @Behaviour_that_may_Challenge_others,
        How_to_keep_me_safe = @How_to_keep_me_safe,
        My_Family = @My_Family,
        My_Family_Ofsted = @My_Family_Ofsted,
        Professional_And_Health_contacts = @Professional_And_Health_contacts,
        My_School_Information = @My_School_Information,
        How_YOU_can_help_contribute_to_MY_Education = @How_YOU_can_help_contribute_to_MY_Education,
        My_Goals_Plans_and_Targets = @My_Goals_Plans_and_Targets,
        Plan_Sign = @Plan_Sign,
        Version = @Version,
        Staff_Signature_Id = @Staff_Signature_Id,
        Sent_to_Social_Worker = @Sent_to_Social_Worker,
        Method = @Method,
        Approved_on = @Approved_on,
        KeyWorker_Signature_Id = @KeyWorker_Signature_Id,
        Young_Person_Signature_Id = @Young_Person_Signature_Id,
        Manager_Signature_Id = @Manager_Signature_Id,
        Status = @Status,
        ReportDate = @ReportDate,
        Filter_Date = @Filter_Date,
        Is_Fin = @Is_Fin,
        Is_Simple = @Is_Simple,
        Last_ReviewDate = @Last_ReviewDate,
        Staff_Signature_Date = @Staff_Signature_Date,
        Key_Worker_Signature_Date = @Key_Worker_Signature_Date,
        Manager_Signature_Date = @Manager_Signature_Date
    WHERE Id = @Id`;

    const request = pool.request();
    request.input('Id', sql.BigInt, safeBigInt(id));
    request.input('Now', sql.DateTime, new Date());

    request.input('Last_Modified_By', sql.NVarChar(150), safeString(data.Last_Modified_By || 'System', 150));
    request.input('OV_TenantId', sql.Int, safeInt(data.OV_TenantId) || 0);
    request.input('Young_Person_Id', sql.BigInt, safeBigInt(data.Young_Person_Id));
    request.input('Version', sql.Int, safeInt(data.Version));
    request.input('Status', sql.Bit, data.Status === 'Open' ? 1 : 0);
    request.input('ReportDate', sql.Date, safeDate(data.ReportDate));
    request.input('Filter_Date', sql.DateTime, safeDate(data.Filter_Date));
    request.input('Is_Fin', sql.Bit, (data.Is_Fin === true || data.Is_Fin === "true" || data.Is_Fin === 1) ? 1 : 0);
    request.input('Is_Simple', sql.Bit, (data.Is_Simple === true || data.Is_Simple === "true" || data.Is_Simple === 1) ? 1 : 0);
    request.input('Last_ReviewDate', sql.Date, safeDate(data.Last_ReviewDate));
    request.input('Method', sql.Int, safeInt(data.Method));

    request.input('all_in_one_care_and_behavior_plan', sql.NVarChar, data.all_in_one_care_and_behavior_plan || null);
    request.input('What_Makes_Me_ME', sql.NVarChar, data.What_Makes_Me_ME || null);
    request.input('What_you_need_to_know_about_me', sql.NVarChar, data.What_you_need_to_know_about_me || null);
    request.input('This_is_what_makes_me', sql.NVarChar, data.This_is_what_makes_me || null);
    request.input('This_is_how_you_will_know_when_I_am', sql.NVarChar, data.This_is_how_you_will_know_when_I_am || null);
    request.input('Good_day_Bad_Day', sql.NVarChar, data.Good_day_Bad_Day || null);
    request.input('My_Routines', sql.NVarChar, data.My_Routines || null);
    request.input('My_Personal_Care', sql.NVarChar, data.My_Personal_Care || null);
    request.input('How_I_communicate', sql.NVarChar, data.How_I_communicate || null);
    request.input('My_Health', sql.NVarChar, data.My_Health || null);
    request.input('What_I_like_to_eat', sql.NVarChar, data.What_I_like_to_eat || null);
    request.input('Playing', sql.NVarChar, data.Playing || null);
    request.input('Helping_me_with_independence', sql.NVarChar, data.Helping_me_with_independence || null);
    request.input('Behaviour_that_may_Challenge_others', sql.NVarChar, data.Behaviour_that_may_Challenge_others || null);
    request.input('How_to_keep_me_safe', sql.NVarChar, data.How_to_keep_me_safe || null);
    request.input('My_Family', sql.NVarChar, data.My_Family || null);
    request.input('My_Family_Ofsted', sql.NVarChar, data.My_Family_Ofsted || null);
    request.input('Professional_And_Health_contacts', sql.NVarChar, data.Professional_And_Health_contacts || null);
    request.input('My_School_Information', sql.NVarChar, data.My_School_Information || null);
    request.input('How_YOU_can_help_contribute_to_MY_Education', sql.NVarChar, data.How_YOU_can_help_contribute_to_MY_Education || null);
    request.input('My_Goals_Plans_and_Targets', sql.NVarChar, data.My_Goals_Plans_and_Targets || null);
    request.input('Plan_Sign', sql.NVarChar, data.Plan_Sign || null);

    request.input('Staff_Signature_Id', sql.BigInt, safeBigInt(data.Staff_Signature_Id));
    request.input('KeyWorker_Signature_Id', sql.BigInt, safeBigInt(data.KeyWorker_Signature_Id));
    request.input('Young_Person_Signature_Id', sql.BigInt, safeBigInt(data.Young_Person_Signature_Id));
    request.input('Manager_Signature_Id', sql.BigInt, safeBigInt(data.Manager_Signature_Id));

    request.input('Staff_Signature_Date', sql.DateTime, safeDate(data.Staff_Signature_Date));
    request.input('Key_Worker_Signature_Date', sql.DateTime, safeDate(data.Key_Worker_Signature_Date));
    request.input('Manager_Signature_Date', sql.DateTime, safeDate(data.Manager_Signature_Date));
    request.input('Sent_to_Social_Worker', sql.DateTime, safeDate(data.Sent_to_Social_Worker));
    request.input('Approved_on', sql.DateTime, safeDate(data.Approved_on));

    try {
        return await request.query(query);
    } catch (err) {
        console.error("UPDATE_REPORT_ERROR:", err.message);
        throw err;
    }
};

module.exports = {
    getAllReports,
    createReport,
    updateReport
};
