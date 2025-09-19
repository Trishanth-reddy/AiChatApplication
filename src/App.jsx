import { Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';

// UI and Layout Components
import Sidebar from './components/ui/Sidebar';

// Page Components (Corrected Paths)
import Chat from './components/Home/Chat/Chat';
import History from './components/History/History';
import Upgrade from './components/Upgrade/Upgrade';
import Memory from './components/Memory/Memory';      // Fixed case
import Login from './components/AuthForms/Login';        // Fixed case
import Signup from "./components/AuthForms/Signup";
import Profile from './components/Profile/Profile';      // Fixed case

// Main layout component with sidebar
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

// Main application component with all routes
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
      </Route>
    </Routes>
  );
}

export default App;