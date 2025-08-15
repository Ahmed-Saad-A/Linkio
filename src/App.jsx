import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layout/AuthLayout";
import RegisterPage from "./Pages/Auth/RegisterPage";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./Pages/HomePage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import ProfilePage from "./Pages/ProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";
import LoginPage from "./Pages/Auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedRoute/ProtectedAuthRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const client = new QueryClient();
const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            {" "}
            <LoginPage />{" "}
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoute>
            {" "}
            <RegisterPage />{" "}
          </ProtectedAuthRoute>
        ),
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <HomePage />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "post-details/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <PostDetailsPage />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            {" "}
            <ProfilePage />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
