'use client';

import { useMemo, useState } from 'react';

const properties = [
  { title: 'SRS Royal Hills 2+1 BHK Apartment', price: 'Price on Request', type: 'sale', category: 'residential', location: 'SRS Royal Hills, Sector 87, Faridabad', beds: '2+1 BHK', area: '1,133 sq.ft', img: '/images/properties/srs-royal-hills-2plus1-b1-1133.png' },
  { title: 'Modern 3 BHK Builder Floor', price: '₹78 Lakh', type: 'sale', category: 'residential', location: 'Sector 15, Faridabad', beds: '3 BHK', area: '1,850 sq.ft', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80' },
  { title: 'Premium 2 BHK Apartment', price: '₹22,000 / month', type: 'rent', category: 'residential', location: 'Sector 21C, Faridabad', beds: '2 BHK', area: '1,250 sq.ft', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80' },
  { title: 'Commercial Showroom', price: '₹1.45 Cr', type: 'sale', category: 'commercial', location: 'Mathura Road, Faridabad', beds: 'Ground Floor', area: '1,900 sq.ft', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80' },
  { title: 'Independent 4 BHK House', price: '₹1.25 Cr', type: 'sale', category: 'residential', location: 'Sector 16, Faridabad', beds: '4 BHK', area: '2,700 sq.ft', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80' },
  { title: 'Office Space', price: '₹45,000 / month', type: 'rent', category: 'commercial', location: 'Sector 12, Faridabad', beds: 'Office', area: '1,600 sq.ft', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' },
  { title: 'Residential Plot', price: '₹65 Lakh', type: 'sale', category: 'residential', location: 'Sector 89, Faridabad', beds: 'Plot', area: '1,000 sq.ft', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80' },
];

const whatsappNumber = '919728669364';

function whatsappLink(property) {
  const msg = `Hello SKP Real Estate, I am interested in: ${property.title} in ${property.location}. Please share more details.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export default function Home() {
  const [type, setType] = useState('all');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    const search = location.toLowerCase().trim();
    return properties.filter((property) =>
      (type === 'all' || property.type === type) &&
      (category === 'all' || property.category === category) &&
      (!search || property.location.toLowerCase().includes(search))
    );
  }, [type, category, location]);

  function submitEnquiry(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = `Hello SKP Real Estate,%0A%0AName: ${form.get('name')}%0APhone: ${form.get('phone')}%0ARequirement: ${form.get('interest')}%0ADetails: ${form.get('message') || ''}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <header className="header">
        <div className="container nav">
          <a className="logo" href="#home"><span>SKP</span><small>REAL ESTATE</small></a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
          <nav className={menuOpen ? 'open' : ''}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#properties" onClick={() => setMenuOpen(false)}>Properties</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <a className="nav-whatsapp" href={`https://wa.me/${whatsappNumber}?text=Hello%20SKP%20Real%20Estate%2C%20I%20am%20interested%20in%20a%20property.`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">FARIDABAD • PROPERTY EXPERTS</p>
            <h1>Find a place<br /><em>you&apos;ll love.</em></h1>
            <p className="hero-text">Residential, commercial, sale and rental properties across Faridabad.</p>

            <div className="search-card">
              <div className="search-field"><label>Looking for</label><select value={type} onChange={(e) => setType(e.target.value)}><option value="all">All Properties</option><option value="sale">For Sale</option><option value="rent">For Rent</option></select></div>
              <div className="search-field"><label>Property type</label><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All Types</option><option value="residential">Residential</option><option value="commercial">Commercial</option></select></div>
              <div className="search-field"><label>Location</label><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Sector 15" /></div>
              <button className="search-btn" onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}>Search Properties</button>
            </div>
          </div>
        </section>

        <section className="section" id="properties">
          <div className="container">
            <div className="section-head"><div><p className="eyebrow dark">FEATURED LISTINGS</p><h2>Properties you&apos;ll want to see</h2></div><span className="result-count">{filteredProperties.length} properties</span></div>
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <article className="property-card" key={property.title}>
                  <div className="property-image" style={{ backgroundImage: `url("${property.img}")` }}><span className="tag">{property.type === 'sale' ? 'For Sale' : 'For Rent'}</span></div>
                  <div className="property-body"><div className="price">{property.price}</div><h3>{property.title}</h3><div className="location">⌖ {property.location}</div><div className="meta"><span>{property.beds}</span><span>{property.area}</span></div><a className="wa" href={whatsappLink(property)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a></div>
                </article>
              ))}
            </div>
            {filteredProperties.length === 0 && <div className="empty-state">No properties match your search.</div>}
          </div>
        </section>

        <section className="services section-soft" id="services"><div className="container"><p className="eyebrow dark">WHAT WE DO</p><h2>Complete property solutions</h2><div className="service-grid"><article><div className="service-icon">⌂</div><h3>Buy Property</h3><p>Find homes, plots, apartments and commercial spaces that match your requirements.</p></article><article><div className="service-icon">₹</div><h3>Sell Property</h3><p>Get your property presented to genuine buyers with professional assistance.</p></article><article><div className="service-icon">↗</div><h3>Rent &amp; Lease</h3><p>Residential and commercial rental options across Faridabad.</p></article><article><div className="service-icon">▦</div><h3>Commercial</h3><p>Shops, offices, showrooms and other commercial opportunities.</p></article></div></div></section>

        <section className="about section" id="about"><div className="container about-grid"><div className="about-image"><div className="about-badge"><strong>SKP</strong><span>Real Estate</span></div></div><div><p className="eyebrow dark">ABOUT SKP</p><h2>Your local property partner in Faridabad.</h2><p>SKP Real Estate helps buyers, sellers, landlords and tenants discover property opportunities across Faridabad. Our focus is straightforward communication, useful property options and a smooth enquiry process.</p><div className="stats"><div><strong>4+</strong><span>Property Categories</span></div><div><strong>24/7</strong><span>Enquiry Support</span></div><div><strong>1</strong><span>Local Focus</span></div></div></div></div></section>

        <section className="cta"><div className="container cta-inner"><div><p className="eyebrow">READY TO MOVE?</p><h2>Tell us what property you need.</h2></div><a className="btn light" href={`https://wa.me/${whatsappNumber}?text=Hello%20SKP%20Real%20Estate%2C%20I%20want%20help%20finding%20a%20property.`} target="_blank" rel="noreferrer">Chat on WhatsApp →</a></div></section>

        <section className="section contact" id="contact"><div className="container contact-grid"><div><p className="eyebrow dark">CONTACT</p><h2>Let&apos;s find your next property.</h2><p>Share your requirement and SKP Real Estate can get back to you.</p><div className="contact-info"><a href={`tel:+${whatsappNumber}`}><span>☎</span> +91 97286 69364</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><span>◉</span> WhatsApp us</a><div><span>⌖</span> Faridabad, Haryana</div></div></div><form onSubmit={submitEnquiry}><input name="name" required placeholder="Your name" /><input name="phone" required placeholder="Phone number" type="tel" /><select name="interest" defaultValue="Buying a property"><option>Buying a property</option><option>Selling a property</option><option>Renting a property</option><option>Commercial property</option></select><textarea name="message" rows="4" placeholder="Tell us your requirement" /><button className="btn dark-btn" type="submit">Send Enquiry on WhatsApp</button></form></div></section>
      </main>

      <footer><div className="container footer-inner"><div><a className="logo footer-logo" href="#home"><span>SKP</span><small>REAL ESTATE</small></a><p>Property solutions in Faridabad.</p></div><div><p>© {new Date().getFullYear()} SKP Real Estate. All rights reserved.</p></div></div></footer>
      <a className="floating-wa" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">◉</a>
    </>
  );
}
