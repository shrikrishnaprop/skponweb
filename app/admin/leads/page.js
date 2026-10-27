import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export default async function LeadsPage() {
  let leads = [];

  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    leads = data || [];
  } catch {
    leads = [];
  }

  return (
    <main className="propertiesPage">
      <header className="propertiesHeader">
        <div>
          <Link href="/admin" className="backLink">← Back to Dashboard</Link>
          <h1>Leads</h1>
          <p>Enquiries submitted from the website.</p>
        </div>
      </header>

      {leads.length === 0 ? (
        <section className="propertiesEmpty">
          <div className="emptyIcon">📩</div>
          <h2>No leads yet</h2>
          <p>When someone submits the contact form, they will show up here.</p>
        </section>
      ) : (
        <section className="propertiesTableWrap">
          <table className="propertiesTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Interest</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.interest}</td>
                  <td>{lead.message}</td>
                  <td>{lead.created_at ? new Date(lead.created_at).toLocaleString() : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
