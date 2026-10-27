// C:\skpweb\SKP-NextJS\lib\property-utils.js
export const FALLBACK_PROPERTIES = [
  { id: "demo-1", title: "srs royAl Hills 2+1 bhk Apartment", price: "Price on Request", type: "sale", category: "residential", location: "SRS Royal Hills, Sector 87, Faridabad", beds: "2+1 BHK", area: "1,133 sq.ft", img: "/images/properties/srs-royal-hills-2plus1-b1-1133.png" },
  { id: "demo-2", title: "modern 3 bhk builder floor", price: "₹78 Lakh", type: "sale", category: "residential", location: "Sector 15, Faridabad", beds: "3 BHK", area: "1,850 sq.ft", img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80" },
  { id: "demo-3", title: "Premium 2 BHK Apartment", price: "₹22,000 / month", type: "rent", category: "residential", location: "Sector 21C, Faridabad", beds: "2 BHK", area: "1,250 sq.ft", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80" },
  { id: "demo-4", title: "Commercial Showroom", price: "₹1.45 Cr", type: "sale", category: "commercial", location: "Mathura Road, Faridabad", beds: "Ground Floor", area: "1,900 sq.ft", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80" },
  { id: "demo-5", title: "Independent 4 BHK House", price: "₹1.25 Cr", type: "sale", category: "residential", location: "Sector 16, Faridabad", beds: "4 BHK", area: "2,700 sq.ft", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80" },
  { id: "demo-6", title: "Office Space", price: "₹45,000 / month", type: "rent", category: "commercial", location: "Sector 12, Faridabad", beds: "Office", area: "1,600 sq.ft", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80" },
  { id: "demo-7", title: "Residential Plot", price: "₹65 Lakh", type: "sale", category: "residential", location: "Sector 89, Faridabad", beds: "Plot", area: "1,000 sq.ft", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80" },
];

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";

export function toPublicProperty(row) {
  const beds =
    row.bedrooms != null && row.bedrooms !== ""
      ? `${row.bedrooms} BHK`
      : row.type || "";

  return {
    id: row.id,
    title: row.title,
    price: row.price,
    type: row.listing_type,
    category: row.category || "residential",
    location: [row.location, row.city].filter(Boolean).join(", "),
    beds,
    area: row.area || "",
    img: row.image_url || DEFAULT_IMAGE,
  };
}

export function sanitizePropertyInput(body) {
  return {
    title: String(body.title || "").trim(),
    type: String(body.type || "").trim(),
    listing_type: String(body.listing_type || "").trim(),
    category: String(body.category || "residential").trim(),
    location: String(body.location || "").trim(),
    city: String(body.city || "Faridabad").trim(),
    price: String(body.price || "").trim(),
    bedrooms: body.bedrooms === "" || body.bedrooms == null ? null : Number(body.bedrooms),
    area: String(body.area || "").trim(),
    description: String(body.description || "").trim(),
    image_url: String(body.image_url || "").trim() || null,
  };
}

export function validateProperty(data) {
  if (!data.title || !data.type || !data.listing_type || !data.location || !data.price) {
    return "Title, type, listing type, location, and price are required.";
  }
  if (!["sale", "rent"].includes(data.listing_type)) {
    return "Listing type must be sale or rent.";
  }
  if (!["residential", "commercial"].includes(data.category)) {
    return "Category must be residential or commercial.";
  }
  return null;
}
