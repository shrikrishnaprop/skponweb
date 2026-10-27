import Link from "next/link";
import PropertyForm from "../property-form";

export default function AddPropertyPage() {
  return (
    <main className="addPropertyPage">
      <header className="addPropertyHeader">
        <Link href="/admin/properties" className="backLink">← Back to Properties</Link>
        <h1>Add Property</h1>
        <p>Create a new property listing.</p>
      </header>
      <PropertyForm mode="create" />
    </main>
  );
}
