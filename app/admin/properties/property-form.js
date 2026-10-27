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

export default function PropertyForm({
  mode = "create",
  propertyId,
  initialData,
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    ...emptyForm,
    ...initialData,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    initialData?.image_url || ""
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5 MB.");
      return;
    }

    setMessage("");
    setSelectedFile(file);

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
  }

  async function uploadImage() {
    if (!selectedFile) {
      return form.image_url || "";
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/properties/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not upload image.");
      }

      setForm((current) => ({
        ...current,
        image_url: result.url,
      }));

      setPreviewUrl(result.url);
      setSelectedFile(null);

      return result.url;
    } catch (error) {
      setMessage(error.message);
      return "";
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      let imageUrl = form.image_url || "";

      if (selectedFile) {
        imageUrl = await uploadImage();

        if (!imageUrl) {
          setSaving(false);
          return;
        }
      }

      const dataToSave = {
        ...form,
        image_url: imageUrl,
      };

      const url =
        mode === "edit"
          ? `/api/properties/${propertyId}`
          : "/api/properties";

      const method = mode === "edit" ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Could not save property.");
        setSaving(false);
        return;
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form className="propertyForm" onSubmit={handleSubmit}>
      <div className="formSection">
        <h2>Basic Information</h2>

        <label>
          Property Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. 3 BHK Builder Floor in Sector 15"
            required
          />
        </label>

        <label>
          Property Type
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
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
          <select
            name="listing_type"
            value={form.listing_type}
            onChange={handleChange}
            required
          >
            <option value="">Select listing type</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
      </div>

      <div className="formSection">
        <h2>Location</h2>

        <label>
          Locality / Sector
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Sector 15"
            required
          />
        </label>

        <label>
          City
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="formSection">
        <h2>Price & Details</h2>

        <label>
          Price
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. ₹85 Lakh"
            required
          />
        </label>

        <label>
          Bedrooms
          <input
            type="number"
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            min="0"
            placeholder="e.g. 3"
          />
        </label>

        <label>
          Area
          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="e.g. 1800 sq.ft."
          />
        </label>
      </div>

      <div className="formSection">
        <h2>Property Image</h2>

        <label>
          Upload Property Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <p style={{ fontSize: "13px", color: "#666" }}>
          JPG, PNG or WebP. Maximum size: 5 MB.
        </p>

        {previewUrl && (
          <div style={{ marginTop: "15px" }}>
            <p style={{ marginBottom: "8px", fontWeight: "600" }}>
              Image Preview
            </p>

            <img
              src={previewUrl}
              alt="Property preview"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "280px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        )}

        {uploading && (
          <p style={{ marginTop: "10px" }}>
            Uploading image...
          </p>
        )}
      </div>

      <div className="formSection">
        <h2>Description</h2>

        <label>
          Property Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="6"
            placeholder="Describe the property..."
          />
        </label>
      </div>

      {message && <p className="formMessage">{message}</p>}

      <div className="formActions">
        <Link href="/admin/properties" className="cancelBtn">
          Cancel
        </Link>

        <button
          type="submit"
          className="saveBtn"
          disabled={saving || uploading}
        >
          {saving
            ? "Saving..."
            : mode === "edit"
              ? "Update Property"
              : "Save Property"}
        </button>
      </div>
    </form>
  );
}