import React from 'react';
import { Icons } from './Icons';

const ReportTable = ({ reports, onAddClick, onEditClick, searchTerm, setSearchTerm }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const mins = String(date.getMinutes()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${mins}`;
    };

    const filteredReports = (reports || []).filter(report => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            (report.Young_Person_Id || "Aarav Kumar Sharma").toLowerCase().includes(term) ||
            (report.Version || "1").toString().toLowerCase().includes(term) ||
            (report.Is_Fin_Text || "Draft").toLowerCase().includes(term) ||
            (report.Status || "Open").toLowerCase().includes(term) ||
            formatDate(report.ReportDate).toLowerCase().includes(term)
        );
    });

    return (
        <main className="max-w-[1400px] mx-auto py-6 px-10 flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
                <div className="relative w-72">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Icons.Search />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full border border-slate-200 rounded-md py-1.5 pl-9 pr-3 text-[14px] outline-none focus:border-blue-400 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onAddClick}
                        className="bg-[#2196f3] text-white px-5 py-1.5 rounded-md text-[13px] font-bold shadow-sm hover:bg-[#1e88e5] active:scale-95 transition-all"
                    >
                        Add
                    </button>
                    <div className="flex gap-1">
                        <Icons.PDF />
                        <Icons.XLS />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm overflow-x-auto shadow-sm">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                        <tr className="border-b border-slate-100 bg-[#fafafa]">
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 w-16"></th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Young Person</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Date</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Version</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Draft / Final</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Status</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Signed By Key Worker</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Signed By Manager</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Approved By Social Worker On</th>
                            <th className="px-4 py-3 text-[13px] font-semibold text-slate-600 border-l border-slate-100">Last Updated On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.map((report, idx) => (
                            <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-4 text-center">
                                    <button
                                        onClick={() => onEditClick(report)}
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <Icons.Pencil />
                                    </button>
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    {report.Young_Person_Id || "Aarav Kumar Sharma"}
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    {formatDate(report.ReportDate)}
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    V{report.Version || "1"}
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    {report.Is_Fin_Text || "Draft"}
                                </td>
                                <td className={`px-4 py-4 text-[14px] font-semibold border-l border-slate-100 ${report.Status === 'Closed' ? 'text-rose-500' : 'text-green-600'
                                    }`}>
                                    {report.Status || "Open"}
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    {report.Staff_Signature_Id ? "Signed" : "Not Signed"}
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    {report.Manager_Signature_Id ? "Signed" : "Not Signed"}
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    {formatDate(report.Approved_on)}
                                </td>
                                <td className="px-4 py-4 text-[14px] text-slate-800 border-l border-slate-100">
                                    {formatDateTime(report.Last_Modified_On)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="px-4 py-3 bg-white border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                            <Icons.DoubleLeft />
                            <Icons.ChevronLeft />
                            <Icons.ChevronRight />
                            <Icons.DoubleRight />
                        </div>
                        <span className="text-[13px] text-slate-500">1-{filteredReports.length} of {filteredReports.length}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[13px] text-slate-500">Items per page:</span>
                        <select className="border border-slate-200 rounded-sm text-[13px] px-1 focus:outline-none">
                            <option>{filteredReports.length}</option>
                        </select>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ReportTable;
