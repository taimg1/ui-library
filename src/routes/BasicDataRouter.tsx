import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "../components/Root";
import Layout from "../components/Layout/Layout";

const BasicDataRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Root}>
        <Route path="/" Component={Layout} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default BasicDataRouter;
