import { CircularProgress } from '@mui/material';
import React, {Suspense} from 'react'
import { Navigate, RouterProvider, createHashRouter} from "react-router-dom";
import "./App.css"
import Layout from './Components/Layout';

const App = () => {
  const Login = React.lazy(() => import("./Pages/Login"))
  const Dashboard = React.lazy(() => import("./Pages/Dashboard"))
  const Users = React.lazy(() => import("./Pages/Users"))
  const Attendee = React.lazy(() => import("./Pages/Attendee"))
  const Guest = React.lazy(() => import("./Pages/Guest"))
  const Meeting = React.lazy(() => import("./Pages/Meeting"))
  const RequireAuth = React.lazy(() => import("./auth/RequireAuth"))
  const RequireNoAuth = React.lazy(() => import("./auth/RequireNoAuth"))
  const NotFound = React.lazy(() => import("./Components/NotFound"))

  const ProgressBox = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </div>
    )
  }

  const router = createHashRouter([
    {
      element: <RequireAuth />,
      errorElement: <NotFound />,
      children:[
        {path: "/dashboard", element:<Dashboard /> },
        {path: "/users", element: <Users />},
        {path: "/attendee", element: <Attendee />},
        {path: "/meetings", element: <Meeting />},
        {path: "/guest", element: <Guest />},
      ]
    },
    {
      element: <RequireNoAuth />,
      errorElement: <NotFound />,
      children:[
        {path: "/", element:<Navigate to="login" element={<Login />} /> },
        {path: "/login", element: <Login />},
        
      ]
    }

  ])

  // return (
  //   <HashRouter>
  //     <Suspense fallback={<ProgressBox />}>
  //       <Routes>
  //         <Route path="/" element={ <Navigate to='/login' element={<Login />} />} />
  //         <Route path="/dashboard" element={<Dashboard />} />
  //         <Route path="/users" element={<Users />} />
  //         {/* <Route path="/register" element={<Register />} /> */}
  //         <Route path="/attendee" element={<Attendee />} />
  //         <Route path="/meetings" element={<Meeting />} />
  //         <Route path="/guest" element={<Guest />} />
  //         <Route path="/login" element={<Login />} />
  //       </Routes>
  //     </Suspense>
  //     </HashRouter>
  // )

  return (
    <Suspense fallback={<ProgressBox />}>
        <RouterProvider router={router} />
      </Suspense>

  )
}

export default App