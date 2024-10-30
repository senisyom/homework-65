import { NavLink } from "react-router-dom";

const ToolBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-sm">
        <span className="navbar-brand">Static page</span>

        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/pages" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about/pages" className="nav-link">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contacts" className="nav-link">
              Contacts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/interesting" className="nav-link">
              Interesting
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ToolBar;
