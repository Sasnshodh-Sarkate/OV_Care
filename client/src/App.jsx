import React, { useState, useEffect } from 'react';
import { Icons } from './components/Icons';
import ReportTable from './components/ReportTable';
import ReportForm from './components/ReportForm';
import ReportUpdateForm from './components/ReportUpdateForm';

const App = () => {
  const accordionItems = [
    { label: "What You Need To Know About Me", dbName: "What_you_need_to_know_about_me" },
    { label: "My Routines", dbName: "My_Routines" },
    { label: "My Personal Care", dbName: "My_Personal_Care" },
    { label: "How I Communicate", dbName: "How_I_communicate" },
    { label: "My Health", dbName: "My_Health" },
    { label: "What I Like To Eat", dbName: "What_I_like_to_eat" },
    { label: "Playing", dbName: "Playing" },
    { label: "Helping Me With Independence", dbName: "Helping_me_with_independence" },
    { label: "My Behaviours", dbName: "Behaviour_that_may_Challenge_others" },
    { label: "How To Keep Me Safe", dbName: "How_to_keep_me_safe" },
    { label: "My Family", dbName: "My_Family" },
    { label: "My Home Family", dbName: "My_Family_Ofsted" },
    { label: "Professional And Health Contacts", dbName: "Professional_And_Health_contacts" },
    { label: "My School Information", dbName: "My_School_Information" },
    { label: "How You Can Help Contribute To My Education", dbName: "How_YOU_can_help_contribute_to_MY_Education" },
    { label: "My Goals Plans And Targets", dbName: "My_Goals_Plans_and_Targets" },
    { label: "Review Date", dbName: "Last_ReviewDate" },
    { label: "Required Reading Staff List", dbName: "all_in_one_care_and_behavior_plan" },
    { label: "Plan Sign", dbName: "Plan_Sign" },
    { label: "Signature", dbName: "Signatures_Group" }
  ];

  const initialFormState = {
    Young_Person_Id: "1", // Assuming ID as per schema bigint
    Version: "1",
    ReportDate: new Date().toISOString().split('T')[0],
    Status: "Open", // Will map to bit in backend
    OV_TenantId: "1",
    What_Makes_Me_ME: "",
    ...accordionItems.reduce((acc, item) => {
      if (item.dbName === "all_in_one_care_and_behavior_plan") {
        acc[item.dbName] = [];
      } else if (item.dbName !== "Signatures_Group") {
        acc[item.dbName] = "";
      }
      return acc;
    }, {}),
    Staff_Signature_Id: "",
    Staff_Signature_Date: "",
    Manager_Signature_Id: "",
    Manager_Signature_Date: "",
    KeyWorker_Signature_Id: "",
    Key_Worker_Signature_Date: "",
    Young_Person_Signature_Id: "",
    Filter_Date: "",
    Is_Fin: false,
    Is_Simple: false,
    Method: "",
    // Sub-categories for "This is what makes me"
    twmm_Giggle: "",
    twmm_Happy: "",
    twmm_Sad: "",
    twmm_Anxious: "",
    twmm_Challenging: "",
    twmm_Bored: "",
    // Sub-categories for "This is how you will know when I am"
    hwkw_Happy: "",
    hwkw_Sad: "",
    hwkw_Anxious: "",
    hwkw_Bored: "",
    hwkw_Confused: "",
    hwkw_Angry: "",
    hwkw_Sleepy: "",
    hwkw_Hungry: "",
    // Sub-categories for "My Routines"
    mr_School_Routines: "",
    mr_Meal_Time: "",
    mr_Evening_Bedtime: "",
    mr_Morning_Breakfast: "",
    mr_Testing_Routines: "",
    mr_New_Label: "",
    // Sub-categories for "My Personal Care"
    mpc_Bath_Time: "",
    mpc_Using_Toilet: "",
    mpc_Brushing_Teeth: "",
    mpc_Getting_Dressed: "",
    // Sub-categories for "My Health"
    mh_Medication: "",
    mh_Immunisation: "",
    mh_Health_Condition: "",
    mh_Dentist: "",
    mh_Optician: "",
    mh_Therapeutic_Support: "",
    mh_Incontinence_Service: "",
    mh_SALT_Assessor: "",
    mh_GP: "",
    // New fields for "What I Like To Eat"
    foodLikes: [""],
    foodDislikes: [""],
    // New fields for "Playing"
    playingActivities: [{ act: "", st: "", eq_r: "" }],
    // New fields for "Helping Me With Independence"
    independenceRows: [{ www: "", seh: "" }],
    // New fields for "My Behaviours"
    behaviourRows: [{ wib: "", tpi: "", hdk: "", wdt: "", hts: "", hdr: "" }],
    // New fields for "How To Keep Me Safe"
    safeText_extra: "",
    safeText_work: "",
    safeText_contact: "",
    safeText_safeguarding: "",
    safeText_otherRisks: "",
    safeText_newLabel: "",
    goodBadRows: [{ good: "", bad: "" }],
    riskRows: [
      {
        risk: "Quality of Care - DN is a quiet 16 years old young boy who is diagnosed with Autism, Speech and language delay and Severe learning disability. Doredi is non-verbal though he does have the ability to make vocal noises and repeat some simple and short words. DN also has chronic kidney disease (CKD), Posterior Urethral Valves (PUV). Due to the above mentioned diagnosis, DN has a strict diet which is required to be adhered to at all times. For example: 1. DN can not consume foods with high level of potassium and phosphate such as potatoes eggs, milk, ice cream, yogurt , mushrooms, baked beans, tomatoes sauces etc. DN'S diet is non Salt and his protein level has been reduced to once a day. In addition, D.N needs to drink 800ML of fluid a day. DN was having pureed food, it has now been changed to mushy, soft but with texture. pieces of food need to be cut very small as DN is at risk of choking. DN started his dialysis on the 29th August 2024. DN currently attends GOSH ( Great Ormond Street Hospital for children) on Mondays, Wednesdays and Fridays. Transport is provided by GOSH. His medications are constantly under review by the GOSH team. These are communicated immediately via emails or phone calls. DN is awaiting a kidney transplant and currently has a Hickman line in place. He recently removed the line independently and disposed of it in the bin without alerting staff on the 25th March 2025 at around 11.30pm. Due to DN's non-verbal communication and neurodiversity, he was unable to verbally express any pain, discomfort, or sensory irritation that may have contributed to this act. This presents a significant risk to DN's health, including risk of infection, interruption of life-sustaining treatment, and delayed emergency medical response if signs are not promptly noticed DN is mostly independent with personal care, continence and eating his food. He needs to be reminded to go to the toilet to urinate. DN has displayed mild behaviours of concerns. Last reviewed 31/03/2025",
        date: "2025-03-31", signed: "", reviewed: "", score: "33", level: "High"
      },
      { risk: "Views Wishes & Feelings - for PDF fix", date: "2023-08-30", signed: "", reviewed: "", score: "0", level: "Medium" },
      { risk: "Views Wishes & Feelings - for PDF fix", date: "2023-08-30", signed: "", reviewed: "", score: "0", level: "Medium" },
      {
        risk: "AUTO SAVE LIVE - orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the",
        date: "2023-06-29", signed: "", reviewed: "", score: "5", level: "Low"
      },
      { risk: "Care Planning - Test mnh", date: "2025-05-28", signed: "", reviewed: "", score: "9.5", level: "Medium" },
      { risk: "AUTO SAVE LIVE - TEST123", date: "2025-05-28", signed: "", reviewed: "", score: "16", level: "Low" },
      {
        risk: "Other - Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaeral voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaeral voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        date: "2023-06-27", signed: "", reviewed: "", score: "0", level: "Medium"
      }
    ]
  };

  const [view, setView] = useState('table'); // 'table', 'form', or 'edit'
  const [formData, setFormData] = useState(initialFormState);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      }
    } catch (e) {
      console.error("Failed to fetch reports", e);
    }
  };

  useEffect(() => {
    if (view === 'table') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchReports();
    }
  }, [view]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setFoodData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleAddClick = () => {
    setFormData(initialFormState);
    setView('form');
  };

  const handleEditClick = (report) => {
    let parsedTWMM = { Giggle: "", Happy: "", Sad: "", Anxious: "", Challenging: "", Bored: "" };
    try {
      if (report.This_is_what_makes_me) {
        parsedTWMM = JSON.parse(report.This_is_what_makes_me);
      }
    } catch (e) {
      console.warn("Could not parse This_is_what_makes_me JSON", e);
    }

    const twmmReport = {
      ...report,
      twmm_Giggle: parsedTWMM.Giggle || "",
      twmm_Happy: parsedTWMM.Happy || "",
      twmm_Sad: parsedTWMM.Sad || "",
      twmm_Anxious: parsedTWMM.Anxious || "",
      twmm_Challenging: parsedTWMM.Challenging || "",
      twmm_Bored: parsedTWMM.Bored || ""
    };

    let parsedHWKW = { Happy: "", Sad: "", Anxious: "", Bored: "", Confused: "", Angry: "", Sleepy: "", Hungry: "" };
    try {
      if (report.This_is_how_you_will_know_when_I_am) {
        parsedHWKW = JSON.parse(report.This_is_how_you_will_know_when_I_am);
      }
    } catch (e) {
      console.warn("Could not parse This_is_how_you_will_know_when_I_am JSON", e);
    }

    const hwkwReport = {
      ...twmmReport,
      hwkw_Happy: parsedHWKW.Happy || "",
      hwkw_Sad: parsedHWKW.Sad || "",
      hwkw_Anxious: parsedHWKW.Anxious || "",
      hwkw_Bored: parsedHWKW.Bored || "",
      hwkw_Confused: parsedHWKW.Confused || "",
      hwkw_Angry: parsedHWKW.Angry || "",
      hwkw_Sleepy: parsedHWKW.Sleepy || "",
      hwkw_Hungry: parsedHWKW.Hungry || ""
    };

    let parsedGB = { rows: [] };
    try {
      if (report.Good_day_Bad_Day) {
        parsedGB = JSON.parse(report.Good_day_Bad_Day);
      }
    } catch (e) {
      console.warn("Could not parse Good_day_Bad_Day JSON", e);
    }
    const finalGBRows = (parsedGB.rows && parsedGB.rows.length > 0) ? parsedGB.rows : [{ good: "", bad: "" }];

    const gbReport = {
      ...hwkwReport,
      goodBadRows: finalGBRows
    };

    let parsedMR = { MyRoutines: "", data: [] };
    try {
      if (report.My_Routines) {
        parsedMR = JSON.parse(report.My_Routines);
      }
    } catch (e) {
      console.warn("Could not parse My_Routines JSON", e);
    }
    const mrDataLookup = (id) => {
      if (!parsedMR.data || !Array.isArray(parsedMR.data)) return "";
      const item = parsedMR.data.find(d => d.id === id);
      return item ? item.value : "";
    };

    const mrReport = {
      ...gbReport,
      My_Routines: parsedMR.MyRoutines || report.My_Routines || "",
      mr_School_Routines: mrDataLookup("School_Routines"),
      mr_Meal_Time: mrDataLookup("Meal_Time"),
      mr_Evening_Bedtime: mrDataLookup("Evening___Bedtime"),
      mr_Morning_Breakfast: mrDataLookup("In_the_Morning___My_Breakfast"),
      mr_Testing_Routines: mrDataLookup("TESTing_my_Routines."),
      mr_New_Label: mrDataLookup("New_label_added_under_MY_Routines.")
    };

    let parsedMPC = { MyPersonalCare: "", data: [] };
    try {
      if (report.My_Personal_Care) {
        parsedMPC = JSON.parse(report.My_Personal_Care);
      }
    } catch (e) {
      console.warn("Could not parse My_Personal_Care JSON", e);
    }

    const mpcDataLookup = (id) => {
      if (!parsedMPC.data || !Array.isArray(parsedMPC.data)) return "";
      const item = parsedMPC.data.find(d => d.id === id);
      return item ? item.value : "";
    };

    const mpcReport = {
      ...mrReport,
      My_Personal_Care: parsedMPC.MyPersonalCare || report.My_Personal_Care || "",
      mpc_Bath_Time: mpcDataLookup("Bath_Time"),
      mpc_Using_Toilet: mpcDataLookup("Using_Toilet"),
      mpc_Brushing_Teeth: mpcDataLookup("Brushing_Teeth"),
      mpc_Getting_Dressed: mpcDataLookup("Getting_Dressed")
    };

    let parsedMH = { MyHealth: "", data: [] };
    try {
      if (report.My_Health) {
        parsedMH = JSON.parse(report.My_Health);
      }
    } catch (e) {
      console.warn("Could not parse My_Health JSON", e);
    }

    const mhDataLookup = (id) => {
      if (!parsedMH.data || !Array.isArray(parsedMH.data)) return "";
      const item = parsedMH.data.find(d => d.id === id);
      return item ? item.value : "";
    };

    const mhReport = {
      ...mpcReport,
      My_Health: parsedMH.MyHealth || report.My_Health || "",
      mh_Medication: mhDataLookup("Medication"),
      mh_Immunisation: mhDataLookup("Immunisation"),
      mh_Health_Condition: mhDataLookup("Health_Condition"),
      mh_Dentist: mhDataLookup("Dentist"),
      mh_Optician: mhDataLookup("Optician"),
      mh_Therapeutic_Support: mhDataLookup("Therapeutic_Support"),
      mh_Incontinence_Service: mhDataLookup("Incontinence_Service"),
      mh_SALT_Assessor: mhDataLookup("SALT_Assessor"),
      mh_GP: mhDataLookup("GP")
    };

    let parsedWLTE = { dietaryNeeds: "", foodLikes: [""], foodDislikes: [""] };
    try {
      if (report.What_I_like_to_eat) {
        parsedWLTE = JSON.parse(report.What_I_like_to_eat);
      }
    } catch (e) {
      console.warn("Could not parse What_I_like_to_eat JSON", e);
    }

    const wlteReport = {
      ...mhReport,
      What_I_like_to_eat: parsedWLTE.dietaryNeeds || report.What_I_like_to_eat || "",
      foodLikes: parsedWLTE.foodLikes || [""],
      foodDislikes: parsedWLTE.foodDislikes || [""]
    };

    let parsedPlaying = { playEnjoy: "", act: [""], st: [""], eq_r: [""] };
    try {
      if (report.Playing) {
        parsedPlaying = JSON.parse(report.Playing);
      }
    } catch (e) {
      console.warn("Could not parse Playing JSON", e);
    }

    // Convert separate arrays back to rows for UI state
    const maxLength = Math.max(
      (parsedPlaying.act || []).length,
      (parsedPlaying.st || []).length,
      (parsedPlaying.eq_r || []).length,
      1
    );
    const activitiesRows = [];
    for (let i = 0; i < maxLength; i++) {
      activitiesRows.push({
        act: (parsedPlaying.act && parsedPlaying.act[i]) || "",
        st: (parsedPlaying.st && parsedPlaying.st[i]) || "",
        eq_r: (parsedPlaying.eq_r && parsedPlaying.eq_r[i]) || ""
      });
    }

    const playingReport = {
      ...wlteReport,
      Playing: parsedPlaying.playEnjoy || report.Playing || "",
      playingActivities: activitiesRows
    };

    let parsedIndep = { promoteIndependence: "", www: [""], SEH: [""] };
    try {
      if (report.Helping_me_with_independence) {
        parsedIndep = JSON.parse(report.Helping_me_with_independence);
      }
    } catch (e) {
      console.warn("Could not parse Helping_me_with_independence JSON", e);
    }

    const indepMaxLength = Math.max(
      (parsedIndep.www || []).length,
      (parsedIndep.SEH || []).length,
      1
    );
    const indepRows = [];
    for (let i = 0; i < indepMaxLength; i++) {
      indepRows.push({
        www: (parsedIndep.www && parsedIndep.www[i]) || "",
        seh: (parsedIndep.SEH && parsedIndep.SEH[i]) || ""
      });
    }

    const indepReport = {
      ...playingReport,
      Helping_me_with_independence: parsedIndep.promoteIndependence || report.Helping_me_with_independence || "",
      independenceRows: indepRows
    };

    let parsedBeh = { mainText: "", wib: [""], tpi: [""], hdk: [""], wdt: [""], hts: [""], hdr: [""] };
    try {
      if (report.Behaviour_that_may_Challenge_others) {
        parsedBeh = JSON.parse(report.Behaviour_that_may_Challenge_others);
      }
    } catch (e) {
      console.warn("Could not parse My Behaviours JSON", e);
    }

    const behMaxLength = Math.max(
      (parsedBeh.wib || []).length,
      (parsedBeh.tpi || []).length,
      (parsedBeh.hdk || []).length,
      (parsedBeh.wdt || []).length,
      (parsedBeh.hts || []).length,
      (parsedBeh.hdr || []).length,
      1
    );
    const behRows = [];
    for (let i = 0; i < behMaxLength; i++) {
      behRows.push({
        wib: (parsedBeh.wib && parsedBeh.wib[i]) || "",
        tpi: (parsedBeh.tpi && parsedBeh.tpi[i]) || "",
        hdk: (parsedBeh.hdk && parsedBeh.hdk[i]) || "",
        wdt: (parsedBeh.wdt && parsedBeh.wdt[i]) || "",
        hts: (parsedBeh.hts && parsedBeh.hts[i]) || "",
        hdr: (parsedBeh.hdr && parsedBeh.hdr[i]) || ""
      });
    }

    const finalBehReport = {
      ...indepReport,
      Behaviour_that_may_Challenge_others: parsedBeh.mainText || report.Behaviour_that_may_Challenge_others || "",
      behaviourRows: behRows
    };

    let parsedSafe = {
      extraText: "", workText: "", contactText: "",
      wib: [""], tpi: [""], hdk: [""], wdt: [""], hts: [""], hdr: [""],
      risks: []
    };
    try {
      if (report.How_to_keep_me_safe) {
        parsedSafe = JSON.parse(report.How_to_keep_me_safe);
      }
    } catch (e) {
      console.warn("Could not parse How_to_keep_me_safe JSON", e);
    }

    // Merge static risks from state with values from DB if any
    const finalRiskRows = initialFormState.riskRows.map(row => {
      const dbMatch = (parsedSafe.risks || []).find(r => r.risk === row.risk);
      return dbMatch ? { ...row, ...dbMatch } : row;
    });

    let parsedStaff = [];
    try {
      if (report.all_in_one_care_and_behavior_plan) {
        parsedStaff = JSON.parse(report.all_in_one_care_and_behavior_plan);
        if (!Array.isArray(parsedStaff)) parsedStaff = [];
      }
    } catch (e) {
      console.warn("Could not parse staff list JSON", e);
    }

    const finalReport = {
      ...finalBehReport,
      all_in_one_care_and_behavior_plan: parsedStaff,
      How_to_keep_me_safe: parsedSafe.extraText || report.How_to_keep_me_safe || "",
      safeText_extra: parsedSafe.extraText || "",
      safeText_work: parsedSafe.workText || "",
      safeText_contact: parsedSafe.contactText || "",
      safeText_safeguarding: parsedSafe.safeguardingText || "",
      safeText_otherRisks: parsedSafe.otherRisksText || "",
      safeText_newLabel: parsedSafe.newLabelText || "",
      riskRows: finalRiskRows
    };

    setSelectedReport(finalReport);
    setView('edit');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setStatusMsg({ text: 'Syncing...', type: 'info' });

    const twmmObj = {
      Giggle: formData.twmm_Giggle,
      Happy: formData.twmm_Happy,
      Sad: formData.twmm_Sad,
      Anxious: formData.twmm_Anxious,
      Challenging: formData.twmm_Challenging,
      Bored: formData.twmm_Bored
    };
    const isTwmmEmpty = Object.values(twmmObj).every(v => !v);

    const hwkwObj = {
      Happy: formData.hwkw_Happy,
      Sad: formData.hwkw_Sad,
      Anxious: formData.hwkw_Anxious,
      Bored: formData.hwkw_Bored,
      Confused: formData.hwkw_Confused,
      Angry: formData.hwkw_Angry,
      Sleepy: formData.hwkw_Sleepy,
      Hungry: formData.hwkw_Hungry
    };
    const isHwkwEmpty = Object.values(hwkwObj).every(v => !v);

    const isGbEmpty = !formData.goodBadRows || formData.goodBadRows.every(r => !r.good && !r.bad);

    const mrData = [
      { "id": "School_Routines", "Item_Name": "School Routines", "label": "School_Routines", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mr_School_Routines || "" },
      { "id": "Meal_Time", "Item_Name": "Meal Time", "label": "Meal_Time", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mr_Meal_Time || "" },
      { "id": "Evening___Bedtime", "Item_Name": "Evening & Bedtime", "label": "Evening___Bedtime", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mr_Evening_Bedtime || "" },
      { "id": "In_the_Morning___My_Breakfast", "Item_Name": "In the Morning & My Breakfast", "label": "In_the_Morning___My_Breakfast", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mr_Morning_Breakfast || "" },
      { "id": "TESTing_my_Routines.", "Item_Name": "TESTing my Routines.", "label": "TESTing_my_Routines.", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mr_Testing_Routines || "" },
      { "id": "New_label_added_under_MY_Routines.", "Item_Name": "New label added under MY Routines.", "label": "New_label_added_under_MY_Routines.", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mr_New_Label || "" }
    ];
    const isMrEmpty = !formData.My_Routines && mrData.every(d => !d.value);

    const mpcData = [
      { "id": "Bath_Time", "Item_Name": "Bath Time and / or Shower Time", "label": "Bath_Time", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mpc_Bath_Time || "" },
      { "id": "Using_Toilet", "Item_Name": "Using the Toilet", "label": "Using_Toilet", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mpc_Using_Toilet || "" },
      { "id": "Brushing_Teeth", "Item_Name": "Brushing My Teeth", "label": "Brushing_Teeth", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mpc_Brushing_Teeth || "" },
      { "id": "Getting_Dressed", "Item_Name": "Getting Dressed", "label": "Getting_Dressed", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mpc_Getting_Dressed || "" }
    ];
    const isMpcEmpty = !formData.My_Personal_Care && mpcData.every(d => !d.value);

    const mhData = [
      { "id": "Medication", "Item_Name": "My Medication", "label": "Medication", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_Medication || "" },
      { "id": "Immunisation", "Item_Name": "My Immunisation", "label": "Immunisation", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_Immunisation || "" },
      { "id": "Health_Condition", "Item_Name": "About my health condition - Infmatrix", "label": "Health_Condition", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_Health_Condition || "" },
      { "id": "Dentist", "Item_Name": "My Dentist - Infomatrix", "label": "Dentist", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_Dentist || "" },
      { "id": "Optician", "Item_Name": "My Optician", "label": "Optician", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_Optician || "" },
      { "id": "Therapeutic_Support", "Item_Name": "My Therapeutic Support / Therapeutic Input", "label": "Therapeutic_Support", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_Therapeutic_Support || "" },
      { "id": "Incontinence_Service", "Item_Name": "My Incontinence Service", "label": "Incontinence_Service", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_Incontinence_Service || "" },
      { "id": "SALT_Assessor", "Item_Name": "My SALT Assessor", "label": "SALT_Assessor", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_SALT_Assessor || "" },
      { "id": "GP", "Item_Name": "My GP - Infomatrix", "label": "GP", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": formData.mh_GP || "" }
    ];
    const isMhEmpty = !formData.My_Health && mhData.every(d => !d.value);

    const isWlteEmpty = !formData.What_I_like_to_eat && (!formData.foodLikes || formData.foodLikes.every(v => !v)) && (!formData.foodDislikes || formData.foodDislikes.every(v => !v));
    const isPlayingEmpty = !formData.Playing && (!formData.playingActivities || formData.playingActivities.every(a => !a.act && !a.st && !a.eq_r));
    const isIndepEmpty = !formData.Helping_me_with_independence && (!formData.independenceRows || formData.independenceRows.every(r => !r.www && !r.seh));
    const isBehEmpty = !formData.Behaviour_that_may_Challenge_others && (!formData.behaviourRows || formData.behaviourRows.every(r => !r.wib && !r.tpi && !r.hdk && !r.wdt && !r.hts && !r.hdr));

    const isStaffEmpty = !formData.all_in_one_care_and_behavior_plan || formData.all_in_one_care_and_behavior_plan.length === 0;

    const submissionData = {
      ...formData,
      This_is_what_makes_me: isTwmmEmpty ? null : JSON.stringify(twmmObj),
      This_is_how_you_will_know_when_I_am: isHwkwEmpty ? null : JSON.stringify(hwkwObj),
      Good_day_Bad_Day: isGbEmpty ? null : JSON.stringify({ rows: formData.goodBadRows }),
      My_Routines: isMrEmpty ? null : JSON.stringify({ "MyRoutines": formData.My_Routines || "", "data": mrData }),
      My_Personal_Care: isMpcEmpty ? null : JSON.stringify({ "MyPersonalCare": formData.My_Personal_Care || "", "data": mpcData }),
      My_Health: isMhEmpty ? null : JSON.stringify({ "MyHealth": formData.My_Health || "", "data": mhData }),
      What_I_like_to_eat: isWlteEmpty ? null : JSON.stringify({
        dietaryNeeds: formData.What_I_like_to_eat || "",
        foodLikes: formData.foodLikes,
        foodDislikes: formData.foodDislikes
      }),
      Playing: isPlayingEmpty ? null : JSON.stringify({
        playEnjoy: formData.Playing || "",
        act: (formData.playingActivities || []).map(a => a.act),
        st: (formData.playingActivities || []).map(a => a.st),
        eq_r: (formData.playingActivities || []).map(a => a.eq_r)
      }),
      Helping_me_with_independence: isIndepEmpty ? null : JSON.stringify({
        promoteIndependence: formData.Helping_me_with_independence || "",
        www: (formData.independenceRows || []).map(r => r.www),
        SEH: (formData.independenceRows || []).map(r => r.seh)
      }),
      Behaviour_that_may_Challenge_others: isBehEmpty ? null : JSON.stringify({
        mainText: formData.Behaviour_that_may_Challenge_others || "",
        wib: (formData.behaviourRows || []).map(r => r.wib),
        tpi: (formData.behaviourRows || []).map(r => r.tpi),
        hdk: (formData.behaviourRows || []).map(r => r.hdk),
        wdt: (formData.behaviourRows || []).map(r => r.wdt),
        hts: (formData.behaviourRows || []).map(r => r.hts),
        hdr: (formData.behaviourRows || []).map(r => r.hdr)
      }),
      How_to_keep_me_safe: JSON.stringify({
        extraText: formData.safeText_extra || "",
        workText: formData.safeText_work || "",
        contactText: formData.safeText_contact || "",
        safeguardingText: formData.safeText_safeguarding || "",
        otherRisksText: formData.safeText_otherRisks || "",
        newLabelText: formData.safeText_newLabel || "",
        risks: formData.riskRows || []
      }),
      all_in_one_care_and_behavior_plan: isStaffEmpty ? null : JSON.stringify(formData.all_in_one_care_and_behavior_plan)
    };

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        setStatusMsg({ text: 'Changes saved successfully!', type: 'success' });
        setTimeout(() => {
          setStatusMsg({ text: '', type: '' });
          setView('table');
        }, 2000);
      } else {
        setStatusMsg({ text: 'Failed to save to MSSQL.', type: 'error' });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setStatusMsg({ text: 'Network Error.', type: 'error' });
    }
  };

  const handleUpdateSubmit = async (updatedData) => {
    setStatusMsg({ text: 'Updating...', type: 'info' });

    const twmmObj = {
      Giggle: updatedData.twmm_Giggle,
      Happy: updatedData.twmm_Happy,
      Sad: updatedData.twmm_Sad,
      Anxious: updatedData.twmm_Anxious,
      Challenging: updatedData.twmm_Challenging,
      Bored: updatedData.twmm_Bored
    };
    const isTwmmEmpty = Object.values(twmmObj).every(v => !v);

    const hwkwObj = {
      Happy: updatedData.hwkw_Happy,
      Sad: updatedData.hwkw_Sad,
      Anxious: updatedData.hwkw_Anxious,
      Bored: updatedData.hwkw_Bored,
      Confused: updatedData.hwkw_Confused,
      Angry: updatedData.hwkw_Angry,
      Sleepy: updatedData.hwkw_Sleepy,
      Hungry: updatedData.hwkw_Hungry
    };
    const isHwkwEmpty = Object.values(hwkwObj).every(v => !v);

    const isGbEmpty = !updatedData.goodBadRows || updatedData.goodBadRows.every(r => !r.good && !r.bad);

    const mrData = [
      { "id": "School_Routines", "Item_Name": "School Routines", "label": "School_Routines", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mr_School_Routines || "" },
      { "id": "Meal_Time", "Item_Name": "Meal Time", "label": "Meal_Time", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mr_Meal_Time || "" },
      { "id": "Evening___Bedtime", "Item_Name": "Evening & Bedtime", "label": "Evening___Bedtime", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mr_Evening_Bedtime || "" },
      { "id": "In_the_Morning___My_Breakfast", "Item_Name": "In the Morning & My Breakfast", "label": "In_the_Morning___My_Breakfast", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mr_Morning_Breakfast || "" },
      { "id": "TESTing_my_Routines.", "Item_Name": "TESTing my Routines.", "label": "TESTing_my_Routines.", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mr_Testing_Routines || "" },
      { "id": "New_label_added_under_MY_Routines.", "Item_Name": "New label added under MY Routines.", "label": "New_label_added_under_MY_Routines.", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mr_New_Label || "" }
    ];
    const isMrEmpty = !updatedData.My_Routines && mrData.every(d => !d.value);

    const mpcData = [
      { "id": "Bath_Time", "Item_Name": "Bath Time and / or Shower Time", "label": "Bath_Time", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mpc_Bath_Time || "" },
      { "id": "Using_Toilet", "Item_Name": "Using the Toilet", "label": "Using_Toilet", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mpc_Using_Toilet || "" },
      { "id": "Brushing_Teeth", "Item_Name": "Brushing My Teeth", "label": "Brushing_Teeth", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mpc_Brushing_Teeth || "" },
      { "id": "Getting_Dressed", "Item_Name": "Getting Dressed", "label": "Getting_Dressed", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mpc_Getting_Dressed || "" }
    ];
    const isMpcEmpty = !updatedData.My_Personal_Care && mpcData.every(d => !d.value);

    const mhData = [
      { "id": "Medication", "Item_Name": "My Medication", "label": "Medication", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_Medication || "" },
      { "id": "Immunisation", "Item_Name": "My Immunisation", "label": "Immunisation", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_Immunisation || "" },
      { "id": "Health_Condition", "Item_Name": "About my health condition - Infmatrix", "label": "Health_Condition", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_Health_Condition || "" },
      { "id": "Dentist", "Item_Name": "My Dentist - Infomatrix", "label": "Dentist", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_Dentist || "" },
      { "id": "Optician", "Item_Name": "My Optician", "label": "Optician", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_Optician || "" },
      { "id": "Therapeutic_Support", "Item_Name": "My Therapeutic Support / Therapeutic Input", "label": "Therapeutic_Support", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_Therapeutic_Support || "" },
      { "id": "Incontinence_Service", "Item_Name": "My Incontinence Service", "label": "Incontinence_Service", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_Incontinence_Service || "" },
      { "id": "SALT_Assessor", "Item_Name": "My SALT Assessor", "label": "SALT_Assessor", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_SALT_Assessor || "" },
      { "id": "GP", "Item_Name": "My GP - Infomatrix", "label": "GP", "BG_Color": "#46a0f5", "Color": "#ffffff", "value": updatedData.mh_GP || "" }
    ];
    const isMhEmpty = !updatedData.My_Health && mhData.every(d => !d.value);

    const isWlteEmpty = !updatedData.What_I_like_to_eat && (!updatedData.foodLikes || updatedData.foodLikes.every(v => !v)) && (!updatedData.foodDislikes || updatedData.foodDislikes.every(v => !v));
    const isPlayingEmpty = !updatedData.Playing && (!updatedData.playingActivities || updatedData.playingActivities.every(a => !a.act && !a.st && !a.eq_r));
    const isIndepEmpty = !updatedData.Helping_me_with_independence && (!updatedData.independenceRows || updatedData.independenceRows.every(r => !r.www && !r.seh));
    const isBehEmpty = !updatedData.Behaviour_that_may_Challenge_others && (!updatedData.behaviourRows || updatedData.behaviourRows.every(r => !r.wib && !r.tpi && !r.hdk && !r.wdt && !r.hts && !r.hdr));

    const isStaffEmpty = !updatedData.all_in_one_care_and_behavior_plan || updatedData.all_in_one_care_and_behavior_plan.length === 0;

    const submissionData = {
      ...updatedData,
      This_is_what_makes_me: isTwmmEmpty ? null : JSON.stringify(twmmObj),
      This_is_how_you_will_know_when_I_am: isHwkwEmpty ? null : JSON.stringify(hwkwObj),
      Good_day_Bad_Day: isGbEmpty ? null : JSON.stringify({ rows: updatedData.goodBadRows }),
      My_Routines: isMrEmpty ? null : JSON.stringify({ "MyRoutines": updatedData.My_Routines || "", "data": mrData }),
      My_Personal_Care: isMpcEmpty ? null : JSON.stringify({ "MyPersonalCare": updatedData.My_Personal_Care || "", "data": mpcData }),
      My_Health: isMhEmpty ? null : JSON.stringify({ "MyHealth": updatedData.My_Health || "", "data": mhData }),
      What_I_like_to_eat: isWlteEmpty ? null : JSON.stringify({
        dietaryNeeds: updatedData.What_I_like_to_eat || "",
        foodLikes: updatedData.foodLikes,
        foodDislikes: updatedData.foodDislikes
      }),
      Playing: isPlayingEmpty ? null : JSON.stringify({
        playEnjoy: updatedData.Playing || "",
        act: (updatedData.playingActivities || []).map(a => a.act),
        st: (updatedData.playingActivities || []).map(a => a.st),
        eq_r: (updatedData.playingActivities || []).map(a => a.eq_r)
      }),
      Helping_me_with_independence: isIndepEmpty ? null : JSON.stringify({
        promoteIndependence: updatedData.Helping_me_with_independence || "",
        www: (updatedData.independenceRows || []).map(r => r.www),
        SEH: (updatedData.independenceRows || []).map(r => r.seh)
      }),
      Behaviour_that_may_Challenge_others: isBehEmpty ? null : JSON.stringify({
        mainText: updatedData.Behaviour_that_may_Challenge_others || "",
        wib: (updatedData.behaviourRows || []).map(r => r.wib),
        tpi: (updatedData.behaviourRows || []).map(r => r.tpi),
        hdk: (updatedData.behaviourRows || []).map(r => r.hdk),
        wdt: (updatedData.behaviourRows || []).map(r => r.wdt),
        hts: (updatedData.behaviourRows || []).map(r => r.hts),
        hdr: (updatedData.behaviourRows || []).map(r => r.hdr)
      }),
      How_to_keep_me_safe: JSON.stringify({
        extraText: updatedData.safeText_extra || "",
        workText: updatedData.safeText_work || "",
        contactText: updatedData.safeText_contact || "",
        safeguardingText: updatedData.safeText_safeguarding || "",
        otherRisksText: updatedData.safeText_otherRisks || "",
        newLabelText: updatedData.safeText_newLabel || "",
        wib: (updatedData.safeBehaviourRows || []).map(r => r.wib),
        tpi: (updatedData.safeBehaviourRows || []).map(r => r.tpi),
        hdk: (updatedData.safeBehaviourRows || []).map(r => r.hdk),
        wdt: (updatedData.safeBehaviourRows || []).map(r => r.wdt),
        hts: (updatedData.safeBehaviourRows || []).map(r => r.hts),
        hdr: (updatedData.safeBehaviourRows || []).map(r => r.hdr),
        risks: updatedData.riskRows || []
      }),
      all_in_one_care_and_behavior_plan: isStaffEmpty ? null : JSON.stringify(updatedData.all_in_one_care_and_behavior_plan)
    };

    try {
      const response = await fetch(`/api/reports/${submissionData.Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        setStatusMsg({ text: 'Record updated successfully!', type: 'success' });
        setTimeout(() => {
          setStatusMsg({ text: '', type: '' });
          setView('table');
          setSelectedReport(null);
        }, 2000);
      } else {
        setStatusMsg({ text: 'Failed to update record in MSSQL.', type: 'error' });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setStatusMsg({ text: 'Network Error.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-800 pb-20 font-['Segoe_UI']">
      <nav className="bg-white border-b border-slate-200 h-12 flex items-center px-4 sticky top-0 z-50">
        <span className="text-slate-700 font-semibold text-[18px]">Simple Care Planning</span>
      </nav>

      {view === 'table' ? (
        <ReportTable
          reports={reports}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : view === 'form' ? (
        <ReportForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          onBack={() => setView('table')}
          accordionItems={accordionItems}
          statusMsg={statusMsg}
          setFoodData={setFoodData}
        />
      ) : (
        <ReportUpdateForm
          initialData={selectedReport}
          handleInputChange={handleInputChange}
          handleSubmit={handleUpdateSubmit}
          onBack={() => setView('table')}
          accordionItems={accordionItems}
          statusMsg={statusMsg}
          setFoodData={setFoodData}
        />
      )}
    </div>
  );
};

export default App;
