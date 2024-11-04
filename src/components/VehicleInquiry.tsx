import React, { useState, useEffect } from 'react';
import '../App.css'



const apiUrl = import.meta.env.VITE_API_URL;

interface VehicleData {
    name: string;
    email: string;
    make: string;
    model: string;
    year: string;
    message: string;
}

const VehicleForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>(''); // New state for Email
    const [makes, setMakes] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [selectedMake, setSelectedMake] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number | string>('');
    const [message, setMessage] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string>('');

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
            name,
            email, // Include email in the data sent to the backend
            make: selectedMake,
            model: selectedModel,
            year: selectedYear.toString(),
            message,
        };

        fetch(`${apiUrl}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicleData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to send inquiry");
                }
                return response.json();
            })
            .then(() => {
                setResponseMessage('Your inquiry was sent successfully. We will get in touch with you soon.');
                // Clear form fields
                setName('');
                setEmail('');
                setSelectedMake('');
                setModels([]);
                setSelectedModel('');
                setSelectedYear('');
                setMessage('');
            })
            .catch((error) => {
                setResponseMessage(`Error: ${error.message}`);
            });
    };

    return (
        <form className="vehicle-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder='Enter name'
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Enter email'
                />
            </div>

            <div className="form-group">
                <label htmlFor="make">make:</label>
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
                <label htmlFor="model">model:</label>
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
                <label htmlFor="year">year:</label>
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
                <label htmlFor="message">message</label>
                <textarea
                    id="message"
                    placeholder='Enter'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                />
            </div>

            <button type="submit" className="submit-btn">
                Submit Inquiry
            </button>

            {responseMessage && (
                <div className="response-message">
                    {responseMessage}
                </div>
            )}
        </form>
    );
};

export default VehicleForm;
