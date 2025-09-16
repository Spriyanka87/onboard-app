import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.brand}>
          <h2 style={styles.brandTitle}>On-Board Services</h2>
          <p style={styles.tagline}>
            Reliable cleaning & maintenance solutions at your doorstep.
          </p>
        </div>

        {/* Links */}
        <div style={styles.links}>
          <h4 style={styles.heading}>Quick Links</h4>
          <a href="/home" style={styles.link}>Home</a>
          <a href="/home " style={styles.link}>Services</a>
          <a href="/subscriptions" style={styles.link}>Subscriptions</a>
          <a href="/contact" style={styles.link}>Contact</a>
        </div>

        {/* Contact */}
        <div style={styles.contact}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>📞 9515710166</p>
          <p style={styles.text}>📧 onboardservices@example.com</p>
          <p style={styles.text}>📍 Hyderabad, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        <p style={styles.bottomText}>
          © {new Date().getFullYear()} On-Board Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Styles
const styles = {
  footer: {
    background: "linear-gradient(135deg, grey,grey)",
    color: "#fff",
    paddingTop: "30px",
    paddingBottom: "10px",
    fontFamily: "'Segoe UI', sans-serif",
    
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxWidth: "1200px",
    margin: "auto",
    textAlign: "left",
    
  },
  brand: {
    flex: "1 1 300px",
    marginBottom: "20px",
  },
  brandTitle: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  tagline: {
    marginTop: "8px",
    fontSize: "0.95rem",
    opacity: 0.9,
  },
  links: {
    flex: "1 1 200px",
    marginBottom: "20px",
  },
  link: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    marginBottom: "8px",
    transition: "color 0.3s",
  },
  heading: {
    marginBottom: "10px",
    fontWeight: "600",
  },
  contact: {
    flex: "1 1 200px",
    marginBottom: "20px",
  },
  text: {
    margin: "4px 0",
    opacity: 0.95,
  },
  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.3)",
    marginTop: "20px",
    paddingTop: "10px",
    textAlign: "center",
  },
  bottomText: {
    margin: 0,
    fontSize: "0.85rem",
    opacity: 0.9,
  },
};

export default Footer;
