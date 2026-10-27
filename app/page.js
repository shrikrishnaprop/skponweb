// SKP-NextJS\app\page.js
import HomeView from "./home-view";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { FALLBACK_PROPERTIES, toPublicProperty } from "@/lib/property-utils";

export const dynamic = "force-dynamic";

async function getProperties() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return FALLBACK_PROPERTIES;
    }

    return data.map(toPublicProperty);
  } catch {
    return FALLBACK_PROPERTIES;
  }
}

export default async function Home() {
  const properties = await getProperties();
  return <HomeView properties={properties} />;
}
