import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseChart = ({ data }) => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
        <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip
                        formatter={(value, name, props) => [
                            `$${value.toLocaleString()}`,
                            `${props.payload.percentage}% of total`,
                        ]}
                    />
                    <Bar dataKey="amount" fill="#4F46E5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default ExpenseChart;
