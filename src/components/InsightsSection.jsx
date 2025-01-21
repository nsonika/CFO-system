

import React from "react";
import ReactMarkdown from "react-markdown";
import { AlertCircle } from "lucide-react";

const InsightsSection = ({ insights }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-6">Insights</h3>
        <div className="space-y-6">
            {insights.map((insight, index) => (
                <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >

                    <div className="flex items-start mb-3">
                        <AlertCircle
                            className={`w-6 h-6 mr-3 ${insight.type === "success"
                                ? "text-green-500"
                                : insight.type === "warning"
                                    ? "text-yellow-500"
                                    : "text-blue-500"
                                }`}
                        />
                        <h4 className="text-lg font-semibold text-gray-800">
                            {insight.title}
                        </h4>
                    </div>
                    {/* Render Markdown Content */}
                    <ReactMarkdown
                        className="text-sm text-gray-700 leading-relaxed"
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1
                                    className="text-lg font-bold text-gray-800 mb-3"
                                    {...props}
                                />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2
                                    className="text-base italic text-gray-600 mb-2"
                                    {...props}
                                />
                            ),
                            p: ({ node, ...props }) => (
                                <p className="mb-2" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul className="list-disc pl-6 mb-3" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                                <li className="mb-1" {...props} />
                            ),
                        }}
                    >
                        {insight.message}
                    </ReactMarkdown>
                </div>
            ))}
        </div>
    </div>
);

export default InsightsSection;
