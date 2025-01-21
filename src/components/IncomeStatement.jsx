import React from "react";

const IncomeStatement = ({ financialData }) => {
    if (!financialData) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow mt-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Income Statement</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-gray-600 font-medium border-b">
                        <th className="py-2">Category</th>
                        <th className="py-2 text-right">2024</th>
                        <th className="py-2 text-right">2023</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Revenue Section */}
                    <tr className="font-semibold border-b">
                        <td className="py-2">Revenue</td>
                        <td className="py-2 text-right text-green-600">
                            ${financialData.revenue[2024].toLocaleString()}
                        </td>
                        <td className="py-2 text-right text-green-600">
                            ${financialData.revenue[2023].toLocaleString()}
                        </td>
                    </tr>

                    {/* Expenses Section */}
                    <tr className="font-semibold border-b">
                        <td className="py-2">Operating Expenses</td>
                        <td className="py-2 text-right text-red-600">
                            ${Object.values(financialData.expenses[2024]).reduce((a, b) => a + b, 0).toLocaleString()}
                        </td>
                        <td className="py-2 text-right text-red-600">
                            ${Object.values(financialData.expenses[2023]).reduce((a, b) => a + b, 0).toLocaleString()}
                        </td>
                    </tr>

                    {/* Individual Expense Categories */}
                    {Object.entries(financialData.expenses[2024]).map(([category, amount]) => (
                        <tr
                            key={category}
                            className={`border-b ${category === "Net Income" ? "font-semibold" : ""}`}
                        >
                            <td className="py-2">{category}</td>
                            <td
                                className={`py-2 text-right ${category === "Net Income" && amount < 0
                                    ? "text-red-600"
                                    : category === "Net Income"
                                        ? "text-green-600"
                                        : ""
                                    }`}
                            >
                                ${amount.toLocaleString()}
                            </td>
                            <td
                                className={`py-2 text-right ${financialData.expenses[2023][category] < 0
                                    ? "text-red-600"
                                    : ""
                                    }`}
                            >
                                ${financialData.expenses[2023][category]?.toLocaleString() || "0"}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default IncomeStatement;
