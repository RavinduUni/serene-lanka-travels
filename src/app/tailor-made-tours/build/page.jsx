import { redirect } from "next/navigation";

/**
 * Existing "Customize This Tour" / "Build My Tour" buttons link here.
 * Forward them to the customize form, keeping any ?tour=<slug> prefill.
 */
export default async function BuildRedirect({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams(
    Object.entries(params || {}).filter(([, v]) => typeof v === "string")
  ).toString();
  redirect(`/tailor-made-tours${query ? `?${query}` : ""}`);
}
