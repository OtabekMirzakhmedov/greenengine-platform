import EditorialAdmin from "@/components/admin/EditorialAdmin";

export default function TendersAdmin() {
  return (
    <EditorialAdmin
      title="Tender Management"
      description="Manage procurement notices, publish live tenders, and attach downloadable documents."
      singularLabel="Tender"
      pluralLabel="Tenders"
      endpoint="/api/tenders"
      adminEndpoint="/api/admin/tenders"
    />
  );
}
