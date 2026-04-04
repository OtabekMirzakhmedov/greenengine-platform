import EditorialAdmin from "@/components/admin/EditorialAdmin";

export default function NewsAdmin() {
  return (
    <EditorialAdmin
      title="News Management"
      description="Create, publish, and organize project news with supporting files and visibility control."
      singularLabel="News Item"
      pluralLabel="News"
      endpoint="/api/news"
      adminEndpoint="/api/admin/news"
    />
  );
}
