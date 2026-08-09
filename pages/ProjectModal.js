/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";

const ACCENT = "#64ffda";
const HEADING = "#ccd6f6";
const MUTED = "#8892b0";
const PANEL = "#112240";

/**
 * Full-screen detail view for a single project.
 * Rendered only when `project` is set; closes on backdrop click, the X, or Escape.
 */
const ProjectModal = ({ project, onClose }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [brokenImages, setBrokenImages] = useState({});
    const dialogRef = useRef(null);

    // Reset the gallery whenever a different project is opened.
    useEffect(() => {
        setActiveImage(0);
    }, [project?.id]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (!project) return undefined;

        document.addEventListener("keydown", handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialogRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [project, handleKeyDown]);

    if (!project) return null;

    // Drop any image that failed to load so a missing file never shows a broken frame.
    const images = (project.images || []).filter((image) => !brokenImages[image.src]);
    const currentImage = images[Math.min(activeImage, images.length - 1)];

    const markBroken = (src) => {
        setBrokenImages((previous) => ({ ...previous, [src]: true }));
    };

    const linkButtonStyle = {
        backgroundColor: "transparent",
        color: ACCENT,
        border: `1px solid ${ACCENT}`,
        borderRadius: "4px",
        padding: "0.5rem 1.25rem",
        textDecoration: "none",
        display: "inline-block",
        transition: "all 0.3s ease"
    };

    return (
        <div
            className="project-modal-backdrop"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="project-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                tabIndex={-1}
                ref={dialogRef}
                onClick={(event) => event.stopPropagation()}
                style={{ backgroundColor: PANEL, border: `1px solid rgba(100, 255, 218, 0.2)` }}
            >
                <button
                    type="button"
                    className="project-modal-close"
                    onClick={onClose}
                    aria-label="Close project details"
                    style={{ color: ACCENT }}
                >
                    &times;
                </button>

                <div className="project-modal-body">
                    <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{project.icon}</div>
                    <h3
                        id="project-modal-title"
                        className="mt-3 mb-1"
                        style={{ color: ACCENT }}
                    >
                        {project.title}
                    </h3>
                    <p style={{ color: MUTED, fontStyle: "italic", marginBottom: "1.5rem" }}>
                        {project.type}
                    </p>

                    {currentImage && (
                        <div className="mb-4">
                            <div className="project-modal-image-frame">
                                <img
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    onError={() => markBroken(currentImage.src)}
                                />
                            </div>
                            <p style={{ color: MUTED, fontSize: "0.85rem", marginTop: "0.5rem" }}>
                                {currentImage.alt}
                            </p>
                            {images.length > 1 && (
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {images.map((image, index) => (
                                        <button
                                            type="button"
                                            key={image.src}
                                            onClick={() => setActiveImage(index)}
                                            className="project-modal-thumb"
                                            aria-label={`Show image ${index + 1} of ${images.length}`}
                                            style={{
                                                borderColor: index === activeImage
                                                    ? ACCENT
                                                    : "rgba(100, 255, 218, 0.2)"
                                            }}
                                        >
                                            <img
                                                src={image.src}
                                                alt=""
                                                onError={() => markBroken(image.src)}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <p style={{ color: HEADING, lineHeight: 1.7 }}>{project.description}</p>

                    {project.highlights?.length > 0 && (
                        <>
                            <h6 className="mt-4 mb-2" style={{ color: ACCENT }}>Highlights</h6>
                            <ul className="project-modal-list">
                                {project.highlights.map((highlight) => (
                                    <li key={highlight} style={{ color: HEADING }}>{highlight}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    <h6 className="mt-4 mb-2" style={{ color: ACCENT }}>Tech Stack</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="badge"
                                style={{
                                    backgroundColor: "rgba(100, 255, 218, 0.1)",
                                    color: ACCENT,
                                    fontSize: "0.75rem",
                                    padding: "0.35rem 0.6rem"
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="d-flex flex-wrap gap-3 mt-4">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={linkButtonStyle}
                            >
                                View Live →
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={linkButtonStyle}
                            >
                                View Code →
                            </a>
                        )}
                        {!project.link && !project.github && (
                            <span style={{ color: MUTED, fontStyle: "italic" }}>
                                Contact for more details
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
