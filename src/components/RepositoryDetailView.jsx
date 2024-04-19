import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * The RepositoryDetailView component in JavaScript React fetches and displays information about a
 * repository including the readme content, recent commits, and open issues.
 * @returns The `RepositoryDetailView` component is being returned. It displays the details of a
 * repository including the readme content, recent commits, and open issues. The component fetches the
 * readme content, commits, and issues using Axios based on the provided `repo` prop, and then renders
 * them in the UI.
 */
const RepositoryDetailView = ({ repo }) => {
  /* The statement `const [readmeContent, setReadmeContent] = useState('');` is a React Hook statement
  in the `RepositoryDetailView` component. */
  const [readmeContent, setReadmeContent] = useState('');
  /* `const [commits, setCommits] = useState([]);` is a React Hook statement in the
  `RepositoryDetailView` component. */
  const [commits, setCommits] = useState([]);
  /* `const [issues, setIssues] = useState([]);` is a React Hook statement in the
  `RepositoryDetailView` component. */
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    /**
     * The function `fetchReadme` asynchronously fetches the README content from a specified repository
     * URL using axios and sets the content in the state variable `readmeContent`, handling errors if
     * any occur.
     */
    const fetchReadme = async () => {
      try {
        /* The line `const response = await axios.get(`${repo.url}/readme`);` is making an asynchronous
        GET request using Axios to fetch the README content of a specified repository. The
        `${repo.url}/readme` URL is constructed based on the `url` property of the `repo` object
        passed as a prop to the `RepositoryDetailView` component. The response data containing the
        README content is then stored in the `response` variable for further processing, in this
        case, setting the README content in the component's state variable `readmeContent`. */
        const response = await axios.get(`${repo.url}/readme`);
        /* `setReadmeContent(response.data.content);` is a statement in the `RepositoryDetailView`
        component that updates the state variable `readmeContent` with the content fetched from the
        README of a specified repository. */
        setReadmeContent(response.data.content);
      } catch (error) {
        console.error('Error fetching README:', error);
      }
    };

    /**
     * The function `fetchCommits` asynchronously fetches commit data from a specified repository URL
     * using axios in a React application.
     */
    const fetchCommits = async () => {
      try {
        /* The line `const response = await axios.get(`${repo.url}/commits`);` is making an
        asynchronous GET request using Axios to fetch commit data from a specified repository URL. */
        const response = await axios.get(`${repo.url}/commits`);
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    /**
     * The function fetches issues from a repository URL using axios in a React application.
     */
    const fetchIssues = async () => {
      try {
        /* The line `const response = await axios.get(`${repo.url}/issues`);` is making an asynchronous
        GET request using Axios to fetch the issues data from a specified repository URL. The
        `${repo.url}/issues` URL is constructed based on the `url` property of the `repo` object
        passed as a prop to the `RepositoryDetailView` component. The response data containing the
        issues information is then stored in the `response` variable for further processing, in this
        case, setting the issues data in the component's state variable `issues`. */
        const response = await axios.get(`${repo.url}/issues`);
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    /* The line `if (repo) {` in the `RepositoryDetailView` component is a conditional check that
    ensures the `repo` prop is not null or undefined before proceeding with fetching the readme
    content, commits, and issues data for that repository. If the `repo` prop is truthy (i.e., it
    exists and is not null), the component initiates the asynchronous fetching of the repository
    details. This check helps prevent unnecessary API calls or errors that could occur if the `repo`
    prop is not provided or is invalid. */
    if (repo) {
      fetchReadme();
      fetchCommits();
      fetchIssues();
    }
  }, [repo]);

  return (
    <div className="repository-detail bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Repository Detail</h2>
      <div className="section">
        <h3 className="text-lg font-semibold mb-2">Readme</h3>
        <div className="readme whitespace-pre-wrap bg-white p-4 rounded">{readmeContent}</div>
      </div>
      <div className="section">
        <h3 className="text-lg font-semibold mb-2">Recent Commits</h3>
        <ul className="list-disc list-inside">
          {commits.map(commit => (
            <li key={commit.sha} className="commit bg-white p-2 rounded shadow mb-2">
              <div className="font-semibold">{commit.commit.author.name}</div>
              <div className="text-gray-600">{commit.commit.message}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3 className="text-lg font-semibold mb-2">Open Issues</h3>
        <ul className="list-disc list-inside">
          {issues.map(issue => (
            <li key={issue.id} className="issue bg-white p-2 rounded shadow mb-2">
              <div className="font-semibold">{issue.title}</div>
              <div className="text-gray-600">Issue #{issue.number}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RepositoryDetailView;
