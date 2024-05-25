import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import MainPage from './MainPage.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import AboutPage from './About.jsx';
import CreateUserComponent from './Pages/CreateAccount.jsx';
import LoginComponent from './Components/LoginComponent.jsx';
import HelpPage from './Pages/helpPage.jsx';
import { LoginProvider } from './Contexts/LoginContext.jsx';
import { ClickedProvider } from './Contexts/ClickedContext.jsx';
import UserPage from './Pages/UserPage.jsx';
import MapPage from './Pages/MapPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/main",
        element: <MainPage />
      },
      {
        path: "/help",
        element: <HelpPage />
      },
      {
        path: "/create",
        element: <CreateUserComponent />
      },
      {
        path: "/login",
        element: <LoginComponent />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/userpage",
        element: <UserPage />
      }
      ,
      {
        path: "/mappi",
        element: <MapPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <ClickedProvider>
    <RouterProvider router={router} />
    </ClickedProvider>
    </LoginProvider>
  </React.StrictMode>,
)