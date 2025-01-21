import axios from "axios";

const API_KEY = import.meta.env.VITE_SAMBANOVA_API_KEY;

export const fetchAIInsights = async (data) => {
  try {
    const response = await axios.post(
      "https://api.sambanova.ai/v1/chat/completions",
      {
        model: "Meta-Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "system",
            content:
              "You are an experienced CFO assistant. Provide concise insights and actionable recommendations to improve financial performance.",
          },
          {
            role: "user",
            content: `
            You are an experienced CFO assistant. Analyze the following financial data and provide concise, structured insights and recommendations.
            
            **Your response format:**
            1. **Revenue Analysis:**
               - Major revenue drivers and trends.
               - Year-over-year revenue growth.
               
            2. **Expense Analysis:**
               - Top expense categories and their proportions in list.
               - Areas for cost optimization.
            
            3. **Profitability Metrics:**
               - Key metrics like operating margin and net margin.
               - Year-over-year comparison and trends.
            
            4. **Performance Highlights:**
               - Compare year-over-year performance.
               - Highlight anomalies or significant changes.
            
            5. **Recommendations:**
               - Short, actionable recommendations to improve revenue and reduce costs in list.
            
            **Data for Analysis:**
            ${JSON.stringify(data)}
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching insights:", error);
    return null;
  }
};
