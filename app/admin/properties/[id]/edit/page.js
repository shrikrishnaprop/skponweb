import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import PropertyForm from "../../property-form";

export default async function EditPropertyPage({ params }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <main className="addPropertyPage">
      <header className="addPropertyHeader">
        <Link href="/admin/properties" className="backLink">← Back to Properties</Link>
        <h1>Edit Property</h1>
        <p>Update this listing.</p>
      </header>
      <PropertyForm
        mode="edit"
        propertyId={id}
        initialData={{
          title: property.title || "",
          type: property.type || "",
          listing_type: property.listing_type || "",
          category: property.category || "residential",
          location: property.location || "",
          city: property.city || "Faridabad",
          price: property.price || "",
          bedrooms: property.bedrooms ?? "",
          area: property.area || "",
          description: property.description || "",
          image_url: property.image_url || "",
        }}
      />
    </main>
  );
}
