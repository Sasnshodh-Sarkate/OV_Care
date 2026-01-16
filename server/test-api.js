// const axios = require('axios');

// const API_BASE_URL = 'http://localhost:5000/api/reports';

// const sampleData = {
//     OV_TenantId: 1,
//     Young_Person_Id: "12345",
//     Version: "1",
//     ReportDate: "2024-01-13",
//     Status: "Open",
//     Is_Fin: "false", // Draft
//     What_Makes_Me_ME: "I am a creative person who loves solving puzzles.",
//     What_you_need_to_know_about_me: "I need a quiet space to focus during the mornings.",
//     This_is_what_makes_me: "Resilience and kindness.",
//     This_is_how_you_will_know_when_I_am: "I become very quiet and avoid eye contact when stressed.",
//     Good_day_Bad_Day: "A good day starts with a walk; a bad day involves loud noises.",
//     My_Routines: "Morning yoga and a healthy breakfast.",
//     My_Personal_Care: "Independent with some reminders.",
//     How_I_communicate: "Verbal, preferred English.",
//     My_Health: "No allergies, physically active.",
//     What_I_like_to_eat: "Fruits, vegetables, and pasta.",
//     Playing: "Loves board games and football.",
//     Helping_me_with_independence: "Encourage me to plan my own schedule.",
//     Behaviour_that_may_Challenge_others: "Can be impulsive when hungry.",
//     How_to_keep_me_safe: "Always use a crosswalk.",
//     My_Family: "Close relationship with siblings.",
//     My_Family_Ofsted: "Weekly visits scheduled.",
//     Professional_And_Health_contacts: "Dr. Jones (GP).",
//     My_School_Information: "Enjoys Science and Art.",
//     How_YOU_can_help_contribute_to_MY_Education: "Help with reading practice.",
//     My_Goals_Plans_and_Targets: "Learn to cook a healthy meal.",
//     Plan_Sign: "Digital Signature Ready",
//     Staff_Signature_Id: "55",
//     Staff_Signature_Date: "2024-01-13T10:00:00Z",
//     Manager_Signature_Id: "66",
//     Manager_Signature_Date: "2024-01-13T11:00:00Z",
//     Created_By: "System Test User"
// };

// async function runTest() {
//     try {
//         console.log('--- STARTING COMPREHENSIVE API TEST ---');

//         // 1. CREATE (POST)
//         console.log('1. Testing CREATE (POST)...');
//         const createRes = await axios.post(API_BASE_URL, sampleData);
//         console.log('Response:', createRes.data.message);

//         // 2. READ ALL (GET)
//         console.log('\n2. Testing READ ALL (GET)...');
//         const readRes = await axios.get(API_BASE_URL);
//         console.log(`Found ${readRes.data.length} records.`);
//         const latestRecord = readRes.data[0];
//         console.log('Latest Record Status:', latestRecord.Status);
//         console.log('Latest Record Draft/Final:', latestRecord.Is_Fin_Text);

//         // 3. UPDATE (PUT)
//         if (latestRecord && latestRecord.Id) {
//             console.log(`\n3. Testing UPDATE (PUT) for ID: ${latestRecord.Id}...`);
//             const updateData = {
//                 ...latestRecord,
//                 Status: "Closed",
//                 Is_Fin: "true", // Changing to Final
//                 What_Makes_Me_ME: "UPDATED: I also love coding now!",
//                 Last_Modified_By: "Test Updater"
//             };
//             const updateRes = await axios.put(`${API_BASE_URL}/${latestRecord.Id}`, updateData);
//             console.log('Response:', updateRes.data.message);

//             // 4. VERIFY UPDATE
//             const verifyRes = await axios.get(API_BASE_URL);
//             const updated = verifyRes.data.find(r => r.Id === latestRecord.Id);
//             console.log('\n--- VERIFICATION ---');
//             console.log('New Status (Should be Closed):', updated.Status);
//             console.log('New Is_Fin (Should be Final):', updated.Is_Fin_Text);
//             console.log('New Content:', updated.What_Makes_Me_ME);
//         }

//         console.log('\n--- ALL TESTS PASSED SUCCESSFULLY ---');
//     } catch (error) {
//         console.error('\n--- TEST FAILED ---');
//         if (error.response) {
//             console.error('Data:', error.response.data);
//             console.error('Status:', error.response.status);
//         } else {
//             console.error('Error:', error.message);
//         }
//     }
// }

// runTest();
