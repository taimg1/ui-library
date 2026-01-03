import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "../components/Root";
import Layout from "../components/Layout/Layout";
import Dashboard from "../features/Dashboard";

const BasicDataRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Root}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default BasicDataRouter;
