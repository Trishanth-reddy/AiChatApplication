import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../src/components/ui/Sidebar';
import Chat from './components/Home/Chat/Chat';
import History from './components/History/History';
import { useState } from 'react';
import Upgrade from './components/Upgrade/Upgrade';
import Profile from './components/Profile/profile';
import Memory from './components/Memory/memory';
import Login from './components/AuthForms/Login';
import Signup from "./components/AuthForms/Signup";

function Layout() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <main className="flex-1 h-full overflow-hidden">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Standalone routes (no sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes with the sidebar layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Chat />} />
        <Route path="history" element={<History />} />
        <Route path="memory" element={<Memory />} />
        <Route path="upgrade" element={<Upgrade />} />
        <Route path="profile" element={<Profile />} />
        {/* Add more routes here */}
      </Route>
    </Routes>
  );
}

export default App;
