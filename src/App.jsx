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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



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

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
