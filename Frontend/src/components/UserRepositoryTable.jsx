/* The line `import React, { useState, useEffect } from 'react';` is importing the necessary modules
from the React library. */
import React, { useState, useEffect } from 'react';
/* The line `import axios from 'axios';` is importing the Axios library, which is a popular JavaScript
library used for making HTTP requests from the browser. In this context, Axios is being used to
fetch data from an API endpoint to retrieve information about a user's repositories. */
import axios from 'axios';
import RepositoryDetailView from './RepositoryDetailView'; // Import the RepositoryDetailView component

/* The `UserRepositoryTable` component is a functional component in JavaScript React that displays a
table of repositories belonging to a specific user. Here's a breakdown of what the component does: */
const UserRepositoryTable = ({ user }) => {
  /* `const [repositories, setRepositories] = useState([]);` is a line of code in a React functional
  component that is using the `useState` hook. */
  const [repositories, setRepositories] = useState([]);
  /* The line `const [sortBy, setSortBy] = useState(null);` in the `UserRepositoryTable` component is
  using the `useState` hook in React to create a state variable `sortBy` and a corresponding setter
  function `setSortBy`. */
  const [sortBy, setSortBy] = useState(null);
  /* The line `const [searchTerm, setSearchTerm] = useState('');` in the `UserRepositoryTable`
  component is using the `useState` hook in React to create a state variable `searchTerm` and a
  corresponding setter function `setSearchTerm`. */
  const [searchTerm, setSearchTerm] = useState('');
  /* The line `const [expandedRepo, setExpandedRepo] = useState(null);` in the `UserRepositoryTable`
  component is using the `useState` hook in React to create a state variable `expandedRepo` and a
  corresponding setter function `setExpandedRepo`. */
  const [expandedRepo, setExpandedRepo] = useState(null);
  /* The line `const [contributors, setContributors] = useState([]);` in the `UserRepositoryTable`
  component is using the `useState` hook in React to create a state variable `contributors` and a
  corresponding setter function `setContributors`. */
  const [contributors, setContributors] = useState([]);
  /* The line `const [showContributorIds, setShowContributorIds] = useState(false);` in the
  `UserRepositoryTable` component is using the `useState` hook in React to create a state variable
  `showContributorIds` and a corresponding setter function `setShowContributorIds`. */
  const [showContributorIds, setShowContributorIds] = useState(false);

  /* This code block is defining an asynchronous function `fetchRepositories` inside the `useEffect`
  hook of the `UserRepositoryTable` component. Here's what it does: */
  useEffect(() => {
    /**
     * The function fetches repositories data from a specified URL and sets the response data to a
     * state variable, handling errors if they occur.
     */
    const fetchRepositories = async () => {
      try {
        /* `const response = await axios.get(user.repos_url);` is making an HTTP GET request using the
        Axios library to fetch data from the URL specified in `user.repos_url`. This line of code is
        retrieving information about the repositories belonging to a specific user by sending a
        request to the API endpoint provided in `user.repos_url`. The response data from the API
        call is stored in the `response` variable after the request is successfully completed. */
        const response = await axios.get(user.repos_url);
        /* `setRepositories(response.data);` is a line of code in the `fetchRepositories` function of
        the `UserRepositoryTable` component that sets the state variable `repositories` to the data
        retrieved from the API response. */
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    if (user) {
      /* `fetchRepositories();` is a function call that is being made inside the `useEffect` hook of
      the `UserRepositoryTable` component. This function call triggers the asynchronous function
      `fetchRepositories` defined within the `useEffect` hook. The purpose of calling
      `fetchRepositories()` is to initiate the process of fetching repository data from a specified
      URL (retrieved from `user.repos_url`) using an HTTP GET request with Axios. This function call
      is executed when the component mounts or when the `user` prop changes, as specified by the
      dependency array `[user]` in the `useEffect` hook. */
      fetchRepositories();
    }
  }, [user]);

  /**
   * The function `sortRepositories` sorts an array of repositories based on a specified column and
   * updates the state with the sorted array and the column used for sorting.
   */
  const sortRepositories = (column) => {
    /* The code `const sorted = [...repositories].sort((a, b) => {
          if (column === 'name') return a.name.localeCompare(b.name);
          return b[column] - a[column];
        });` is sorting the array of repositories based on a specified column. */
    const sorted = [...repositories].sort((a, b) => {
      /* The line `if (column === 'name') return a.name.localeCompare(b.name);` inside the
      `sortRepositories` function is comparing the `name` property of two repository objects `a` and
      `b` using the `localeCompare` method. */
      if (column === 'name') return a.name.localeCompare(b.name);
      /* The line `return b[column] - a[column];` inside the `sortRepositories` function is performing
      a comparison between two values of the specified column in descending order. */
      return b[column] - a[column];
    });
    setRepositories(sorted);
    setSortBy(column);
  };

  /**
   * The function `toggleExpandRepo` toggles the expanded state of a repository and fetches
   * contributors if the repository is expanded.
   */
  const toggleExpandRepo = async (repoId) => {
    /* The line `if (expandedRepo === repoId) {` in the `toggleExpandRepo` function of the
    `UserRepositoryTable` component is checking if the `expandedRepo` state variable is equal to the
    `repoId` parameter passed to the function. */
    if (expandedRepo === repoId) {
      setExpandedRepo(null);
      setContributors([]);
    } else {
      setExpandedRepo(repoId);
      /* The line `const selectedRepo = repositories.find(repo => repo.id === repoId);` in the
      `toggleExpandRepo` function of the `UserRepositoryTable` component is finding a specific
      repository object from the `repositories` array based on a condition. */
      const selectedRepo = repositories.find(repo => repo.id === repoId);
      /* The line `if (selectedRepo) {` in the `toggleExpandRepo` function of the `UserRepositoryTable`
      component is checking if the variable `selectedRepo` contains a truthy value. In this context,
      it is verifying whether a specific repository object was successfully found in the
      `repositories` array based on the condition `repo.id === repoId`. If `selectedRepo` is not
      null, undefined, 0, an empty string, or false, the block of code inside the `if` statement
      will be executed. */
      if (selectedRepo) {
        try {
          /* The line `const response = await axios.get(selectedRepo.contributors_url);` is making an
          asynchronous HTTP GET request using the Axios library to fetch data from the URL specified
          in `selectedRepo.contributors_url`. */
          const response = await axios.get(selectedRepo.contributors_url);
          /* The above code is setting the contributors data received from an API response to the state
          variable `contributors` in a React component. */
          setContributors(response.data);
        } catch (error) {
          console.error('Error fetching contributors:', error);
        }
      }
    }
    /* `setShowContributorIds(false);` is a line of code in the `toggleExpandRepo` function of the
    `UserRepositoryTable` component. This code sets the state variable `showContributorIds` to
    `false`. */
    setShowContributorIds(false);
  };

  /**
   * The function `handleViewRepo` opens a new browser tab with the provided URL.
   */
  const handleViewRepo = (htmlUrl) => {
    window.open(htmlUrl, '_blank');
  };

  /**
   * The function `handleViewContributorProfile` opens a new tab with the GitHub profile of a
   * contributor based on their login.
   */
  const handleViewContributorProfile = (contributorLogin) => {
    /* The above code is using a template literal to create a GitHub profile URL for a contributor. The
    URL is constructed by appending the `contributorLogin` variable to the base GitHub URL
    `https://github.com/`. */
    const githubProfileUrl = `https://github.com/${contributorLogin}`;
    window.open(githubProfileUrl, '_blank');
  };

  /**
   * The function `handleViewContributorIds` toggles the visibility of contributor IDs.
   */
  const handleViewContributorIds = () => {
    setShowContributorIds(!showContributorIds);
  };

  /* The above code is filtering an array of repositories based on a search term. It is converting both
  the repository name and the search term to lowercase using the `toLowerCase()` method, and then
  checking if the repository name includes the search term. If the repository name contains the
  search term (case-insensitive), it will be included in the `filteredRepositories` array. */
  const filteredRepositories = repositories.filter(repo =>
    /* The above code is checking if the lowercase version of the `repo.name` includes the lowercase
    version of the `searchTerm`. This is commonly used for case-insensitive search functionality. */
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Repositories for {user.login}</h2>
      <input
        type="text"
        placeholder="Search by repository name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-400"
      />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th onClick={() => sortRepositories('name')} className="px-4 py-2 cursor-pointer">Name {sortBy === 'name' ? '▲' : '▼'}</th>
            <th onClick={() => sortRepositories('stargazers_count')} className="px-4 py-2 cursor-pointer">Stars {sortBy === 'stargazers_count' ? '▲' : '▼'}</th>
            <th onClick={() => sortRepositories('forks_count')} className="px-4 py-2 cursor-pointer">Forks {sortBy === 'forks_count' ? '▲' : '▼'}</th>
            <th onClick={() => sortRepositories('open_issues_count')} className="px-4 py-2 cursor-pointer">Open Issues {sortBy === 'open_issues_count' ? '▲' : '▼'}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRepositories.map((repo) => (
            <React.Fragment key={repo.id}>
              <tr className="hover:bg-gray-100">
                <td onClick={() => toggleExpandRepo(repo.id)} className="px-4 py-2 cursor-pointer">
                  {repo.name}
                </td>
                <td className="px-4 py-2">{repo.stargazers_count}</td>
                <td className="px-4 py-2">{repo.forks_count}</td>
                <td className="px-4 py-2">{repo.open_issues_count}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleViewRepo(repo.html_url)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
                </td>
              </tr>
              {expandedRepo === repo.id && (
                <tr>
                  <td colSpan="5">
                    <div className="p-4 border rounded bg-gray-100">
                      <h3 className="text-lg font-semibold mb-2">Contributors</h3>
                      <ul>
                        {contributors.map(contributor => (
                          <li key={contributor.id} className="flex items-center justify-between px-4 py-2 border-b">
                            <span>{contributor.login}</span>
                            {showContributorIds && (
                              <button onClick={() => handleViewContributorProfile(contributor.login)} className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">View ID</button>
                            )}
                          </li>
                        ))}
                      </ul>
                      <button onClick={handleViewContributorIds} className="mt-4 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Show Contributor IDs</button>
                    </div>
                    <RepositoryDetailView repo={repositories.find(r => r.id === expandedRepo)} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* The above code is exporting a component called UserRepositoryTable in JavaScript React. */
export default UserRepositoryTable;
