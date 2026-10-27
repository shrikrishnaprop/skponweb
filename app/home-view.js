// SKP-NextJS\app\home-view.js
"use client";

import { useMemo, useState } from "react";
import LocalFontPicker from "@/components/hsciifp/LocalFontPicker";

const whatsappNumber = "919818091646";

function whatsappLink(property) {
  const msg = `hello skp real estate, m ${property.title} me interested hu zo ${property.location} me H. pliiz muZe ditels Seyr kro.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export default function HomeView({ properties }) {
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState("");

  const filteredProperties = useMemo(() => {
    const search = location.toLowerCase().trim();
    return properties.filter(
      (property) =>
        (type === "all" || property.type === type) &&
        (category === "all" || property.category === category) &&
        (!search || property.location.toLowerCase().includes(search))
    );
  }, [type, category, location, properties]);

  async function submitEnquiry(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      interest: form.get("interest"),
      message: form.get("message") || "",
    };

    setEnquiryStatus("Saving...");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setEnquiryStatus("Saved. Opening watsxxp...");
    } catch {
      setEnquiryStatus("Could not save, opening watsxxp anyway.");
    }

    const text = `hello shri krishna properties,%0A%0AName: ${payload.name}%0APhone: ${payload.phone}%0ARequirement: ${payload.interest}%0ADetails: ${payload.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
    formEl.reset();
  }

  return (
    <>
      <header className="header">
        <div className="container nav">
          <a className="logo" href="#home"><span>skp</span>shri krishna properties</a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
          <nav className={menuOpen ? "open" : ""}>
            <a href="#home" onClick={() => setMenuOpen(false)}>vom</a>
            <a href="#properties" onClick={() => setMenuOpen(false)}>properties</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>srwisiz</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>xbaaut</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>kontxkt</a>
          </nav>
          <a className="nav-whatsapp" href={`https://wa.me/${whatsappNumber}?text=Hello%20SKP%20Real%20Estate%2C%20I%20am%20interested%20in%20a%20property.`} target="_blank" rel="noreferrer">watsxxp</a>
          <LocalFontPicker />
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">fariDabaaD • property eksperts</p>
            <h1>find a place<br/><em>you will luw.</em></h1>
            <p className="hero-text">rezidential, komArsiAl, sale and rental properties across fAriDaabaaD.</p>

            <div className="search-card">
              <div className="search-field"><label>luking foor</label><select value={type} onChange={(e) => setType(e.target.value)}><option value="all">aal proprtiiz</option><option value="sale">foor sel</option><option value="rent">foor rent</option></select></div>
              <div className="search-field"><label>proprti taip</label><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">aal taips</option><option value="residential">rezidensiAl</option><option value="commercial">komArsiAl</option></select></div>
              <div className="search-field"><label>Location</label><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Sector 15" /></div>
              <button className="search-btn" onClick={() => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })}>srch proprtiiz</button>
            </div>
          </div>
        </section>

        <section className="section" id="properties">
          <div className="container">
            <div className="section-head"><div><p className="eyebrow dark">featured listiNgs</p><h2>proprtiz you will waant tu sii</h2></div><span className="result-count">{filteredProperties.length} properties</span></div>
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <article className="property-card" key={property.id || property.title}>
                  <div className="property-image" style={{ backgroundImage: `url("${property.img}")` }}><span className="tag">{property.type === "sale" ? "For Sale" : "For Rent"}</span></div>
                  <div className="property-body"><div className="price">{property.price}</div><h3>{property.title}</h3><div className="location">⌖ {property.location}</div><div className="meta"><span>{property.beds}</span><span>{property.area}</span></div><a className="wa" href={whatsappLink(property)} target="_blank" rel="noreferrer">enkuire on whaatsxpp</a></div>
                </article>
              ))}
            </div>
            {filteredProperties.length === 0 && <div className="empty-state">no proprtiiz mAtch your srch.</div>}
          </div>
        </section>

        <section className="services section-soft" id="services"><div className="container"><p className="eyebrow dark">WHAT WE DO</p><h2>kmpliit proprti solyusns</h2><div className="service-grid"><article><div className="service-icon">⌂</div><h3>buy property</h3><p>find homes, plots, Apartments and kommersial spaces that match your rekuirements.</p></article><article><div className="service-icon">₹</div><h3>sell property</h3><p>get your property presented to zenuine buyers with professional xsistens.</p></article><article><div className="service-icon">↗</div><h3>rent xnd lease</h3><p>residential and komArsiAl rental options across friDabaaD.</p></article><article><div className="service-icon">▦</div><h3>komArsiAl</h3><p>shops, ofisiz, showrooms and other komArsiAl opportunities.</p></article></div></div></section>

        <section className="about section" id="about"><div className="container about-grid"><div className="about-image"><div className="about-badge"><strong>skp</strong><span>real estate</span></div></div><div><p className="eyebrow dark">about skp</p><h2>Your local property partner in friDabaaD.</h2><p>shri krishna properties helps buyers, sellers, landlords and tenants discower property opportunities across faridabad. based at srs royal vills, sector 87, we fokus on straightforward communication, useful property options and a smooth enkuiry process.</p><div className="stats"><div><strong>4+</strong><span>property categories</span></div><div><strong>24/7</strong><span>enkuiry support</span></div><div><strong>1</strong><span>locAl fokus</span></div></div></div></div></section>

        <section className="cta"><div className="container cta-inner"><div><p className="eyebrow">ready to muuw?</p><h2>tell us what property you need.</h2></div><a className="btn light" href={`https://wa.me/${whatsappNumber}?text=Hello%20SKP%20Real%20Estate%2C%20I%20want%20help%20finding%20a%20property.`} target="_blank" rel="noreferrer">chAt on whatsApp →</a></div></section>

        <section className="section contact" id="contact"><div className="container contact-grid"><div><p className="eyebrow dark">kontAkt</p><h2>let us faaind your nekst property.</h2><p>share your rekuirement xnd shri krishna properties can get back to you.</p><div className="contact-info"><a href={`tel:+${whatsappNumber}`}><span>☎</span> +91 97286 69364</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><span>◉</span> watsxxp us</a><div><span>⌖</span> srs royl hills, sAAktr 87, friDabaaD, hriyana</div></div></div><form onSubmit={submitEnquiry}><input name="name" required placeholder="Your name" /><input name="phone" required placeholder="Phone number" type="tel" /><select name="interest" defaultValue="Buying a property"><option>buying a property</option><option>selling a property</option><option>renting a property</option><option>commercial property</option></select><textarea name="message" rows="4" placeholder="tell us your rekuirement" /><button className="btn dark-btn" type="submit">send enkuiry on whatsapp</button>{enquiryStatus && <p className="enquiry-status">{enquiryStatus}</p>}</form></div></section>
      </main>

      <footer><div className="container footer-inner"><div><a className="logo footer-logo" href="#home"><span>SKP</span><small>shri krishna properties</small></a><p>property solutions in friDabaaD.</p></div><div><p>© {new Date().getFullYear()} shri krishna properties. aal rayits rizArwd.</p></div></div></footer>
      <a className="floating-wa" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="watsxxp">◉</a>
    </>
  );
}
