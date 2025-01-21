import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import MetricsOverview from "../components/MetricsOverview";
import ExpenseChart from "../components/ExpenseChart";
import InsightsSection from "../components/InsightsSection";
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

    const calculateMetrics = () => {
        if (!financialData) return null;

        const totalExpenses2024 = Object.values(financialData.expenses[2024]).reduce((a, b) => a + b, 0);

        const operatingMargin = (
            ((financialData.revenue[2024] - totalExpenses2024) / financialData.revenue[2024]) *
            100
        ).toFixed(2);

        const expenseAnalysis = Object.entries(financialData.expenses[2024])
            .map(([category, amount]) => ({
                category,
                amount,
                percentage: ((amount / totalExpenses2024) * 100).toFixed(1),
            }))
            .sort((a, b) => b.amount - a.amount);

        return {
            revenue: financialData.revenue[2024],
            totalExpenses: totalExpenses2024,
            operatingMargin,
            expenseAnalysis,
        };
    };

    const metrics = calculateMetrics();

    const generateInsights = (metrics) => {
        if (!metrics) return [];

        const insights = [];
        const { expenseAnalysis, operatingMargin } = metrics;

        // Major expense analysis
        const majorExpenses = expenseAnalysis.filter((exp) => parseFloat(exp.percentage) > 10);
        insights.push({
            type: "alert",
            title: "Major Expenses",
            message: `Top expenses: ${majorExpenses
                .map((exp) => `${exp.category} (${exp.percentage}%)`)
                .join(", ")}`,
        });

        // Operating margin analysis
        insights.push({
            type: parseFloat(operatingMargin) > 15 ? "success" : "warning",
            title: "Profitability",
            message: `Operating margin is ${operatingMargin}% - ${parseFloat(operatingMargin) > 15 ? "healthy profitability" : "consider cost optimization"
                }`,
        });

        return insights;
    };

    const insights = metrics ? generateInsights(metrics) : [];
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
                {metrics && (
                    <>
                        <IncomeStatement financialData={financialData} />
                        <MetricsOverview metrics={metrics} />
                        <ExpenseChart data={metrics.expenseAnalysis} />
                        <InsightsSection insights={insights} />
                    </>
                )}
            </div>
        </div>
    );

};

export default Dashboard;