import { Navigate, createBrowserRouter as Router,
  RouterProvider, } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
// import Register from "./Pages/Register";
import Attendee from "./Pages/Attendee";
import Guest from "./Pages/Guest";
import Meeting from "./Pages/Meeting";
import Login from "./Pages/Login";
import RequireAuth from "./auth/RequireAuth";
import "./App.css"
import RequireNoAuth from "./auth/RequireNoAuth";
import NotFound from "./Components/NotFound";

const App = () => {

  const router = Router([
    {
      path: "/",
      element: <RequireAuth />,
      errorElement: <NotFound />,
      children:[
        {path: "/dashboard", element:<Dashboard /> },
        {path: "users", element: <Users />},
        {path: "attendee", element: <Attendee />},
        {path: "meetings", element: <Meeting />},
        {path: "guest", element: <Guest />},
      ]
    },
    {
      path: "/",
      element: <RequireNoAuth />,
      errorElement: <NotFound />,
      children:[
        {path: "", element:<Navigate to="login" element={<Login />} /> },
        {path: "login", element: <Login />},
        
      ]
    }

  ])
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={ <Navigate to='/login' element={<Login />} />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //       <Route path="/users" element={<Users />} />
  //       {/* <Route path="/register" element={<Register />} /> */}
  //       <Route path="/attendee" element={<Attendee />} />
  //       <Route path="/meetings" element={<Meeting />} />
  //       <Route path="/guest" element={<Guest />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  //     </Router>
  // )

  return <RouterProvider router={router} />;
}

export default App