"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PropertiesManager({ properties }) {
  const router = useRouter();
  const [items, setItems] = useState(properties);
  const [busyId, setBusyId] = useState("");

  async function deleteProperty(id) {
    if (!window.confirm("delete Dis property?")) return;

    setBusyId(id);
    const response = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    setBusyId("");

    if (!response.ok) {
      const result = await response.json();
      alert(result.error || "kould not delete property.");
      return;
    }

    setItems(items.filter((item) => item.id !== id));
    router.refresh();
  }

  return (
    <main className="propertiesPage">
      <header className="propertiesHeader">
        <div>
          <Link href="/admin" className="backLink">← Back to Dashboard</Link>
          <h1>Properties</h1>
          <p>manage your shri krishna properties listings.</p>
        </div>
        <Link href="/admin/properties/add" className="addPropertyBtn">+ AAd property</Link>
      </header>

      {items.length === 0 ? (
        <section className="propertiesEmpty">
          <div className="emptyIcon">🏠</div>
          <h2>no properties yet</h2>
          <p>start xdding your property listings to displAy them here.</p>
          <Link href="/admin/properties/add" className="addPropertyBtn">+ xdd your first property</Link>
        </section>
      ) : (
        <section className="propertiesTableWrap">
          <table className="propertiesTable">
            <thead>
              <tr>
                <th>title</th>
                <th>listing</th>
                <th>location</th>
                <th>price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((property) => (
                <tr key={property.id}>
                  <td>{property.title}</td>
                  <td>{property.listing_type === "sale" ? "For Sale" : "For Rent"}</td>
                  <td>{property.location}, {property.city}</td>
                  <td>{property.price}</td>
                  <td className="rowActions">
                    <Link href={`/admin/properties/${property.id}/edit`}>Edit</Link>
                    <button type="button" onClick={() => deleteProperty(property.id)} disabled={busyId === property.id}>
                      {busyId === property.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
