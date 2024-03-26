import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './routes/Dashboard.tsx';
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import Eventos from './routes/eventos.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import EventosForm from './components/Events/EventosForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>
  },
  {
    path: "/signup",
    element:<Signup/>
  },
  {
    path: "/",
    element:<ProtectedRoute/>,
    children:[
      {
        path: "/dashboard",
        element:<Dashboard/>
      },
      {
        path: "/eventos",
        element:<Eventos/>,
      },
      {
        path: "/eventosForm",
        element:<EventosForm/>
      },
      {
        path: "/eventoUpdate/:id",
        element:<EventosForm/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
