import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
        setHistory(saved);
    }, []);

    return (
        <div className="page theme-default">
            <div className="app">
                <div className="mb-8">
                 <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                     History
                </h1>
                   <p className="text-sm text-slate-500 mt-1">Your recently searched cities.</p>
                 </div>

                {history.length === 0 && (
                    <p className="text-sm text-slate-500">No searches yet — go check the weather somewhere!</p>
                )}

                <ul className="flex flex-col gap-2.5 list-none">
                    {history.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={`/?city=${item.city}`}
                                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 shadow-md shadow-slate-900/5 no-underline text-slate-800 hover:-translate-y-0.5 transition-transform"
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="flex-1 text-left text-sm font-medium">{item.city}</span>
                                <span className="text-sm text-slate-500">{item.temperature}°C</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default History;