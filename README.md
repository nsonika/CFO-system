# CFO Dashboard

The **AI-Powered CFO Dashboard** is a web application that enables users to upload financial data (in Excel format) and generates insightful analytics, including income statements, metrics overview, expense breakdown, and AI-driven financial recommendations. This dashboard is built using **ReactJS**, **Tailwind CSS**, **Recharts**, and integrates the **Sambanova API** for AI-powered insights.

---

## Features

1. **File Upload**:  
   Users can upload their financial Excel files for processing (currently supports dummy Excel files as per the assignment requirements).
   
2. **Income Statement**:  
   Displays income statements for 2023 and 2024 derived from the uploaded data.

3. **Metrics Overview**:  
   Summarizes financial metrics like total revenue, total expenses, and operating margin.

4. **Expense Breakdown**:  
   Visualizes expenses using bar charts created with **Recharts**.

5. **AI-Driven Insights**:  
   Integrates the **Sambanova API** with the **Meta-Llama model**. The API provides actionable recommendations based on the financial data.

---

## Tech Stack

- **Frontend**: ReactJS, Tailwind CSS
- **Charts**: Recharts
- **AI Integration**: Sambanova API
- **Data Parsing**: XLSX (for reading Excel files)

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nsonika/CFO-system.git
   cd CFO-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Obtain a **Sambanova API Key**:
   - Visit [Sambanova Cloud](https://cloud.sambanova.ai/apis) to generate your API key.

4. Set up environment variables:
   Create a `.env` file in the root directory and add your **Sambanova API key**:
   ```env
   VITE_SAMBANOVA_API_KEY=your-api-key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
src/
├── components/
│   ├── ExpenseChart.jsx         # Displays expense breakdown using Recharts
│   ├── FileUpload.jsx           # Handles Excel file uploads
│   ├── IncomeStatement.jsx      # Displays income statements
│   ├── InsightsSection.jsx      # Displays AI-driven insights
│   ├── MetricsOverview.jsx      # Displays key financial metrics
├── pages/
│   ├── Dashboard.jsx            # Main dashboard logic and layout
├── utils/
│   ├── parseExcel.js            # Parses and processes Excel data
│   ├── fetchAIInsights.js       # Fetches AI insights from Sambanova API
├── App.jsx                      # Entry point for the application
├── index.css                    # Global styles
```

---

## Usage

1. Upload a valid financial Excel file (matching the template provided in the assignment).
2. View the income statement, metrics overview, and expense breakdown for the uploaded data.
3. Check AI-generated insights for actionable recommendations to improve financial performance.

---

## API Integration

- **API**: Sambanova API
- **Model**: Meta-Llama
- **Prompt**: Configured to act as a CFO assistant, providing insights and recommendations for financial improvement.

---

## Future Enhancements

- Support for additional years in the income statement.
- Dynamic customization of AI prompts for specific financial queries.
- Enhanced charts with interactivity.

---

## Deployed Application

The application is live at: [CFO System](https://cfo-system.vercel.app/)
