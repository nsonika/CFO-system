import React, { useState } from "react";
import { Upload } from "lucide-react";

const FileUpload = ({ handleFileUpload, error }) => {
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            handleFileUpload(event);
        }
    };

    return (
        <div className="mb-6">
            <label className="flex flex-col items-center p-6 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                    {fileName ? `Uploaded: ${fileName}` : "Upload P&L Excel File"}
                </span>
                <input
                    type="file"
                    className="hidden"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                />
            </label>
            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
