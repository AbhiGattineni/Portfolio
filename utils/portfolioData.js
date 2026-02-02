/**
 * Portfolio Data - Structured data extracted from website sections
 * This file serves as the single source of truth for portfolio information
 * Update this file when website content changes
 */

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Abhishek Gattineni",
    title: "Web & Mobile App Developer",
    tagline: "I build things for the Web & Mobile.",
    location: "Los Angeles, USA",
    phone: "+1 562-542-7985",
    email: "abhishekgattineni@gmail.com",
    degree: "Master's in CS, CSULB",
    freelance: "Available",
    resumePath: "/AG_Resume.pdf"
  },

  // About Section
  about: {
    summary: "Developer currently working with C3.AI & FRACTAL.AI as a Software Engineer. Passionate about developing scalable, responsive and user-friendly web applications. Quick learner and team player always ready to learn new technologies and frameworks. Currently looking for full-time opportunity as a Software Engineer.",
    interests: ["Programming", "Travelling", "Trekking", "Driving", "Gym", "Food", "Trading", "Investments"]
  },

  // Skills Section
  skills: {
    frontend: [
      { name: "React JS", level: 100 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 90 }
    ],
    backend: [
      { name: "Node JS", level: 90 },
      { name: "Django, FastAPI", level: 90 },
      { name: "REST API / GraphQL", level: 90 }
    ],
    databases: [
      { name: "SQL / NoSQL", level: 90 }
    ],
    platforms: [
      { name: "AWS", level: 70 },
      { name: "WordPress/Shopify", level: 70 }
    ]
  },

  // Experience Timeline
  experience: [
    {
      duration: "1 Year",
      year: "2024",
      title: "Senior Applications Engineer at C3 AI / Fractal",
      description: "Key role in development and maintenance of UI component library for C3 AI's enterprise AI platform. Led design and implementation of UI components ensuring performance, scalability, and accessibility. Contributed to backend development using Python. Led technical design discussions and mentored junior engineers."
    },
    {
      duration: "1.5 Years",
      year: "2023",
      title: "Software Engineer at Wells Fargo",
      description: "MERN Stack Developer building and optimizing financial applications. Developed scalable React applications with reusable components, integrated secure APIs using Node.js. Improved CI/CD pipelines, reduced deployment times. Worked with AWS for deployment and management. Led transition to microservices architecture."
    },
    {
      duration: "1.5 Years",
      year: "2021",
      title: "Master's at California State University, Long Beach",
      description: "Master's degree in Computer Science with 3.5/4.0 GPA. Coursework in machine learning, cloud computing, and distributed systems. Built cloud-based application for real-time data analysis and developed data mining algorithms."
    },
    {
      duration: "2 Years",
      year: "2019",
      title: "Wheelz4Wash - Startup",
      description: "Core development team for door-to-door car cleaning services startup. Developed UI using ReactJS and backend using Node.js for APIs (customer management, scheduling, payments). Scaled platform to serve 50,000+ users."
    },
    {
      duration: "4 Years",
      year: "2017",
      title: "Software Engineer at Cyient Ltd",
      description: "Full-stack development using ReactJS, Node.js, and Express. Built scalable web applications with efficient user-friendly interfaces and robust backend APIs. Developed real-time monitoring tools and internal dashboards."
    },
    {
      duration: "5 Years",
      year: "2016",
      title: "Operations Head at Hyderabad Trekking Company",
      description: "Led operations managing team of 15-20 members for large-scale trekking events across India. Streamlined logistics, managed vendor relationships, implemented strategies to scale business."
    },
    {
      duration: "1 Year",
      year: "2016",
      title: "Associate Director & Production Designer",
      description: "Led teams in media and entertainment industry, overseeing design and execution of production sets. Managed budgets and deadlines, coordinated creative projects from inception to delivery."
    },
    {
      duration: "4 Years",
      year: "2013",
      title: "Bachelor's in Computer Science",
      description: "Bachelor's degree from Vidya Jyothi Institute of Technology, Hyderabad with 3.2/4.0 GPA. Core subjects: algorithms, data structures, software engineering."
    }
  ],

  // Projects
  projects: [
    {
      title: "Word Highlighter",
      type: "Chrome Extension",
      description: "Chrome extension to highlight words with different colors on webpages for easier content discovery.",
      link: "https://chromewebstore.google.com/detail/word-highlighter/nheocgebdfhdfknfppfhfcgijedcepae",
      technologies: ["Chrome Extension", "JavaScript", "Developer Tools"]
    },
    {
      title: "POS System for Retail Billing",
      type: "Point of Sale System",
      description: "Proof-of-concept POS system with React, Material-UI, Google OAuth, Node.js backend, and Firebase database.",
      link: "https://v1-demo.lightworks-services.com/#/",
      technologies: ["React", "Material-UI", "Node.js", "Firebase", "Google OAuth"]
    },
    {
      title: "Indimitra.com",
      type: "B2B E-commerce Platform",
      description: "Self-hosted e-commerce platform for small businesses with interfaces for Users, Store Managers, and Delivery Partners.",
      link: "https://indimitra.com/",
      technologies: ["React", "Django", "FastAPI", "GraphQL", "AWS"]
    },
    {
      title: "QR Menu Scanner",
      type: "Restaurant Menu System",
      description: "Digital menu solution for restaurants with QR code scanning for contactless dining.",
      link: "https://scoressportsbar.menuscard.com/",
      technologies: ["QR Code", "Mobile Web"]
    },
    {
      title: "GuestsMenu.com",
      type: "Event Management Platform",
      description: "Platform to manage guest information and preferences for events and gatherings.",
      link: "https://www.guestsmenu.com/",
      technologies: ["Event Management", "Guest Management"]
    }
  ],

  // Contact Information
  contact: {
    message: "Currently looking for new opportunities in Full Stack/Front End Development. Inbox is always open for opportunities or just to say hi.",
    email: "abhishekgattineni@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/abhishek-gattineni-05937088/",
      instagram: "https://www.instagram.com/abhigattineni/",
      facebook: "https://www.facebook.com/abhi.gattineni/"
    }
  }
};

export default portfolioData;

