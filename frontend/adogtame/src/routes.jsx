import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import DogDetail from "./pages/DogDetail";
import UploadDog from "./pages/UploadDog";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dogs/:id", element: <DogDetail /> },
      { path: "/publicar", element: <UploadDog /> },
      { path: "/Login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
