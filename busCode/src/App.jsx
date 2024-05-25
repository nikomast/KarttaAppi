import { Link, Outlet } from "react-router-dom";
import "./app.css";
import { useLogin } from './Contexts/LoginContext';
import LogoutButton from './Components/LogOutButton'

// NAV BAR goes here
function App() {
  const { isLoggedIn } = useLogin();
  return (
    <>
      <div className="header">
        <h1 className="mainTitle">Travel Odyssey</h1>
        <nav className="navBar">
          <Link className="navLink" to={"main"}>MAIN</Link>
          <Link className="navLink" to={"/mappi"}>LOCATIONS</Link>
          <Link className="navLink" to={"/about"}>ABOUT</Link>
        {!isLoggedIn ? (
        <>
        <Link className="navLink" to={"/create"}>CREATE ACCOUNT</Link>
        <Link className="navLink" to={"/login"}>LOGIN</Link>
        </>
      ) : (
        <>
        <Link className="navLink" to={"/userpage"}>SETTINGS</Link>
        <LogoutButton/>
        </>
      )}

          

        </nav>
      </div>
      <Outlet/>
    </>
  )
}

export default App
