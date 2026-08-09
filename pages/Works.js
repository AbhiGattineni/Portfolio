import { useEffect, useState } from "react";
import projects from "../utils/projectsData";
import ProjectModal from "./ProjectModal";

const Works = ({ refer }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("visible");
                        }, index * 100);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = document.querySelectorAll(".project-card");
        cards.forEach(card => observer.observe(card));

        return () => {
            cards.forEach(card => observer.unobserve(card));
        };
    }, []);

    return (
        <div
            className='container-fluid min-vh-100'
            style={{
                backgroundColor: "#0a192f",
                background: "linear-gradient(45deg, #0a192f, #020c1b)",
                paddingTop: "5rem",
                paddingBottom: "5rem"
            }}
            ref={refer}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-5 fade-in-on-scroll">
                        <h5 className='fw-normal' style={{ color: "#64ffda", fontSize: "1.6vmax" }}>
                            03. <small className='fw-bold' style={{ color: '#ccd6f6', fontSize: "2.2vmax" }}>Some Work&apos;s Ive Done</small>
                        </h5>
                        <p style={{ color: "#8892b0", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                            Click any card to see the full details.
                        </p>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {projects.map((project, index) => (
                        <div className="col" key={project.id}>
                            <div
                                className='card text-white h-100 project-card scale-in-on-scroll'
                                role="button"
                                tabIndex={0}
                                aria-label={`View details for ${project.title}`}
                                onClick={() => setSelectedProject(project)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setSelectedProject(project);
                                    }
                                }}
                                style={{
                                    backgroundColor: "#112240",
                                    border: "1px solid rgba(100, 255, 218, 0.1)",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    animationDelay: `${index * 0.1}s`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.borderColor = "#64ffda";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.borderColor = "rgba(100, 255, 218, 0.1)";
                                }}
                            >
                                <div className="card-body d-flex flex-column">
                                    <div className="mb-3" style={{ fontSize: "2.5rem" }}>
                                        {project.icon}
                                    </div>
                                    <h5
                                        className="card-title mb-2"
                                        style={{ color: "#64ffda" }}
                                    >
                                        {project.title}
                                    </h5>
                                    {/* No .text-muted here: Bootstrap sets its color with !important,
                                        which would win over the inline color below. */}
                                    <p
                                        className="mb-2"
                                        style={{
                                            color: "#8892b0",
                                            fontSize: "0.9rem",
                                            fontStyle: "italic"
                                        }}
                                    >
                                        {project.type}
                                    </p>
                                    <p
                                        className="card-text flex-grow-1"
                                        style={{
                                            color: "#ccd6f6",
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6"
                                        }}
                                    >
                                        {project.summary}
                                    </p>
                                    <div className="mt-3 mb-3">
                                        <div className="d-flex flex-wrap gap-2">
                                            {project.technologies.slice(0, project.isMoreCard ? 4 : 3).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="badge"
                                                    style={{
                                                        backgroundColor: "rgba(100, 255, 218, 0.1)",
                                                        color: "#64ffda",
                                                        fontSize: "0.75rem",
                                                        padding: "0.25rem 0.5rem"
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-auto d-flex flex-wrap align-items-center gap-3">
                                        <span
                                            style={{
                                                color: "#64ffda",
                                                fontSize: "0.9rem",
                                                fontWeight: 500
                                            }}
                                        >
                                            View Details →
                                        </span>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    color: "#8892b0",
                                                    fontSize: "0.85rem",
                                                    textDecoration: "underline"
                                                }}
                                            >
                                                Visit site
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    color: "#8892b0",
                                                    fontSize: "0.85rem",
                                                    textDecoration: "underline"
                                                }}
                                            >
                                                Source
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}

export default Works;
