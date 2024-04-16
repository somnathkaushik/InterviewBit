import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = ({ onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <input
        type="text"
        placeholder="Search GitHub users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
      />
      <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
      <div className="mt-4">
        {searchResults.map((user) => (
          <div key={user.id} onClick={() => onUserSelect(user)} className="flex items-center mt-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
            <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full mr-2" />
            <p className="text-lg">{user.login}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
