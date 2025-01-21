import * as XLSX from "xlsx";

export const parseExcel = async (file) => {
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet, {
      header: "A",
      defval: 0,
      blankrows: false,
    });

    // Process the data based on your P&L structure
    const processedData = {
      revenue: { 2024: 0, 2023: 0 },
      expenses: { 2024: {}, 2023: {} },
    };

    // Skip the header row and process each row
    rawData.slice(1).forEach((row) => {
      const account = row.A; // Account name
      const value2024 = parseFloat(row.B) || 0; // 2024 value
      const value2023 = parseFloat(row.C) || 0; // 2023 value

      if (account === "Total Revenue") {
        processedData.revenue[2024] = value2024;
        processedData.revenue[2023] = value2023;
      } else if (
        !account.toLowerCase().includes("total") &&
        account !== "Cost of goods sold"
      ) {
        processedData.expenses[2024][account] = value2024;
        processedData.expenses[2023][account] = value2023;
      }
    });

    return {
      success: true,
      data: processedData,
    };
  } catch (error) {
    console.error("Error parsing Excel:", error);
    return {
      success: false,
      error:
        "Failed to parse Excel file. Please ensure it matches the template format.",
    };
  }
};
