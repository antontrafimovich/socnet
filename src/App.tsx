import "./App.css";
import "@radix-ui/themes/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/main/error-page";
import { Main } from "./pages/main/main";
import { User } from "./pages/user/user";
import { PostPage } from "./pages/post/post";

const router = createBrowserRouter([
  { path: "/", element: <Main />, errorElement: <ErrorPage /> },
  { path: "/users/:userId", element: <User />, errorElement: <ErrorPage /> },
  { path: "/posts/:postId", element: <PostPage />, errorElement: <ErrorPage /> },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
