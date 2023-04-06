import classes from "./MainNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
// import NewsletterSignup from "./NewsletterSignup";
import eventzone from "../assets/eventzone.svg";

const MainNavigation = () => {
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate("/");
  };
  
  return (
    <header className={classes.header}>
      <h1>
        <img onClick={homeHandler} src={eventzone} alt="logo" />
      </h1>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Events
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="newsletter"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Newsletter
            </NavLink>
          </li> */}
        </ul>
      </nav>
      {/* <div className={classes.newsletter}>
        <NewsletterSignup />
      </div> */}
    </header>
  );
};

export default MainNavigation;
