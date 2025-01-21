import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const MetricsOverview = ({ metrics }) => {
    const metricsData = [
        {
            title: "Revenue",
            value: `$${metrics.revenue.toLocaleString()}`,
            icon: <TrendingUp className="text-green-500" />,
        },
        {
            title: "Total Expenses",
            value: `$${metrics.totalExpenses.toLocaleString()}`,
            icon: <TrendingDown className="text-red-500" />,
        },
        {
            title: "Operating Margin",
            value: `${metrics.operatingMargin}%`,
            icon:
                parseFloat(metrics.operatingMargin) > 0 ? (
                    <TrendingUp className="text-green-500" />
                ) : (
                    <TrendingDown className="text-red-500" />
                ),
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {metricsData.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-600">{metric.title}</h3>
                        {metric.icon}
                    </div>
                    <div className="text-2xl font-bold mt-2">{metric.value}</div>
                </div>
            ))}
        </div>
    );
};

export default MetricsOverview;
