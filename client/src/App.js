import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Job from "./components/getJob/Job"
import Add from "./components/addJob/Add"
import Edit from "./components/updateJob/Edit"

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Job/>,
    },
    {
      path: "/add",
      element: <Add/>,
    },
    {
      path: "/edit/:id",
      element: <Edit/>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider  router={route}></RouterProvider>
    </div>
  );
}

export default App;
