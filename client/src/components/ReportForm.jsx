import React, { useState } from 'react';
import { Icons } from './Icons';
import StaffSelector from './StaffSelector';

const ReportForm = ({ formData, handleInputChange, handleSubmit, onBack, accordionItems, statusMsg, setFoodData }) => {
    const [openSections, setOpenSections] = useState({ main: true });

    const toggleSection = (id) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <main className="max-w-[1000px] mx-auto py-8 px-10 flex flex-col gap-2">
            {/* External Header Row */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="focus:outline-none">
                        <Icons.Back />
                    </button>
                    <h1 className="text-[17px] font-bold text-[#1e293b] tracking-tight">Simple Care Planning Create</h1>
                </div>
                <button className="focus:outline-none text-slate-500 hover:text-slate-700">
                    <Icons.Plus />
                </button>
            </div>

            {/* Core Header Section (Accordion) */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden mb-4">
                <div
                    className="flex items-center justify-between px-3 py-[8px] bg-[#f8fafc] cursor-pointer select-none border-b border-slate-100"
                    onClick={() => toggleSection('main')}
                >
                    <h2 className="font-bold text-[14px] text-[#334155]">Simple Care Planning</h2>
                    <button className="focus:outline-none">
                        {openSections.main ? <Icons.Minus /> : <Icons.Plus />}
                    </button>
                </div>

                {openSections.main && (
                    <div className="px-4 py-8 border-t border-slate-100 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[13px] font-bold text-slate-500">Young Person *</label>
                                <input
                                    type="text"
                                    name="Young_Person_Id"
                                    value={formData.Young_Person_Id}
                                    onChange={handleInputChange}
                                    className="border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[40px]"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[13px] font-bold text-slate-500">Version</label>
                                <input
                                    type="text"
                                    name="Version"
                                    value={formData.Version}
                                    onChange={handleInputChange}
                                    className="border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[40px]"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[13px] font-bold text-slate-500">Date</label>
                                <input
                                    type="date"
                                    name="ReportDate"
                                    value={formData.ReportDate}
                                    onChange={handleInputChange}
                                    className="border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[40px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[14px] font-bold text-[#64748b]">Status</label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer text-[#334155] text-[15px] font-medium">
                                        <input
                                            type="radio"
                                            name="Status"
                                            value="Closed"
                                            checked={formData.Status === "Closed"}
                                            onChange={handleInputChange}
                                            className="w-[18px] h-[18px] accent-[#4d7c0f]"
                                        />
                                        Closed
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-[#334155] text-[15px] font-medium">
                                        <input
                                            type="radio"
                                            name="Status"
                                            value="Open"
                                            checked={formData.Status === "Open"}
                                            onChange={handleInputChange}
                                            className="w-[18px] h-[18px] accent-[#4d7c0f]"
                                        />
                                        Open
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[14px] font-bold text-[#64748b]">Save as</label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer text-[#334155] text-[15px] font-medium">
                                        <input
                                            type="radio"
                                            name="Is_Fin"
                                            value="false"
                                            checked={formData.Is_Fin === false || formData.Is_Fin === "false"}
                                            onChange={handleInputChange}
                                            className="w-[18px] h-[18px] accent-[#2196f3]"
                                        />
                                        Draft
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-[#334155] text-[15px] font-medium">
                                        <input
                                            type="radio"
                                            name="Is_Fin"
                                            value="true"
                                            checked={formData.Is_Fin === true || formData.Is_Fin === "true"}
                                            onChange={handleInputChange}
                                            className="w-[18px] h-[18px] accent-[#2196f3]"
                                        />
                                        Final
                                    </label>
                                </div>
                            </div>
                        </div>

                        <textarea
                            name="What_Makes_Me_ME"
                            value={formData.What_Makes_Me_ME}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-[2px] p-3 text-[15px] bg-[#fdfdfd] h-20 outline-none focus:border-blue-400 resize-none shadow-inner"
                        />
                    </div>
                )}
            </div>

            {/* Global Status Message */}
            {statusMsg.text && (
                <div className={`px-4 py-2 mb-3 rounded text-[12px] font-bold uppercase transition-all ${statusMsg.type === 'success' ? 'bg-green-100 text-green-700' :
                    statusMsg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-600'
                    }`}>
                    {statusMsg.text}
                </div>
            )}

            {/* Dynamic Accordion List */}
            <div className="flex flex-col gap-[10px]">
                {accordionItems.map((item) => (
                    <div key={item.label} className="bg-white border border-slate-200 shadow-lg overflow-hidden translate-y-0 hover:border-slate-300 transition-colors">
                        <div
                            className="flex items-center justify-between px-3 py-[8px] bg-white cursor-pointer select-none"
                            onClick={() => toggleSection(item.label)}
                        >
                            <span className="font-bold text-[15px] text-slate-700">{item.label}</span>
                            <button className="focus:outline-none">
                                {openSections[item.label] ? <Icons.Minus /> : <Icons.Plus />}
                            </button>
                        </div>

                        {openSections[item.label] && (
                            <div className="px-4 py-5 border-t  border-slate-100 bg-[#fbfbfb] animate-in slide-in-from-top-1 duration-200">
                                {item.label === "Review Date" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-bold text-slate-500">Date Sent to Social Worker</label>
                                            <input
                                                type="datetime-local"
                                                name="Sent_to_Social_Worker"
                                                value={formData.Sent_to_Social_Worker}
                                                onChange={handleInputChange}
                                                className="w-full border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[40px] bg-white"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-bold text-slate-500">Method</label>
                                            <div className="relative">
                                                <select
                                                    name="Method"
                                                    value={formData.Method}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[40px] bg-white appearance-none"
                                                >
                                                    <option value=""></option>
                                                    <option value="1">Email</option>
                                                    <option value="2">Post</option>
                                                    <option value="3">Hand Delivered</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                    <Icons.ChevronDown />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-bold text-slate-500">Approved On</label>
                                            <input
                                                type="datetime-local"
                                                name="Approved_on"
                                                value={formData.Approved_on}
                                                onChange={handleInputChange}
                                                className="w-full border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[40px] bg-white"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-bold text-slate-500">Last Review Date</label>
                                            <input
                                                type="date"
                                                name="Last_ReviewDate"
                                                value={formData.Last_ReviewDate}
                                                onChange={handleInputChange}
                                                className="w-full border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[40px] bg-white"
                                            />
                                        </div>
                                    </div>
                                ) : item.label === "Signature" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-2">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">Staff Signature</label>
                                                <div className="border-b border-slate-200 h-6 mb-1"></div>
                                            </div>
                                            <input
                                                type="text"
                                                name="Staff_Signature_Id"
                                                value={formData.Staff_Signature_Id}
                                                onChange={handleInputChange}
                                                placeholder="Print Name"
                                                className="border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[36px] bg-white"
                                            />
                                            <input
                                                type="date"
                                                name="Staff_Signature_Date"
                                                value={formData.Staff_Signature_Date}
                                                onChange={handleInputChange}
                                                className="border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[36px] bg-white"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">Management Signature</label>
                                                <div className="border-b border-slate-200 h-6 mb-1"></div>
                                            </div>
                                            <input
                                                type="text"
                                                name="Manager_Signature_Id"
                                                value={formData.Manager_Signature_Id}
                                                onChange={handleInputChange}
                                                placeholder="Print Name"
                                                className="border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[36px] bg-white"
                                            />
                                            <input
                                                type="date"
                                                name="Manager_Signature_Date"
                                                value={formData.Manager_Signature_Date}
                                                onChange={handleInputChange}
                                                className="border border-slate-200 rounded-[2px] px-3 py-1.5 text-[15px] outline-none focus:border-blue-400 h-[36px] bg-white"
                                            />
                                        </div>
                                    </div>
                                ) : item.dbName === "all_in_one_care_and_behavior_plan" ? (
                                    <StaffSelector
                                        selectedStaff={formData.all_in_one_care_and_behavior_plan || []}
                                        onChange={(newSelection) => setFoodData({ all_in_one_care_and_behavior_plan: newSelection })}
                                    />
                                ) : (item.dbName === "What_I_like_to_eat" || item.dbName === "Playing" || item.dbName === "Helping_me_with_independence" || item.dbName === "Behaviour_that_may_Challenge_others" || item.dbName === "How_to_keep_me_safe") ? null : (
                                    <textarea
                                        name={item.dbName}
                                        value={formData[item.dbName]}
                                        onChange={handleInputChange}
                                        className="w-full border border-slate-200 rounded-[2px] p-4 text-[15px] bg-white min-h-[140px] outline-none focus:border-blue-400 leading-relaxed shadow-sm"
                                        placeholder={`Enter details for ${item.label}...`}
                                    />
                                )}

                                {/* Custom Sub-categories for "What You Need To Know About Me" */}
                                {item.dbName === "What_you_need_to_know_about_me" && (
                                    <div className="mt-8">
                                        <h3 className="font-bold text-[16px] text-slate-700 mb-4 border-b pb-2">This is what makes me</h3>
                                        <div className="flex flex-col gap-4">
                                            {[
                                                { label: "Giggle", name: "twmm_Giggle" },
                                                { label: "Happy", name: "twmm_Happy" },
                                                { label: "Sad", name: "twmm_Sad" },
                                                { label: "Anxious", name: "twmm_Anxious" },
                                                { label: "Challenging at times", name: "twmm_Challenging" },
                                                { label: "Bored", name: "twmm_Bored" }
                                            ].map((sub) => (
                                                <div key={sub.name} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                                    <label className="text-[14px] font-semibold text-slate-600 mt-2">{sub.label}</label>
                                                    <textarea
                                                        name={sub.name}
                                                        value={formData[sub.name]}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-slate-200 rounded-[2px] p-2 text-[14px] bg-white min-h-[60px] outline-none focus:border-blue-400 resize-none h-[60px]"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <h3 className="font-bold text-[16px] text-slate-700 mb-4 border-b pb-2 mt-12">This is how you will know when I am</h3>
                                        <div className="flex flex-col gap-4">
                                            {[
                                                { label: "Happy", name: "hwkw_Happy" },
                                                { label: "Sad", name: "hwkw_Sad" },
                                                { label: "Anxious/Boundaried", name: "hwkw_Anxious" },
                                                { label: "Bored", name: "hwkw_Bored" },
                                                { label: "Confused", name: "hwkw_Confused" },
                                                { label: "Angry", name: "hwkw_Angry" },
                                                { label: "Sleepy", name: "hwkw_Sleepy" },
                                                { label: "Hungry", name: "hwkw_Hungry" }
                                            ].map((sub) => (
                                                <div key={sub.name} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                                    <label className="text-[14px] font-semibold text-slate-600 mt-2">{sub.label}</label>
                                                    <textarea
                                                        name={sub.name}
                                                        value={formData[sub.name]}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-slate-200 rounded-[2px] p-2 text-[14px] bg-white min-h-[60px] outline-none focus:border-blue-400 resize-none h-[60px]"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12">
                                            <div className="flex items-center justify-between mb-4 border-b pb-2">
                                                <h3 className="font-bold text-[16px] text-slate-700">Good Day / Bad Day</h3>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const rows = [...(formData.goodBadRows || [])];
                                                        rows.push({ good: "", bad: "" });
                                                        setFoodData({ goodBadRows: rows });
                                                    }}
                                                    className="hover:scale-110 transition-transform"
                                                >
                                                    <Icons.Plus />
                                                </button>
                                            </div>
                                            <div className="flex flex-col border border-slate-200 rounded-[2px] overflow-hidden">
                                                <div className="bg-[#d1d5db] flex border-b border-slate-300">
                                                    <div className="px-3 py-2 text-[12px] font-bold text-slate-700 uppercase border-r-[3px] border-white w-[45%]">Good Day</div>
                                                    <div className="px-3 py-2 text-[12px] font-bold text-slate-700 uppercase border-r-[3px] border-white w-[45%]">Bad Day</div>
                                                    <div className="w-[10%] bg-[#d1d5db]"></div>
                                                </div>
                                                <div className="flex flex-col bg-white">
                                                    {(formData.goodBadRows || []).map((row, idx) => (
                                                        <div key={idx} className="flex border-b border-slate-200 last:border-b-0 group">
                                                            <div className="p-1 border-r-[3px] border-white w-[45%] bg-[#fbfbfb]">
                                                                <textarea
                                                                    value={row.good}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.goodBadRows];
                                                                        newRows[idx].good = e.target.value;
                                                                        setFoodData({ goodBadRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[13px] border border-slate-100 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                    placeholder="Describe a good day..."
                                                                />
                                                            </div>
                                                            <div className="p-1 border-r-[3px] border-white w-[45%] bg-[#fbfbfb]">
                                                                <textarea
                                                                    value={row.bad}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.goodBadRows];
                                                                        newRows[idx].bad = e.target.value;
                                                                        setFoodData({ goodBadRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[13px] border border-slate-100 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                    placeholder="Describe a bad day..."
                                                                />
                                                            </div>
                                                            <div className="w-[10%] flex items-start justify-center pt-2 bg-[#fbfbfb]">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        const newRows = formData.goodBadRows.filter((_, i) => i !== idx);
                                                                        setFoodData({ goodBadRows: newRows.length ? newRows : [{ good: "", bad: "" }] });
                                                                    }}
                                                                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <Icons.Trash />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Custom Sub-categories for "My Routines" */}
                                {item.dbName === "My_Routines" && (
                                    <div className="mt-6 flex flex-col gap-4">
                                        {[
                                            { label: "School Routine", name: "mr_School_Routines" },
                                            { label: "Meal Time", name: "mr_Meal_Time" },
                                            { label: "Evening & Bedtime", name: "mr_Evening_Bedtime" },
                                            { label: "In the Morning & My Breakfast", name: "mr_Morning_Breakfast" },
                                            { label: "TESTing my Routines.", name: "mr_Testing_Routines" },
                                            { label: "New label added under MY Routine", name: "mr_New_Label" }
                                        ].map((sub) => (
                                            <div key={sub.name} className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-sm hover:border-blue-300 transition-colors">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block">{sub.label}</label>
                                                <textarea
                                                    name={sub.name}
                                                    value={formData[sub.name] || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder={`Enter details for ${sub.label}...`}
                                                />
                                            </div>
                                        ))}
                                        {/* Large grey textarea at the bottom */}
                                        <div className="mt-2 bg-[#f8f9fa] border border-slate-200 rounded-[4px] p-2 shadow-sm">
                                            <textarea
                                                name={item.dbName}
                                                value={formData[item.dbName] || ""}
                                                onChange={handleInputChange}
                                                className="w-full text-[14px] text-slate-700 bg-transparent min-h-[100px] outline-none resize-y leading-relaxed p-2"
                                                placeholder="Additional notes for Routines..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Custom Sub-categories for "My Personal Care" */}
                                {item.dbName === "My_Personal_Care" && (
                                    <div className="mt-6 flex flex-col gap-4">
                                        {[
                                            { label: "Bath Time and / or Shower Time", name: "mpc_Bath_Time" },
                                            { label: "Using the Toilet", name: "mpc_Using_Toilet" },
                                            { label: "Brushing My Teeth", name: "mpc_Brushing_Teeth" },
                                            { label: "Getting Dressed", name: "mpc_Getting_Dressed" }
                                        ].map((sub) => (
                                            <div key={sub.name} className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-sm hover:border-blue-300 transition-colors">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block">{sub.label}</label>
                                                <textarea
                                                    name={sub.name}
                                                    value={formData[sub.name] || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder={`Enter details for ${sub.label}...`}
                                                />
                                            </div>
                                        ))}
                                        {/* Large grey textarea at the bottom */}
                                        <div className="mt-2 bg-[#f8f9fa] border border-slate-200 rounded-[4px] p-2 shadow-sm">
                                            <textarea
                                                name={item.dbName}
                                                value={formData[item.dbName] || ""}
                                                onChange={handleInputChange}
                                                className="w-full text-[14px] text-slate-700 bg-transparent min-h-[100px] outline-none resize-y leading-relaxed p-2"
                                                placeholder="Additional notes for Personal Care..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Custom Sub-categories for "What I Like To Eat" */}
                                {item.dbName === "What_I_like_to_eat" && (
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                            <textarea
                                                name={item.dbName}
                                                value={formData[item.dbName] || ""}
                                                onChange={handleInputChange}
                                                className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                placeholder="Important to ME / Important for ME Including Any Special Dietary Needs"
                                            />
                                        </div>

                                        <div className="overflow-hidden border border-slate-200 rounded-[2px]">
                                            <table className="w-full border-collapse table-fixed">
                                                <thead>
                                                    <tr className="bg-[#d1d5db] border-b border-slate-300">
                                                        <th className="text-left px-4 py-2 text-[15px] font-bold text-slate-700 w-[44%] border-r border-slate-300">Food Likes</th>
                                                        <th className="w-[2%] bg-slate-50 border-r border-slate-300"></th>
                                                        <th className="text-left px-4 py-2 text-[15px] font-bold text-slate-700 w-[44%] border-r border-slate-300">Food Dislikes</th>
                                                        <th className="px-2 py-2 text-center w-[10%]">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    const newLikes = [...(formData.foodLikes || [""])];
                                                                    const newDislikes = [...(formData.foodDislikes || [""])];
                                                                    newLikes.push("");
                                                                    newDislikes.push("");
                                                                    setFoodData({ foodLikes: newLikes, foodDislikes: newDislikes });
                                                                }}
                                                                className="hover:scale-110 transition-transform"
                                                            >
                                                                <Icons.Plus />
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: Math.max((formData.foodLikes || [""]).length, (formData.foodDislikes || [""]).length) }).map((_, idx) => (
                                                        <tr key={idx} className="border-b border-slate-200 last:border-b-0 bg-[#fbfbfb]">
                                                            <td className="p-3 border-r border-slate-200">
                                                                <textarea
                                                                    value={formData.foodLikes[idx] || ""}
                                                                    onChange={(e) => {
                                                                        const newLikes = [...(formData.foodLikes || [""])];
                                                                        newLikes[idx] = e.target.value;
                                                                        setFoodData({ foodLikes: newLikes });
                                                                    }}
                                                                    className="w-full p-2 text-[14px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                    placeholder="Like..."
                                                                />
                                                            </td>
                                                            <td className="bg-slate-50 border-r border-slate-200"></td>
                                                            <td className="p-3 border-r border-slate-200">
                                                                <textarea
                                                                    value={formData.foodDislikes[idx] || ""}
                                                                    onChange={(e) => {
                                                                        const newDislikes = [...(formData.foodDislikes || [""])];
                                                                        newDislikes[idx] = e.target.value;
                                                                        setFoodData({ foodDislikes: newDislikes });
                                                                    }}
                                                                    className="w-full p-2 text-[14px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                    placeholder="Dislike..."
                                                                />
                                                            </td>
                                                            <td className="p-2 text-center align-top">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        const newLikes = formData.foodLikes.filter((_, i) => i !== idx);
                                                                        const newDislikes = formData.foodDislikes.filter((_, i) => i !== idx);
                                                                        setFoodData({
                                                                            foodLikes: newLikes.length ? newLikes : [""],
                                                                            foodDislikes: newDislikes.length ? newDislikes : [""]
                                                                        });
                                                                    }}
                                                                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <Icons.Trash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Custom Sub-categories for "Playing" */}
                                {item.dbName === "Playing" && (
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                            <textarea
                                                name={item.dbName}
                                                value={formData[item.dbName] || ""}
                                                onChange={handleInputChange}
                                                className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                placeholder="Play that I enjoy and will engage in"
                                            />
                                        </div>

                                        <div className="overflow-hidden border border-slate-200 rounded-[2px]">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-[#d1d5db] border-b border-slate-300">
                                                        <th className="text-left px-4 py-2 text-[13px] font-bold text-slate-700 uppercase border-r border-slate-300">Activity</th>
                                                        <th className="text-left px-4 py-2 text-[13px] font-bold text-slate-700 uppercase border-r border-slate-300">Specific Techniques</th>
                                                        <th className="text-left px-4 py-2 text-[13px] font-bold text-slate-700 uppercase border-r border-slate-300">Equipment / Resources Required</th>
                                                        <th className="px-2 py-2 text-center w-[50px]">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    const acts = [...(formData.playingActivities || [])];
                                                                    acts.push({ act: "", st: "", eq_r: "" });
                                                                    setFoodData({ playingActivities: acts });
                                                                }}
                                                                className="hover:scale-110 transition-transform"
                                                            >
                                                                <Icons.Plus />
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(formData.playingActivities || []).map((row, idx) => (
                                                        <tr key={idx} className="border-b border-slate-200 last:border-b-0 bg-[#fbfbfb]">
                                                            <td className="p-2 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.act}
                                                                    onChange={(e) => {
                                                                        const newActs = [...formData.playingActivities];
                                                                        newActs[idx].act = e.target.value;
                                                                        setFoodData({ playingActivities: newActs });
                                                                    }}
                                                                    className="w-full p-2 text-[14px] border border-slate-200 rounded-[2px] min-h-[100px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-2 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.st}
                                                                    onChange={(e) => {
                                                                        const newActs = [...formData.playingActivities];
                                                                        newActs[idx].st = e.target.value;
                                                                        setFoodData({ playingActivities: newActs });
                                                                    }}
                                                                    className="w-full p-2 text-[14px] border border-slate-200 rounded-[2px] min-h-[100px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-2 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.eq_r}
                                                                    onChange={(e) => {
                                                                        const newActs = [...formData.playingActivities];
                                                                        newActs[idx].eq_r = e.target.value;
                                                                        setFoodData({ playingActivities: newActs });
                                                                    }}
                                                                    className="w-full p-2 text-[14px] border border-slate-200 rounded-[2px] min-h-[100px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-2 text-center align-top">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        const newActs = formData.playingActivities.filter((_, i) => i !== idx);
                                                                        setFoodData({ playingActivities: newActs });
                                                                    }}
                                                                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <Icons.Trash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Custom Sub-categories for "Helping Me With Independence" */}
                                {item.dbName === "Helping_me_with_independence" && (
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                            <textarea
                                                name={item.dbName}
                                                value={formData[item.dbName] || ""}
                                                onChange={handleInputChange}
                                                className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                placeholder="Promote MY Independence"
                                            />
                                        </div>

                                        <div className="overflow-hidden border border-slate-200 rounded-[2px]">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-[#d1d5db] border-b border-slate-300">
                                                        <th className="text-left px-4 py-2 text-[13px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[45%]">Where / When / What?</th>
                                                        <th className="text-left px-4 py-2 text-[13px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[45%]">How do we support, what equipment is needed, when does this happen</th>
                                                        <th className="px-2 py-2 text-center w-[50px]">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    const rows = [...(formData.independenceRows || [])];
                                                                    rows.push({ www: "", seh: "" });
                                                                    setFoodData({ independenceRows: rows });
                                                                }}
                                                                className="hover:scale-110 transition-transform"
                                                            >
                                                                <Icons.Plus />
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(formData.independenceRows || []).map((row, idx) => (
                                                        <tr key={idx} className="border-b border-slate-200 last:border-b-0 bg-[#fbfbfb]">
                                                            <td className="p-2 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.www}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.independenceRows];
                                                                        newRows[idx].www = e.target.value;
                                                                        setFoodData({ independenceRows: newRows });
                                                                    }}
                                                                    className="w-full p-2 text-[14px] border border-slate-200 rounded-[2px] min-h-[100px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-2 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.seh}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.independenceRows];
                                                                        newRows[idx].seh = e.target.value;
                                                                        setFoodData({ independenceRows: newRows });
                                                                    }}
                                                                    className="w-full p-2 text-[14px] border border-slate-200 rounded-[2px] min-h-[100px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-2 text-center align-top">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        const newRows = formData.independenceRows.filter((_, i) => i !== idx);
                                                                        setFoodData({ independenceRows: newRows });
                                                                    }}
                                                                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <Icons.Trash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {/* Custom Sub-categories for "My Behaviours" */}
                                {item.dbName === "Behaviour_that_may_Challenge_others" && (
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                            <textarea
                                                name={item.dbName}
                                                value={formData[item.dbName] || ""}
                                                onChange={handleInputChange}
                                                className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                placeholder="Behaviour that may Challenge others"
                                            />
                                        </div>

                                        <div className="border border-slate-200 rounded-[2px]">
                                            <table className="w-full border-collapse table-fixed">
                                                <thead>
                                                    <tr className="bg-[#d1d5db] border-b border-slate-300">
                                                        <th className="text-left px-2 py-2 text-[10px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[16%]">What is the behaviour? When and where?</th>
                                                        <th className="text-left px-2 py-2 text-[10px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[16%]">Triggers & possible influences?</th>
                                                        <th className="text-left px-2 py-2 text-[10px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[16%]">How do we know it's starting?</th>
                                                        <th className="text-left px-2 py-2 text-[10px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[16%]">What do we think this means?</th>
                                                        <th className="text-left px-2 py-2 text-[10px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[16%]">How to support avoid?</th>
                                                        <th className="text-left px-2 py-2 text-[10px] font-bold text-slate-700 uppercase border-r border-slate-300 w-[16%]">How do we respond?</th>
                                                        <th className="px-1 py-2 text-center w-[40px]">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    const rows = [...(formData.behaviourRows || [])];
                                                                    rows.push({ wib: "", tpi: "", hdk: "", wdt: "", hts: "", hdr: "" });
                                                                    setFoodData({ behaviourRows: rows });
                                                                }}
                                                                className="hover:scale-110 transition-transform"
                                                            >
                                                                <Icons.Plus />
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(formData.behaviourRows || []).map((row, idx) => (
                                                        <tr key={idx} className="border-b border-slate-200 last:border-b-0 bg-[#fbfbfb]">
                                                            <td className="p-1 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.wib}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.behaviourRows];
                                                                        newRows[idx].wib = e.target.value;
                                                                        setFoodData({ behaviourRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[12px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-1 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.tpi}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.behaviourRows];
                                                                        newRows[idx].tpi = e.target.value;
                                                                        setFoodData({ behaviourRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[12px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-1 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.hdk}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.behaviourRows];
                                                                        newRows[idx].hdk = e.target.value;
                                                                        setFoodData({ behaviourRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[12px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-1 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.wdt}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.behaviourRows];
                                                                        newRows[idx].wdt = e.target.value;
                                                                        setFoodData({ behaviourRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[12px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-1 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.hts}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.behaviourRows];
                                                                        newRows[idx].hts = e.target.value;
                                                                        setFoodData({ behaviourRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[12px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-1 border-r border-slate-200">
                                                                <textarea
                                                                    value={row.hdr}
                                                                    onChange={(e) => {
                                                                        const newRows = [...formData.behaviourRows];
                                                                        newRows[idx].hdr = e.target.value;
                                                                        setFoodData({ behaviourRows: newRows });
                                                                    }}
                                                                    className="w-full px-2 py-1 text-[12px] border border-slate-200 rounded-[2px] min-h-[80px] outline-none focus:border-blue-400 resize-none bg-white"
                                                                />
                                                            </td>
                                                            <td className="p-1 text-center align-top">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        const newRows = formData.behaviourRows.filter((_, i) => i !== idx);
                                                                        setFoodData({ behaviourRows: newRows });
                                                                    }}
                                                                    className="p-1 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <Icons.Trash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {/* Custom Sub-categories for "How To Keep Me Safe" */}
                                {item.dbName === "How_to_keep_me_safe" && (
                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-col gap-4">
                                            <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                                <textarea
                                                    name="safeText_extra"
                                                    value={formData.safeText_extra || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder="Additional safety information..."
                                                />
                                            </div>
                                            <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block tracking-tight">How to Work To Keep ME Safe</label>
                                                <textarea
                                                    name="safeText_work"
                                                    value={formData.safeText_work || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder="Enter details on how to keep me safe..."
                                                />
                                            </div>
                                            <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block tracking-tight">Arrangements for, and any restrictions on, contact between the child, the child's parents, and any other person</label>
                                                <textarea
                                                    name="safeText_contact"
                                                    value={formData.safeText_contact || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder="Enter contact arrangements..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[14px] font-bold text-slate-700 mb-3 ml-1 uppercase tracking-wider">My Risk Assessments</h4>
                                            <div className="border border-slate-200 rounded-[2px] overflow-hidden">
                                                <table className="w-full border-collapse">
                                                    <thead>
                                                        <tr className="bg-[#e2e8f0] border-b border-slate-300">
                                                            <th className="text-left px-3 py-2 text-[11px] font-bold text-slate-600 border-r border-slate-300 w-[55%] uppercase">Risk Assessment</th>
                                                            <th className="text-left px-3 py-2 text-[11px] font-bold text-slate-600 border-r border-slate-300 w-[12%] uppercase">Reviewed Date</th>
                                                            <th className="text-left px-3 py-2 text-[11px] font-bold text-slate-600 border-r border-slate-300 w-[10%] uppercase">Signed By</th>
                                                            <th className="text-left px-3 py-2 text-[11px] font-bold text-slate-600 border-r border-slate-300 w-[10%] uppercase">Reviewed By</th>
                                                            <th className="text-left px-3 py-2 text-[11px] font-bold text-slate-600 w-[13%] uppercase">Current Risk Level</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(formData.riskRows || []).map((row, idx) => (
                                                            <tr key={idx} className="border-b border-slate-200 last:border-b-0 even:bg-slate-50/50">
                                                                <td className="px-3 py-3 text-[12px] text-slate-600 border-r border-slate-200 leading-relaxed font-medium align-top">
                                                                    {row.risk}
                                                                </td>
                                                                <td className="p-1 border-r border-slate-200 align-top">
                                                                    <div className="text-[11px] text-slate-500 px-2 py-2">
                                                                        {row.date ? `${row.date.split('-').reverse().join('-')} 00:00` : ""}
                                                                    </div>
                                                                </td>
                                                                <td className="p-1 border-r border-slate-200 align-top">
                                                                    <input
                                                                        type="text"
                                                                        value={row.signed}
                                                                        onChange={(e) => {
                                                                            const newRows = [...formData.riskRows];
                                                                            newRows[idx].signed = e.target.value;
                                                                            setFoodData({ riskRows: newRows });
                                                                        }}
                                                                        className="w-full p-2 text-[11px] border-none outline-none bg-transparent"
                                                                        placeholder="-"
                                                                    />
                                                                </td>
                                                                <td className="p-1 border-r border-slate-200 align-top">
                                                                    <input
                                                                        type="text"
                                                                        value={row.reviewed}
                                                                        onChange={(e) => {
                                                                            const newRows = [...formData.riskRows];
                                                                            newRows[idx].reviewed = e.target.value;
                                                                            setFoodData({ riskRows: newRows });
                                                                        }}
                                                                        className="w-full p-2 text-[11px] border-none outline-none bg-transparent"
                                                                        placeholder="-"
                                                                    />
                                                                </td>
                                                                <td className="p-1 align-top">
                                                                    <div className="flex items-center gap-1 px-2 py-2 text-[11px] text-slate-600">
                                                                        <span className="font-bold">{row.score}</span>
                                                                        <span>{row.level}</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block tracking-tight uppercase">Detail Any Presenting Safeguarding Concerns</label>
                                                <textarea
                                                    name="safeText_safeguarding"
                                                    value={formData.safeText_safeguarding || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[100px] outline-none resize-none leading-relaxed"
                                                    placeholder="Enter details..."
                                                />
                                            </div>
                                            <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block tracking-tight uppercase">Other Risks To me</label>
                                                <textarea
                                                    name="safeText_otherRisks"
                                                    value={formData.safeText_otherRisks || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder="Enter details..."
                                                />
                                            </div>
                                            <div className="bg-white border border-slate-200 rounded-[2px] p-4 shadow-sm">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block tracking-tight uppercase">New label under How to Keep Me Safe</label>
                                                <textarea
                                                    name="safeText_newLabel"
                                                    value={formData.safeText_newLabel || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder="Enter details..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item.dbName === "My_Health" && (
                                    <div className="mt-6 flex flex-col gap-4">
                                        {[
                                            { label: "My Medication", name: "mh_Medication" },
                                            { label: "My Immunisation", name: "mh_Immunisation" },
                                            { label: "About my health condition - Infmatrix", name: "mh_Health_Condition" },
                                            { label: "My Dentist - Infomatrix", name: "mh_Dentist" },
                                            { label: "My Optician", name: "mh_Optician" },
                                            { label: "My Therapeutic Support / Therapeutic Input", name: "mh_Therapeutic_Support" },
                                            { label: "My Incontinence Service", name: "mh_Incontinence_Service" },
                                            { label: "My SALT Assessor", name: "mh_SALT_Assessor" },
                                            { label: "My GP - Infomatrix", name: "mh_GP" }
                                        ].map((sub) => (
                                            <div key={sub.name} className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-sm hover:border-blue-300 transition-colors">
                                                <label className="text-[13px] font-bold text-slate-500 mb-2 block">{sub.label}</label>
                                                <textarea
                                                    name={sub.name}
                                                    value={formData[sub.name] || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full text-[14px] text-slate-700 bg-transparent min-h-[80px] outline-none resize-none leading-relaxed"
                                                    placeholder={`Enter details for ${sub.label}...`}
                                                />
                                            </div>
                                        ))}
                                        {/* Large grey textarea at the bottom */}
                                        <div className="mt-2 bg-[#f8f9fa] border border-slate-200 rounded-[4px] p-2 shadow-sm">
                                            <textarea
                                                name={item.dbName}
                                                value={formData[item.dbName] || ""}
                                                onChange={handleInputChange}
                                                className="w-full text-[14px] text-slate-700 bg-transparent min-h-[100px] outline-none resize-y leading-relaxed p-2"
                                                placeholder="Additional notes for Health..."
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-8 px-1">
                <button
                    onClick={onBack}
                    className="bg-[#2196f3] text-white px-10 py-2 rounded-[2px] text-[15px] font-bold active:scale-95 transition-all shadow-md hover:bg-[#1e88e5]"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-slate-700 text-white px-10 py-2 rounded-[2px] text-[15px] font-bold active:scale-95 transition-all shadow-md hover:bg-slate-800"
                >
                    Save All Changes
                </button>
            </div>
        </main>
    );
};

export default ReportForm;
