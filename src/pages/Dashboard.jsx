import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import IncomeStatement from "../components/IncomeStatement";
import { parseExcel } from "../utils/parseExcel";

const Dashboard = () => {
    const [financialData, setFinancialData] = useState(null);
    const [error, setError] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = await parseExcel(file);
            if (result.success) {
                setFinancialData(result.data);
                setError(null);
            } else {
                setError(result.error);
            }
        }
    };



    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-6 max-w-7xl mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        AI-powered CFO System
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Extract insights from financial statements to optimize performance.
                    </p>
                </header>

                <FileUpload handleFileUpload={handleFileUpload} error={error} />

                <>
                    <IncomeStatement financialData={financialData} />

                </>

            </div>
        </div>
    );

};

export default Dashboard;



