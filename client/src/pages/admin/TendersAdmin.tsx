import EditorialAdmin from "@/components/admin/EditorialAdmin";

export default function TendersAdmin() {
  return (
    <EditorialAdmin
      title="Tender Publishing"
      description="Manage procurement notices, publish live tenders, and attach downloadable documents for the public Tenders page."
      singularLabel="Tender"
      pluralLabel="Tenders"
      endpoint="/api/tenders"
      adminEndpoint="/api/admin/tenders"
      sectionLabel="Public Tender Feed"
      highlights={[
        "Published tenders appear on the public Tenders page immediately after save or refresh.",
        "Uploaded files are exposed as downloadable tender materials on the public website.",
        "Draft tenders stay hidden from visitors until they are published.",
        "Newest published notices are shown first by default in both admin and public views.",
      ]}
    />
  );
}
