import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Analytics = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalScholarships, setTotalScholarships] = useState(0);
    const [totalFees, setTotalFees] = useState(0);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/analytics/total-users`)
            .then(res => setTotalUsers(res.data.totalUsers));

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/analytics/total-scholarships`)
            .then(res => setTotalScholarships(res.data.totalScholarships));

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/analytics/total-fees`)
            .then(res => setTotalFees(res.data.totalFees));

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/analytics/category-counts`)
            .then(res => setCategoryData(res.data));
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Platform Analytics</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition">
                    <p className="text-gray-400 uppercase tracking-wide mb-2">Total Users</p>
                    <p className="text-4xl font-extrabold text-blue-600">{totalUsers}</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition">
                    <p className="text-gray-400 uppercase tracking-wide mb-2">Total Scholarships</p>
                    <p className="text-4xl font-extrabold text-green-600">{totalScholarships}</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition">
                    <p className="text-gray-400 uppercase tracking-wide mb-2">Total Fees Collected</p>
                    <p className="text-4xl font-extrabold text-purple-600">${totalFees}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Applications by Scholarship Category</h2>
                <BarChart width={700} height={350} data={categoryData} className="mx-auto">
                    <XAxis dataKey="_id" tick={{ fontSize: 14, fill: '#4B5563' }} />
                    <YAxis tick={{ fontSize: 14, fill: '#4B5563' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                </BarChart>
            </div>
        </div>
    );
};

export default Analytics;
