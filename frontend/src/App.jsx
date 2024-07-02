import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import Workflow from "./components/Workflow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registerform from "./components/Registerform";
import Loginform from "./components/Loginform";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Showseq from "./components/Showseq";
import { useAuthContext } from "./context/AuthContext";
import Signupin from "./pages/Signupin";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
          children={[
            <Route key={1} path="/" element={<Workflow />} />,
            <Route key={2} path="/get" element={<Showseq />} />,
          ]}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Signupin />}
          children={[
            <Route key={1} path="/register" element={<Registerform />} />,
          ]}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Signupin />}
          children={[<Route key={1} path="/login" element={<Loginform />} />]}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
