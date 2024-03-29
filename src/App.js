import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// hooks
import { useAuth } from "hooks/useAuth";

// elements
import ProtectedRoute from "utils/ProtectedRoute";
import AnimatedPage from "utils/AnimatedPage";
import { Navbar, Modal } from "components";
import {
  Home,
  Character,
  Skills,
  Quests,
  Equipment,
  Login,
  Profile,
  Projects,
  Admin,
  SkillManager,
  AdminEquipment,
  CRUDproject,
  CRUDskills,
  CRUDequipment,
} from "pages";

// styling
import "./App.css";

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
          <Route path="character" element={<Character />} />
          <Route path="skills" element={<Skills />} />
          <Route path="quests" element={<Quests />} />
          <Route path="equipment" element={<Equipment />} />
        </Routes>
      </AnimatedPage>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/quests/:id" element={<Modal />} />
          <Route path="/skills/:id" element={<Modal />} />
          <Route path="/equipment/:id" element={<Modal />} />
        </Routes>
      )}
    </>
  );
};

const AdminRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="admin">
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
            path="projects/:id"
            element={
              <ProtectedRoute>
                <CRUDproject />
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
            path="skills/:id"
            element={
              <ProtectedRoute>
                <CRUDskills />
              </ProtectedRoute>
            }
          />
          <Route
            path="equipment"
            element={
              <ProtectedRoute>
                <AdminEquipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="equipment/:id"
            element={
              <ProtectedRoute>
                <CRUDequipment />
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
