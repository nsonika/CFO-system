import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import MetricsOverview from "../components/MetricsOverview";
import ExpenseChart from "../components/ExpenseChart";
import InsightsSection from "../components/InsightsSection";
import IncomeStatement from "../components/IncomeStatement";
import { parseExcel } from "../utils/parseExcel";
import { fetchAIInsights } from "../utils/fetchAIInsights";

const Dashboard = () => {
    const [financialData, setFinancialData] = useState(null);
    const [error, setError] = useState(null);
    const [insights, setInsights] = useState([]);
    const [metrics, setMetrics] = useState(null);

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

    const calculateMetrics = (data) => {
        if (!data) return null;

        const totalExpenses2024 = Object.values(data.expenses[2024]).reduce((a, b) => a + b, 0);

        const operatingMargin = (
            ((data.revenue[2024] - totalExpenses2024) / data.revenue[2024]) *
            100
        ).toFixed(2);

        const expenseAnalysis = Object.entries(data.expenses[2024])
            .map(([category, amount]) => ({
                category,
                amount,
                percentage: ((amount / totalExpenses2024) * 100).toFixed(1),
            }))
            .sort((a, b) => b.amount - a.amount);

        return {
            revenue: data.revenue[2024],
            totalExpenses: totalExpenses2024,
            operatingMargin,
            expenseAnalysis,
        };
    };

    const generateInsights = async (metrics, data) => {
        const insights = [];
        const { expenseAnalysis, operatingMargin } = metrics;

        // Local insights
        const majorExpenses = expenseAnalysis.filter((exp) => parseFloat(exp.percentage) > 10);
        insights.push({
            type: "alert",
            title: "Major Expenses",
            message: `Top expenses: ${majorExpenses
                .map((exp) => `${exp.category} (${exp.percentage}%)`)
                .join(", ")}`,
        });

        insights.push({
            type: parseFloat(operatingMargin) > 15 ? "success" : "warning",
            title: "Profitability",
            message: `Operating margin is ${operatingMargin}% - ${parseFloat(operatingMargin) > 15 ? "healthy profitability" : "consider cost optimization"
                }`,
        });

        // AI insights from Sambanova
        try {
            const aiResponse = await fetchAIInsights(data);
            const aiMessage = aiResponse?.choices?.[0]?.message?.content || "No AI insights available.";

            insights.push({
                type: "info",
                title: "AI Insights",
                message: aiMessage,
            });
        } catch (error) {
            console.error("Error fetching AI insights:", error);
            insights.push({
                type: "error",
                title: "AI Insights Error",
                message: "Failed to fetch AI insights.",
            });
        }

        setInsights(insights); // Update the insights state
    };


    // Trigger calculations and insights generation when financialData changes
    useEffect(() => {
        if (financialData) {
            const calculatedMetrics = calculateMetrics(financialData);
            setMetrics(calculatedMetrics);

            // Generate insights including AI insights
            generateInsights(calculatedMetrics, financialData);
        }
    }, [financialData]);

    console.log(financialData);
    console.log("Data sent to AI:", JSON.stringify(financialData));



    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-6 max-w-4xl mx-auto">
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
