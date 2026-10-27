import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-server";

async function getStats() {
  try {
    const supabase = getSupabaseAdmin();
    const [{ data: properties }, { data: leads }] = await Promise.all([
      supabase.from("properties").select("id, listing_type"),
      supabase.from("leads").select("id"),
    ]);

    const list = properties || [];
    return {
      properties: list.length,
      leads: (leads || []).length,
      sale: list.filter((item) => item.listing_type === "sale").length,
      rent: list.filter((item) => item.listing_type === "rent").length,
    };
  } catch {
    return { properties: 0, leads: 0, sale: 0, rent: 0 };
  }
}

export default async function AdminPage() {
  const user = await currentUser();
  const stats = await getStats();
  const firstName = user?.firstName || "Admin";
  const email = user?.emailAddresses?.[0]?.emailAddress || "";

  return (
    <main className="adminPage">
      <header className="adminHeader">
        <div>
          <h1>SKP Admin</h1>
          <p>Property Management Dashboard</p>
        </div>

        <div className="adminUser">
          <div>
            <strong>{firstName}</strong>
            <span>{email}</span>
          </div>
          <UserButton />
        </div>
      </header>

      <section className="adminContent">
        <h2>Dashboard</h2>
        <p className="welcome">Welcome back, {firstName}.</p>

        <div className="statsGrid">
          <div className="statCard">
            <span>🏠</span>
            <div>
              <p>Properties</p>
              <h3>{stats.properties}</h3>
            </div>
          </div>
          <div className="statCard">
            <span>📩</span>
            <div>
              <p>Leads</p>
              <h3>{stats.leads}</h3>
            </div>
          </div>
          <div className="statCard">
            <span>🏷️</span>
            <div>
              <p>For Sale</p>
              <h3>{stats.sale}</h3>
            </div>
          </div>
          <div className="statCard">
            <span>🔑</span>
            <div>
              <p>For Rent</p>
              <h3>{stats.rent}</h3>
            </div>
          </div>
        </div>

        <div className="adminCards">
          <div className="adminCard">
            <div className="cardIcon">🏠</div>
            <h3>Properties</h3>
            <p>Add, edit and manage all your property listings.</p>
            <Link href="/admin/properties" className="adminCardLink">View Properties</Link>
            <Link href="/admin/properties/add" className="adminCardLink">Add Property</Link>
          </div>
          <div className="adminCard">
            <div className="cardIcon">📩</div>
            <h3>Leads</h3>
            <p>View and manage enquiries from your customers.</p>
            <Link href="/admin/leads" className="adminCardLink">View Leads</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
