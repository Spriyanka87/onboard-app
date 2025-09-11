import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href="/home">
          On-Board Services
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"><i className="fa fa-bars" style={{color:'white'}}></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                   <i className="fa fa-user"></i> {user.data.name}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a className="dropdown-item" href="#"onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className=" nav-link " href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className=" nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
