import React, { useState, useEffect } from 'react';
import '../css/styles.css'; // Import external CSS
import '../css/MediaQuery.css'

interface VehicleData {
    make: string;
    model: string;
    year: string;
    message: string;
}

const VehicleForm: React.FC = () => {
    const [makes, setMakes] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [selectedMake, setSelectedMake] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number | string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
            .then((response) => response.json())
            .then((data) => {
                const makeList = data.Results.map((make: any) => make.Make_Name);
                setMakes(makeList);
            });
    }, []);

    useEffect(() => {
        if (selectedMake) {
            fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`)
                .then((response) => response.json())
                .then((data) => {
                    const modelList = data.Results.map((model: any) => model.Model_Name);
                    setModels(modelList);
                });
        }
    }, [selectedMake]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearRange = Array.from({ length: 30 }, (_, i) => currentYear - i);
        setYears(yearRange);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const vehicleData: VehicleData = {
            make: selectedMake,
            model: selectedModel,
            year: selectedYear.toString(),
            message,
        };

        //https://api-4k-1012991611421.us-central1.run.app/send-email
        fetch('http://localhost:8080/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicleData),
        })
            .then((response) => response.json())
            .then(() => alert('Inquiry submitted!'))
            .catch((error) => console.error('Submission failed:', error));
    };

    return (
        <form className="vehicle-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="make">Make</label>
                <select
                    id="make"
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    required
                >
                    <option value="">Select a make</option>
                    {makes.map((make) => (
                        <option key={make} value={make}>
                            {make}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="model">Model</label>
                <select
                    id="model"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    required
                >
                    <option value="">Select a model</option>
                    {models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="year">Year</label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    required
                >
                    <option value="">Select a year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                />
            </div>

            <button type="submit" className="submit-btn">
                Submit Inquiry
            </button>
        </form>
    );
};

export default VehicleForm;
