import React, { useState, useEffect, useCallback } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Experience = ({ refer }) => {
  const timelineData = [
    {
      month: "1 Year",
      year: "2024",
      title: "Senior Applications Engineer at C3 AI/ Fractal",
      description:
        "As a Senior Applications Engineer at C3 AI, I played a key role in the development and maintenance of the UI component library for C3 AI's enterprise AI platform, which supports industries across various verticals. I led the design and implementation of UI components, ensuring they met performance, scalability, and accessibility standards. I also contributed to backend development using Python, ensuring seamless integration with the frontend. In addition to writing clean, reusable code, I led technical design discussions, mentored junior engineers, and ensured that all code met industry best practices. My work at C3 AI has allowed me to apply my full stack expertise to solve complex challenges in the AI space.",
      img: ["/c3ai.jpg", "/Fractal.jpg"],
    },
    {
      month: "1.5 Years",
      year: "2023",
      title: "Software Engineer at Wells Fargo",
      description:
        "At Wells Fargo, I worked as a MERN Stack Developer, focusing on building and optimizing financial applications. Developed scalable React applications with reusable components, integrated with secure APIs using Node.js, and ensured seamless data handling with MongoDB. Led efforts in improving CI/CD pipelines, reducing deployment times, and ensuring higher code quality through automated testing frameworks like Jest. Collaborated closely with UX teams to enhance the user experience and worked with the DevOps team to deploy and manage applications on AWS, ensuring high availability and performance. My role also involved mentoring junior developers and leading the transition to a microservices architecture.",
      img: "/wells.jpeg",
    },
    {
      month: "1.5 Years",
      year: "2021",
      title: "Masters in California State University, Long Beach",
      description:
        "Pursued a Master's degree in Computer Science at California State University, Long Beach, graduating with a GPA of 3.5/4.0. My coursework included advanced topics in machine learning, cloud computing, and distributed systems. Worked on several research projects and practical assignments, such as building a cloud-based application for real-time data analysis and developing algorithms for data mining. This period significantly expanded my technical expertise and prepared me for more advanced roles in software engineering.",
      img: "/csulb.jfif",
    },
    {
      month: "2 Years",
      year: "2019",
      title: "Wheelz4Wash - Startup",
      description:
        "As part of the core development team at Wheelz4Wash, a fast-growing startup providing door-to-door car cleaning services, I worked on both the frontend and backend of the platform. I developed the user interface using ReactJS, ensuring a smooth and responsive experience for customers, while also contributing to the backend using Node.js to build APIs for customer management, service scheduling, and payments. My efforts helped scale the platform to serve over 50,000 users. I also played a role in optimizing the application for mobile use, which significantly boosted customer engagement.",
      img: "/wheelz4wash.png",
    },
    {
      month: "4 Years",
      year: "2017",
      title: "Software Engineer at Cyient Ltd",
      description:
        "At Cyient Ltd, I transitioned into a full-stack development role, where I contributed to the development of scalable web applications using technologies like ReactJS, Node.js, and Express. Worked on both frontend and backend systems, focusing on creating efficient, user-friendly interfaces and robust backend APIs. Collaborated with cross-functional teams to deliver solutions that met business objectives while maintaining high performance and scalability. Key projects included developing real-time monitoring tools for industrial applications and creating internal dashboards to streamline workflows.",
      img: "/cyient.png",
    },
    {
      month: "5 Years",
      year: "2016",
      title: "Operations Head at Hyderabad Trekking Company",
      description:
        "Led operations for Hyderabad Trekking Company, managing a team of 15-20 members to coordinate large-scale trekking events across various regions of India. Streamlined logistics, managed vendor relationships, and optimized scheduling to ensure smooth execution of events. My role involved not only overseeing the day-to-day operations but also implementing strategies to scale the business, resulting in increased participant engagement and operational efficiency. I also contributed to the development of an internal tool to manage operations more effectively.",
      img: [
        "/htc.png",
        "/abhihtc.jpeg",
        "/htc-gokarna-beach.jpg",
        "/htc-sunrise-trek.jpg",
        "/htc-mysore-palace.jpg",
        "/htc-group-rocks.jpg",
        "/htc-green-hills.jpg",
        "/htc-waterfall.jpg",
        "/htc-hampi.jpg",
      ],
    },
    {
      month: "1 Year",
      year: "2016",
      title: "Associate Director & Production Designer",
      description:
        "Worked as an Associate Director and Production Designer in the media and entertainment industry. Led teams in overseeing the design and execution of production sets, managing tight budgets and deadlines. Played a critical role in coordinating creative projects from inception to final delivery, collaborating with directors, designers, and other departments to ensure high-quality production standards were met. This experience honed my leadership and project management skills, which have been valuable in my technical career.",
      img: ["/movie.jpg", "/loop-poster.jpg", "/film-set.jpg", "/film-onset.jpg"],
    },
    {
      month: "4 Years",
      year: "2013",
      title: "Bachelors in Computer Science",
      description:
        "Completed my Bachelor's degree in Computer Science from Vidya Jyothi Institute of Technology, Hyderabad, India. Focused on core subjects such as algorithms, data structures, and software engineering. Gained practical experience through various academic projects, including developing a mini operating system and a file management system. Graduated with a GPA of 3.2/4.0, laying the foundation for my career in software development.",
    },
  ];

  // Sliding Image Component
  const SlidingImage = ({ images, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goTo = useCallback(
      (step) => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + step + images.length) % images.length
        );
      },
      [images]
    );

    useEffect(() => {
      if (images && images.length > 1 && !isPaused) {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Switch every 2 seconds

        return () => clearInterval(interval);
      }
    }, [images, isPaused, currentIndex]);

    if (!images || images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div
          className="m-3"
          style={{ 
            maxWidth: "500px", 
            height: "300px", 
            position: "relative", 
            overflow: "hidden",
            borderRadius: "4px"
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0]}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block"
            }}
          />
        </div>
      );
    }

    const chevronStyle = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "34px",
      height: "34px",
      padding: 0,
      border: "1px solid #64ffda",
      borderRadius: "50%",
      backgroundColor: "rgba(10, 25, 47, 0.75)",
      color: "#64ffda",
      cursor: "pointer",
      transition: "background-color 0.3s ease, color 0.3s ease",
    };

    return (
      <div
        className="m-3"
        style={{
          maxWidth: "500px",
          height: "300px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "4px",
          backgroundColor: "#112240"
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentIndex ? 1 : 0,
              transform: `translateX(${index === currentIndex ? 0 : index < currentIndex ? -100 : 100}%)`,
              transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
              zIndex: index === currentIndex ? 2 : 1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${alt} ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block"
              }}
              onError={(e) => {
                console.error(`Failed to load image: ${img}`);
                e.target.style.display = "none";
              }}
            />
          </div>
        ))}

        <button
          type="button"
          aria-label={`Previous image of ${alt}`}
          onClick={() => goTo(-1)}
          style={{ ...chevronStyle, left: "10px" }}
        >
          <BsChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label={`Next image of ${alt}`}
          onClick={() => goTo(1)}
          style={{ ...chevronStyle, right: "10px" }}
        >
          <BsChevronRight size={16} />
        </button>

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: 0,
            right: 0,
            zIndex: 3,
            display: "flex",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          {images.map((img, index) => (
            <button
              key={img}
              type="button"
              aria-label={`Go to image ${index + 1} of ${alt}`}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: "8px",
                height: "8px",
                padding: 0,
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor:
                  index === currentIndex ? "#64ffda" : "rgba(204, 214, 246, 0.4)",
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#0a192f",
        background: "linear-gradient(45deg, #0a192f, #020c1b)",
        borderTop: "1px solid white",
      }}
      ref={refer}
    >
      <div className="container">
        <div className="main-timeline">
          {timelineData.map((item, index) => (
            <div
              className="timeline"
              key={index}
              style={{ paddingTop: "5rem" }}
            >
              <div className="icon"></div>
              <div className="date-content">
                <div className="date-outer">
                  <span className="date">
                    <span className="month" style={{ color: "#8892b0" }}>
                      {item.month}
                    </span>
                    <span className="year" style={{ color: "#8892b0" }}>
                      {item.year}
                    </span>
                  </span>
                </div>
              </div>
              <div className="timeline-content">
                <h5
                  className="title"
                  style={{ color: "#64ffda", transition: "0.3s" }}
                >
                  {item.title}
                </h5>
                <p className="description" style={{ color: "#ccd6f6" }}>
                  {item.description}
                </p>
                {item.img && (
                  <SlidingImage 
                    key={`${item.title}-${Array.isArray(item.img) ? item.img.join('-') : item.img}`}
                    images={Array.isArray(item.img) ? item.img : [item.img]} 
                    alt={item.title}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
