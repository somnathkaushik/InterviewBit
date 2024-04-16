import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRepositoryTable = ({ user }) => {
  const [repositories, setRepositories] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRepo, setExpandedRepo] = useState(null); // To keep track of expanded repository
  const [contributors, setContributors] = useState([]); // To store contributors of expanded repository
  const [showContributorIds, setShowContributorIds] = useState(false); // To toggle display of contributor IDs

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(user.repos_url);
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    if (user) {
      fetchRepositories();
    }
  }, [user]);

  const sortRepositories = (column) => {
    const sorted = [...repositories].sort((a, b) => {
      if (column === 'name') return a.name.localeCompare(b.name);
      return b[column] - a[column];
    });
    setRepositories(sorted);
    setSortBy(column);
  };

  const toggleExpandRepo = async (repoId) => {
    if (expandedRepo === repoId) {
      setExpandedRepo(null);
      setContributors([]);
    } else {
      setExpandedRepo(repoId);
      const selectedRepo = repositories.find(repo => repo.id === repoId);
      if (selectedRepo) {
        try {
          const response = await axios.get(selectedRepo.contributors_url);
          setContributors(response.data);
        } catch (error) {
          console.error('Error fetching contributors:', error);
        }
      }
    }
    setShowContributorIds(false); // Reset showContributorIds state when collapsing repository
  };

  const handleViewRepo = (htmlUrl) => {
    window.open(htmlUrl, '_blank');
  };

  const handleViewContributorProfile = (contributorLogin) => {
    const githubProfileUrl = `https://github.com/${contributorLogin}`;
    window.open(githubProfileUrl, '_blank');
  };

  const handleViewContributorIds = () => {
    setShowContributorIds(!showContributorIds);
  };

  // Filter repositories based on search term
  const filteredRepositories = repositories.filter(repo =>
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
                      <button onClick={handleViewContributorIds} className="mt-4 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Toggle Contributor IDs</button>
                    </div>
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

export default UserRepositoryTable;
