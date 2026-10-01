import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [input, setInput] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (input.trim() === '') return;
        onSearch(input.trim());
        setInput('');
    }

    return (
        <form className="flex gap-2 mb-7" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search a city..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="flex-1 px-3.5 py-3 border border-slate-300 rounded-lg text-sm font-sans focus:outline-none focus:border-sky-500"
            />
            <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white px-5 rounded-lg text-sm font-medium transition-colors"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;