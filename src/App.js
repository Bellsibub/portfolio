import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// hooks
import { useAuth } from 'hooks/useAuth';

// elements
import ProtectedRoute from 'utils/ProtectedRoute';
import AnimatedPage from 'utils/AnimatedPage';
import { Navbar, Modal } from 'components';
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
  let location = useLocation();
  let state = {
    backgroundLocation: location.state?.backgroundLocation || location.state,
  };

  return (
    <>
      <Navbar />
      <AnimatedPage>
        <Routes location={state?.backgroundLocation || location}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="skills" element={<Skills />} />
          <Route path="quests" element={<Quests />} />
          <Route path="character" element={<Character />} />
        </Routes>
      </AnimatedPage>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/quests/:id" element={<Modal />} />
          <Route path="/skills/:id" element={<Modal />} />
        </Routes>
      )}
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
