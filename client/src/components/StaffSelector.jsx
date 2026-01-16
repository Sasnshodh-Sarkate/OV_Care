import React, { useState, useEffect } from 'react';

const StaffSelector = ({ selectedStaff, onChange }) => {
    const [staffList, setStaffList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await fetch('/api/staff');
                if (response.ok) {
                    const data = await response.json();
                    setStaffList(data);
                }
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        };
        fetchStaff();
    }, []);

    const toggleStaff = (staff) => {
        const isSelected = selectedStaff.some(s => s.Id === staff.Id);
        let newSelection;
        if (isSelected) {
            newSelection = selectedStaff.filter(s => s.Id !== staff.Id);
        } else {
            newSelection = [...selectedStaff, { Id: staff.Id, Staff_Name: staff.Staff_Name }];
        }
        onChange(newSelection);
    };

    const handleSelectAll = () => {
        const filteredStaff = staffList.filter(staff =>
            staff.Staff_Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const newSelection = [...selectedStaff];
        filteredStaff.forEach(staff => {
            if (!newSelection.some(s => s.Id === staff.Id)) {
                newSelection.push({ Id: staff.Id, Staff_Name: staff.Staff_Name });
            }
        });
        onChange(newSelection);
    };

    const handleSelectNone = () => {
        const filteredStaff = staffList.filter(staff =>
            staff.Staff_Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const newSelection = selectedStaff.filter(s =>
            !filteredStaff.some(fs => fs.Id === s.Id)
        );
        onChange(newSelection);
    };

    const filteredStaff = staffList.filter(staff =>
        staff.Staff_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full border border-slate-200 rounded-md px-4 py-2 text-[15px] outline-none focus:border-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={handleSelectAll}
                        className="bg-[#e7f5e9] text-[#2e7d32] px-4 py-2 rounded-[4px] text-[14px] font-bold hover:bg-[#dceddd] transition-colors flex-1 md:flex-none uppercase tracking-tight"
                    >
                        Select All
                    </button>
                    <button
                        onClick={handleSelectNone}
                        className="bg-[#fff3e0] text-[#ef6c00] px-4 py-2 rounded-[4px] text-[14px] font-bold hover:bg-[#ffe0b2] transition-colors flex-1 md:flex-none uppercase tracking-tight"
                    >
                        Select None
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredStaff.map((staff) => {
                    const isSelected = selectedStaff.some(s => s.Id === staff.Id);
                    return (
                        <div
                            key={staff.Id}
                            onClick={() => toggleStaff(staff)}
                            className={`
                                cursor-pointer px-4 py-2.5 rounded-[4px] text-[14px] font-medium text-center transition-all border
                                ${isSelected
                                    ? 'bg-[#e3f2fd] border-[#bbdefb] text-[#1565c0] shadow-sm'
                                    : 'bg-[#e9eff2] border-[#dee5e9] text-[#64748b] hover:bg-[#dfe5e8]'}
                            `}
                        >
                            {staff.Staff_Name}
                        </div>
                    );
                })}
            </div>

            {filteredStaff.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                    No staff members found matching your search.
                </div>
            )}
        </div>
    );
};

export default StaffSelector;
