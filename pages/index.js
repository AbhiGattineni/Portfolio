import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Main from "./Main";
import Navbar from "./Navbar";
import Works from "./Works";
import { initScrollAnimations } from "../utils/animations";

export default function Home() {
  const mainRef = useRef(null);
  const aboutRef = useRef(null);
  const expRef = useRef(null);
  const worksRef = useRef(null);
  const contactRef = useRef(null);

  const ref = { mainRef, aboutRef, expRef, worksRef, contactRef };

  const executeScroll = (componentRef) => {
    componentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    // Initialize scroll animations
    initScrollAnimations();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Abhishek Gattineni</title>
        <meta name="description" content="Abhishek Gattineni's Portfolio" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar executeScroll={executeScroll} refs={ref} />
      <Main executeScroll={executeScroll} refs={ref} refer={mainRef} />
      <About refer={aboutRef} />
      <Experience refer={expRef} />
      <Works refer={worksRef} />
      <Contact refer={contactRef} />
    </div>
  );
}
