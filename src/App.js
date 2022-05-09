import { BrowserRouter, Routes, Route } from 'react-router-dom';

// hooks
import { useAuth } from 'hooks/useAuth';

// elements
import ProtectedRoute from 'utils/ProtectedRoute';
import { Navbar } from 'components';
import {
  Home,
  Contact,
  Skills,
  Quests,
  Character,
  Login,
  Profile,
  Projects,
  Admin,
  SkillManager,
  Equipment,
} from 'pages';

// styling
import './App.css';

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="skills" element={<Skills />} />
          <Route path="quests" element={<Quests />} />
          <Route path="character" element={<Character />} />
        </Routes>
      </main>
    </>
  );
};

const AdminRoutes = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="skills"
            element={
              <ProtectedRoute>
                <SkillManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="equipment"
            element={
              <ProtectedRoute>
                <Equipment />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  const { authIsReady } = useAuth();

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <div className="App">
            <div className="container">
              <Routes>
                <Route path="/*" element={<MainRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />}></Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
