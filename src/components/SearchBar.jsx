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
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search a city..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;