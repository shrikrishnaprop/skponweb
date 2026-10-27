import { getSupabaseAdmin } from "@/lib/supabase-server";
import PropertiesManager from "./properties-manager";

export default async function PropertiesPage() {
  let properties = [];

  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    properties = data || [];
  } catch {
    properties = [];
  }

  return <PropertiesManager properties={properties} />;
}
