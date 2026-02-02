import { useState, useCallback, useEffect } from "react";

const Navbar = ({ executeScroll, refs }) => {
  const [isOpen, setOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light col-12"
      style={{ backgroundColor: "#0a192f" }}
    >
      <div className="container-fluid me-sm-3 ms-sm-3">
        <a
          to="/"
          className="navbar-brand text-light"
          href="#"
          onClick={() => {
            executeScroll(refs.mainRef);
            if (isOpen) setOpen(false);
          }}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          style={{
            position: "relative",
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          <h5
            style={{
              color: "#64ffda",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: isLogoHovered ? "180px" : "30px",
              transition: "width 0.4s ease",
            }}
          >
            <span
              style={{
                display: "inline-block",
              }}
            >
              {isLogoHovered ? "Abhishek Gattineni" : "AG"}
            </span>
          </h5>
        </a>
        <button
          className="navbar-toggler"
          style={{ color: "#64ffda" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "#64ffda" }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <h5
                className="fw-normal nav-link"
                style={{ color: "#64ffda", fontSize: "14px" }}
                onClick={() => {
                  executeScroll(refs.aboutRef);
                }}
              >
                <small
                  className="fw-normal"
                  style={{ color: "#ccd6f6", fontSize: "1rem" }}
                >
                  About
                </small>
              </h5>
            </li>
            <li className="nav-item ms-2">
              <h5
                className="fw-normal nav-link"
                style={{ color: "#64ffda", fontSize: "14px" }}
                onClick={() => {
                  executeScroll(refs.expRef);
                }}
              >
                <small
                  className="fw-normal"
                  style={{ color: "#ccd6f6", fontSize: "1rem" }}
                >
                  Experience
                </small>
              </h5>
            </li>
            <li className="nav-item ms-2">
              <h5
                className="fw-normal nav-link"
                style={{ color: "#64ffda", fontSize: "14px" }}
                onClick={() => {
                  executeScroll(refs.worksRef);
                }}
              >
                <small
                  className="fw-normal"
                  style={{ color: "#ccd6f6", fontSize: "1rem" }}
                >
                  Works
                </small>
              </h5>
            </li>
            <li className="nav-item ms-2">
              <h5
                className="fw-normal nav-link"
                style={{ color: "#64ffda", fontSize: "14px" }}
                onClick={() => {
                  executeScroll(refs.contactRef);
                }}
              >
                <small
                  className="fw-normal"
                  style={{ color: "#ccd6f6", fontSize: "1rem" }}
                >
                  Contact
                </small>
              </h5>
            </li>
            {/* <li className="nav-item ms-2">
              <button
                className="btn btn-outline-light"
                style={{ color: "#64ffda" }}
                type="submit"
                onClick={() => {
                  window.open("./Resume.pdf", "_blank");
                  setOpen(!isOpen);
                }}
              >
                Resume
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
