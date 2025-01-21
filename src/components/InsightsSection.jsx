import React from "react";
import { AlertCircle } from "lucide-react";

const InsightsSection = ({ insights }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">AI Insights</h3>
        <div className="space-y-4">
            {insights.map((insight, index) => (
                <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                    <div className="flex-shrink-0">
                        <AlertCircle
                            className={`${insight.type === "success"
                                ? "text-green-500"
                                : insight.type === "warning"
                                    ? "text-yellow-500"
                                    : "text-blue-500"
                                }`}
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.message}</p>
                    </div>

                    {/* sambonava ai insights */}
                    <div></div>
                </div>
            ))}
        </div>
    </div>
);

export default InsightsSection;