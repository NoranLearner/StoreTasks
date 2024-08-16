import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import EditTask from "./pages/edit-task/EditTask.jsx";
import Signin from "./pages/sign-in/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Html from "./pages/html";
import Css from "./pages/css";
import Javascript from "./pages/javascript";
import Error404 from "./pages/Error404.jsx";

import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/edit-task/:stringId",
    element: <EditTask />,
    errorElement: <Error404 />,
  },
  {
    path: "/sign-in",
    element: <Signin />,
    errorElement: <Error404 />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
    errorElement: <Error404 />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error404 />,
  },
  {
    path: "/html",
    element: <Html />,
    errorElement: <Error404 />,
  },
  {
    path: "/css",
    element: <Css />,
    errorElement: <Error404 />,
  },
  {
    path: "/javascript",
    element: <Javascript />,
    errorElement: <Error404 />,
  },
]);

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
