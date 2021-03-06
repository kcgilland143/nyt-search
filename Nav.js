import React from "react";
import { Link } from "react-router-dom"

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
        New York Times Search
        </a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/Saved"><span>Saved</span></Link>
        </li>
        <li>
          <Link to="/"><span>Search</span></Link>
        </li>
      </ul>
    </div>
  </nav>;

export default Nav;
