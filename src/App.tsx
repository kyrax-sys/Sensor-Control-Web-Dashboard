import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { type ReactElement } from "react";
import AppFrame from "./layouts/AppFrame";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getToken } from "./services/auth";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <PrivateRoute>
              <AppFrame />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="explore" element={<Explore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
