import React, { useState } from 'react';
import axios from 'axios';

/* This code defines a functional component called `UserSearch` in JavaScript React. */
const UserSearch = ({ onUserSelect }) => {
  /* `const [searchQuery, setSearchQuery] = useState('');` is a line of code in a React functional
  component that uses the `useState` hook. */
  const [searchQuery, setSearchQuery] = useState('');
  /* `const [searchResults, setSearchResults] = useState([]);` is a line of code in a React functional
  component that uses the `useState` hook. */
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      /* This line of code is making an asynchronous GET request to the GitHub API to search for users
      based on the `searchQuery` state value. The `axios.get` method is used to send a GET request
      to the specified URL, which includes the search query parameter obtained from the
      `searchQuery` state variable. The response from the API is then stored in the `response`
      variable after the request is completed. */
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      /* `setSearchResults(response.data.items);` is updating the state variable `searchResults` in the
      `UserSearch` component with the array of user items obtained from the response data of the
      GitHub API. The `response.data.items` contains an array of user objects returned by the API
      after performing a search based on the `searchQuery` state value. By calling
      `setSearchResults`, the component triggers a re-render with the updated `searchResults` state,
      causing the UI to display the search results fetched from the API. */
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
        /* The `value={searchQuery}` attribute in the input field of the `UserSearch` component is
        binding the value of the input field to the `searchQuery` state variable. This means that
        the value displayed in the input field is controlled by the `searchQuery` state variable. */
        value={searchQuery}
        /* The `onChange={(e) => setSearchQuery(e.target.value)}` is an event handler in the input
        field of the `UserSearch` component in React. */
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
