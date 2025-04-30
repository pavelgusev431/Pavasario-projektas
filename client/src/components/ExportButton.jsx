import Papa from 'papaparse';

const ExportButton = ({ data, filename = 'report.csv' }) => {
    const handleExport = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Export as CSV
        </button>
    );
};

export default ExportButton;
