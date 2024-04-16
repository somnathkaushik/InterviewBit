import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserSearch from './components/UserSearch';
import UserRepositoryTable from './components/UserRepositoryTable';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>Github Analytics Dashboard</h1>
      <UserSearch onUserSelect={handleUserSelect} />
      {selectedUser && <UserRepositoryTable user={selectedUser} />}
    </div>
  );
};

export default App;