"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const emptyForm = {
  title: "",
  type: "",
  listing_type: "",
  category: "residential",
  location: "",
  city: "Faridabad",
  price: "",
  bedrooms: "",
  area: "",
  description: "",
  image_url: "",
};

export default function PropertyForm({ mode = "create", propertyId, initialData }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const url = mode === "edit" ? `/api/properties/${propertyId}` : "/api/properties";
    const method = mode === "edit" ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error || "Could not save property.");
      return;
    }

    router.push("/admin/properties");
    router.refresh();
  }

  return (
    <form className="propertyForm" onSubmit={handleSubmit}>
      <div className="formSection">
        <h2>Basic Information</h2>
        <label>
          Property Title
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. 3 BHK Builder Floor in Sector 15" required />
        </label>
        <label>
          Property Type
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">Select property type</option>
            <option value="flat">Flat / Apartment</option>
            <option value="builder-floor">Builder Floor</option>
            <option value="house">Independent House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="shop">Shop</option>
            <option value="office">Office</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
        <label>
          Listing Type
          <select name="listing_type" value={form.listing_type} onChange={handleChange} required>
            <option value="">Select listing type</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
      </div>

      <div className="formSection">
        <h2>Location</h2>
        <label>
          Locality / Sector
          <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Sector 15" required />
        </label>
        <label>
          City
          <input type="text" name="city" value={form.city} onChange={handleChange} />
        </label>
      </div>

      <div className="formSection">
        <h2>Price & Details</h2>
        <label>
          Price
          <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="e.g. ₹85 Lakh" required />
        </label>
        <label>
          Bedrooms
          <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} min="0" placeholder="e.g. 3" />
        </label>
        <label>
          Area
          <input type="text" name="area" value={form.area} onChange={handleChange} placeholder="e.g. 1800 sq.ft." />
        </label>
        <label>
          Image URL
          <input type="url" name="image_url" value={form.image_url || ""} onChange={handleChange} placeholder="https://..." />
        </label>
      </div>

      <div className="formSection">
        <h2>Description</h2>
        <label>
          Property Description
          <textarea name="description" value={form.description} onChange={handleChange} rows="6" placeholder="Describe the property..." />
        </label>
      </div>

      {message && <p className="formMessage">{message}</p>}

      <div className="formActions">
        <Link href="/admin/properties" className="cancelBtn">Cancel</Link>
        <button type="submit" className="saveBtn" disabled={saving}>
          {saving ? "Saving..." : mode === "edit" ? "Update Property" : "Save Property"}
        </button>
      </div>
    </form>
  );
}
