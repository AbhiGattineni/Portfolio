/**
 * Projects Data - Single source of truth for the Works section and the chat context.
 *
 * Each project supports:
 *   id            - stable key
 *   title, type   - card heading / subheading
 *   icon          - emoji shown on the card
 *   summary       - short blurb shown on the card
 *   description   - full write-up shown in the detail modal
 *   highlights    - bullet points shown in the detail modal
 *   technologies  - full tech list (cards show the first few, modal shows all)
 *   link          - live/public URL (optional)
 *   github        - source repository URL (optional)
 *   images        - [{ src, alt }] gallery shown in the detail modal (optional)
 */

export const projects = [
  {
    id: "indimitra",
    title: "Indimitra.com",
    type: "B2B E-commerce Platform",
    icon: "🛒",
    summary:
      "Self-hosted e-commerce platform for small businesses, with separate interfaces for Users, Store Managers, and Delivery Partners.",
    description:
      "Contributed to the MVP of a self-hosted e-commerce website for small businesses, accessible globally. It supports the B2B Fractal plan, enabling businesses to stand up their own storefronts. The platform ships three distinct interfaces — Users, Store Managers, and Delivery Partners — and serves catalogues based on a delivery radius around the store.",
    highlights: [
      "Three role-based interfaces: Users, Store Managers, and Delivery Partners",
      "Radius-based ordering so customers only see stores that can deliver to them",
      "Database modeling done in ERASER.AI before implementation",
      "GraphQL API layer built with Strawberry on top of FastAPI and Django",
      "Helped set up AWS infrastructure across development, testing, and production",
    ],
    technologies: [
      "React",
      "React Query",
      "MUI",
      "Django",
      "FastAPI",
      "GraphQL",
      "Strawberry",
      "AWS",
    ],
    link: "https://indimitra.com/",
  },
  {
    id: "guestsmenu",
    title: "GuestsMenu.com",
    type: "Event Management Platform",
    icon: "🎉",
    summary:
      "Platform to host people at your place and collect their details, preferences, and RSVPs in one place.",
    description:
      "A platform for hosting people at your place and collecting their information up front. Hosts create an event, share a link, and guests submit their details and preferences — so the host has everything they need (headcount, contact info, food and seating preferences) in a single view instead of scattered across messages.",
    highlights: [
      "Hosts create an event and share a single link with guests",
      "Guests submit their own details, removing manual data entry for the host",
      "Collects preferences alongside RSVPs so hosts can plan food and seating",
      "Consolidated guest list view for the host",
    ],
    technologies: ["React", "Event Management", "Guest Management", "Responsive Web"],
    link: "https://www.guestsmenu.com/",
  },
  {
    id: "cliff-recruiter-suite",
    title: "Cliff Recruiter Suite",
    type: "Internal Recruiting Platform",
    icon: "📋",
    summary:
      "Internal web app for Cliff Services Inc. pairing LLM-backed resume screening with an automated Ceipal submissions report generator.",
    description:
      "An internal web app for Cliff Services Inc. that bundles two recruiter tools. Resume Parsing takes a resume plus a job description and returns a fit score, rating, short review, skill match, and an AI-generated-content signal, all LLM-backed. Report Generation builds the flat Ceipal submissions report — pulling live from the two Ceipal report APIs or from uploaded exports — previews it on screen, and downloads a formatted .xlsx. The frontend is React + Vite + TypeScript; Firebase Auth and Cloud Functions sit behind it, with every secret (Ceipal password, LLM token) held in the functions and never shipped to the browser.",
    highlights: [
      "Resume screening returns fit score, rating, skill match, and an AI-generated-content signal",
      "Cloud Functions act as a thin secure proxy — secrets never reach the browser, and Ceipal's CORS block is sidestepped",
      "Report transform and Excel build run client-side with ExcelJS, from API JSON or an uploaded .xlsx",
      "Self-service signup locked to the company email domain and gated behind a 6-digit email OTP",
      "Accounts are created disabled and only enabled after OTP verification; domain rule enforced server-side so it can't be bypassed",
      "CI on GitHub Actions, deployed to Firebase Hosting",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Firebase Auth",
      "Cloud Functions",
      "React Query",
      "ExcelJS",
      "Ceipal API",
      "LLM Integration",
    ],
    github: "https://github.com/AbhiGattineni/Cliff-Recruiter-Suite",
  },
  {
    id: "ambulance-tracking",
    title: "Ambulance Tracking",
    type: "Edge AI / Computer Vision",
    icon: "🚑",
    summary:
      "Dash-mounted Raspberry Pi and camera rig that spots approaching emergency vehicles from the live road feed and alerts the driver.",
    description:
      "A self-contained, battery-powered computer vision rig that mounts to a windshield and watches the road ahead. Frames from a Raspberry Pi Camera Module are processed on the device itself to detect ambulances and other emergency vehicles, so the driver gets an alert without any dependency on a network connection. Built and road-tested as a working hardware prototype rather than a simulation — the photos below are from a live freeway run.",
    highlights: [
      "Raspberry Pi paired with a Pi Camera Module on a laser-cut acrylic windshield mount",
      "Runs off a 7.4V Li-ion battery pack, so the whole unit is untethered from the car",
      "Inference happens on-device — no cloud round-trip, so detection keeps working with no signal",
      "Detection runs against the live road feed and raises a driver alert on a match",
      "Road-tested in a moving vehicle on the freeway, not just on recorded footage",
    ],
    technologies: [
      "Raspberry Pi",
      "Pi Camera Module",
      "Python",
      "OpenCV",
      "Computer Vision",
      "Edge AI",
      "IoT",
    ],
    images: [
      {
        src: "/assets/img/projects/ambulance-tracking/rig-windshield.jpg",
        alt: "Raspberry Pi and camera rig mounted against the windshield during a freeway drive",
      },
      {
        src: "/assets/img/projects/ambulance-tracking/rig-dashboard.jpg",
        alt: "The battery-powered Raspberry Pi stack sitting on the dashboard, camera facing the road",
      },
      {
        src: "/assets/img/projects/ambulance-tracking/camera-closeup.jpg",
        alt: "Close-up of the Pi Camera Module and its 5MP CS lens on the acrylic mount",
      },
    ],
  },
  {
    id: "word-highlighter",
    title: "Word Highlighter",
    type: "Chrome Extension",
    icon: "🔍",
    summary:
      "Published Chrome extension that highlights words in different colors across any webpage so content is easier to scan.",
    description:
      "A published Chrome extension that highlights words with different colors on any webpage. Readers pick the terms they care about and the extension colors every occurrence in place, so the relevant content stands out immediately instead of having to be hunted for. Available on the Chrome Web Store.",
    highlights: [
      "Live on the Chrome Web Store",
      "Multiple highlight colors so different terms stay distinguishable",
      "Highlights apply in place on any page, without breaking the site's layout",
      "Built as a developer/reader productivity tool for scanning long pages",
    ],
    technologies: ["Chrome Extension", "JavaScript", "Developer Tools"],
    link: "https://chromewebstore.google.com/detail/word-highlighter/nheocgebdfhdfknfppfhfcgijedcepae",
  },
  {
    id: "pos-system",
    title: "POS System for Retail Billing",
    type: "PoC - Point of Sale System",
    icon: "💳",
    summary:
      "Proof-of-concept Point of Sale system for retail stores, built as a Fractal product with a streamlined billing flow.",
    description:
      "Led the development of a proof-of-concept Point of Sale system for stores as a product of Fractal, focused on a streamlined billing process. Designed the UI/UX in React and Material-UI, working from wireframes and prototypes built in Figma. Google OAuth handles authentication, the backend is Node.js with RESTful APIs, and Google Firebase provides real-time data storage.",
    highlights: [
      "Led the PoC end to end, from Figma wireframes through to a working demo",
      "Streamlined billing flow designed around how store staff actually check customers out",
      "Google OAuth for secure user authentication",
      "Node.js backend exposing RESTful APIs",
      "Firebase for real-time data storage",
    ],
    technologies: [
      "React",
      "Material-UI",
      "Node.js",
      "Firebase",
      "Google OAuth",
      "Figma",
    ],
    link: "https://v1-demo.lightworks-services.com/#/",
  },
  {
    id: "qr-menu-scanner",
    title: "QR Menu Scanner",
    type: "Restaurant Menu System",
    icon: "📱",
    summary:
      "Digital menu product for restaurants — customers scan a QR code at the table and browse the menu on their own phone.",
    description:
      "A QR menu scanner built as a product for restaurants. Customers scan a QR code at the table and the full menu opens on their own device, giving a contactless dining experience and letting the restaurant update items without reprinting anything.",
    highlights: [
      "Contactless: no shared physical menus at the table",
      "Menu updates go live instantly, with no reprinting",
      "Mobile-first layout designed for phone screens",
      "Deployed for live restaurant customers",
    ],
    technologies: ["QR Code", "Mobile Web", "Restaurant Tech", "React"],
    link: "https://scoressportsbar.menuscard.com/",
  },
  {
    id: "more-projects",
    title: "More Projects",
    type: "Additional Work Portfolio",
    icon: "🚀",
    summary:
      "Static sites, payment flows, e-commerce, and booking systems built to specific customer requirements.",
    description:
      "There are more projects related to static websites, payment websites, e-commerce websites, booking websites, and various other customer products developed to specific requirements. Each one is tailored to a unique business need and built to deliver the best user experience for that audience.",
    highlights: [
      "Static marketing and brochure websites",
      "Payment and checkout integrations",
      "E-commerce storefronts",
      "Booking and scheduling systems",
    ],
    technologies: [
      "Static Websites",
      "Payment Systems",
      "E-commerce",
      "Booking Systems",
    ],
    isMoreCard: true,
  },
];

export default projects;
