import Image from "next/image";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiBootstrap } from "react-icons/si";
import { useEffect, useRef } from "react";

const About = ({ refer }) => {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const imageNode = imageRef.current;
    const contentNode = contentRef.current;
    const skillsSection = document.querySelector(".skills");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Animate progress bars when skills section is visible
            if (entry.target.classList.contains("skills")) {
              const progressBars = entry.target.querySelectorAll(".progress-bar");
              progressBars.forEach((bar, index) => {
                setTimeout(() => {
                  const targetWidth = bar.style.getPropertyValue("--target-width") || "0%";
                  bar.style.width = targetWidth;
                }, index * 100);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageNode) observer.observe(imageNode);
    if (contentNode) observer.observe(contentNode);
    if (skillsSection) observer.observe(skillsSection);

    return () => {
      if (imageNode) observer.unobserve(imageNode);
      if (contentNode) observer.unobserve(contentNode);
      if (skillsSection) observer.unobserve(skillsSection);
    };
  }, []);

  return (
    <section
      id="about"
      className="about"
      style={{
        backgroundColor: "#0a192f",
        background: "linear-gradient(45deg, #0a192f, #020c1b)",
        paddingBottom: "5rem",
        paddingTop: "5rem",
        overflow: "hidden",
        width: "100%",
      }}
      ref={refer}
    >
      <div className="about-me container">
        <div className="section-title fade-in-on-scroll">
          <h2>About</h2>
          <p style={{ color: "#ccd6f6" }}>Learn more about me</p>
        </div>

        <div className="row">
          <div className="col-lg-4" ref={imageRef}>
            <div className="img-wrapper slide-in-left" style={{ animationDelay: "0.2s" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/abhidp.jpg" 
                className="img-fluid" 
                alt="Abhishek Gattineni" 
                style={{
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>
          </div>

          <div
            ref={contentRef}
            className="col-lg-8 pt-4 pt-lg-0 content p-lg-5 slide-in-right"
            style={{ color: "#ccd6f6", animationDelay: "0.4s" }}
          >
            <h3>Web &amp; Mobile App Developer</h3>
            <p className="fst-italic">
              Developer who is currently working with C3.AI & FRACTAL.AI as a Software
              Engineer. I have a passion for developing scalable, responsive and
              user-friendly web applications. I am a quick learner and a team
              player who is always ready to learn new technologies and
              frameworks. I am currently looking for a full-time opportunity as
              a Software Engineer.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <strong>City:</strong> <span>Los Angeles, USA</span>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <strong>Degree:</strong>{" "}
                    <span>Master&apos;s in CS, CSULB.</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <strong>Email:</strong>{" "}
                    <span>abhishekgattineni@gmail.com</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <strong>Freelance:</strong> <span>Available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="skills container" style={{ paddingTop: "3rem" }}>
        <div className="section-title fade-in-on-scroll">
          <h2>Skills</h2>
        </div>

        <div className="row skills-content">
          <div className="col-lg-6">
            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.1s" }}>
              <span className="skill">
                REACT JS <i className="val">100%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "100%" }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <span className="skill">
                CSS <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  style={{ width: "0%", "--target-width": "90%" }}
                  role="progressbar"
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <span className="skill">
                JavaScript <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "90%" }}
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.4s" }}>
              <span className="skill">
                DJANGO, FAST API <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "90%" }}
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.5s" }}>
              <span className="skill">
                AWS <i className="val">70%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "70%" }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.1s" }}>
              <span className="skill">
                NODE JS <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "90%" }}
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <span className="skill">
                WORDPRESS/SHOPIFY <i className="val">70%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "70%" }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <span className="skill">
                NODE.JS <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "90%" }}
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.4s" }}>
              <span className="skill">
                SQL/ NO SQL <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "90%" }}
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.5s" }}>
              <span className="skill">
                REST API/ GRAPH QL <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "90%" }}
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="progress fade-in-on-scroll" style={{ animationDelay: "0.6s" }}>
              <span className="skill">
                AGENTIC VIBE CODING <i className="val">80%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%", "--target-width": "80%" }}
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className="interests container fade-in-on-scroll" style={{ paddingTop: "3rem" }}>
        <div className="section-title">
          <h2>Interests</h2>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.1s" }}>
              <i className="ri-store-line" style={{ color: "#ffbb2c" }}></i>
              <h3>Programming</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <i
                className="ri-bar-chart-box-line"
                style={{ color: "#5578ff" }}
              ></i>
              <h3>Travelling</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <i
                className="ri-calendar-todo-line"
                style={{ color: "#e80368" }}
              ></i>
              <h3>Trekking</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.4s" }}>
              <i
                className="ri-paint-brush-line"
                style={{ color: "#e361ff" }}
              ></i>
              <h3>Driving</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.5s" }}>
              <i
                className="ri-database-2-line"
                style={{ color: "#47aeff" }}
              ></i>
              <h3>Gym</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.6s" }}>
              <i
                className="ri-gradienter-line"
                style={{ color: "#ffa76e" }}
              ></i>
              <h3>Food</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.7s" }}>
              <i
                className="ri-file-list-3-line"
                style={{ color: "#11dbcf" }}
              ></i>
              <h3>Trading</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box scale-in-on-scroll" style={{ animationDelay: "0.8s" }}>
              <i
                className="ri-price-tag-2-line"
                style={{ color: "#4233ff" }}
              ></i>
              <h3>Investments</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
