import EditorialAdmin from "@/components/admin/EditorialAdmin";

export default function NewsAdmin() {
  return (
    <EditorialAdmin
      title="Homepage News Management"
      description="Manage the single news feed used on the public News page and in the homepage 'Read the latest news' section."
      singularLabel="News Item"
      pluralLabel="News"
      endpoint="/api/news"
      adminEndpoint="/api/admin/news"
      sectionLabel="Homepage Section"
      highlights={[
        "Published news items appear automatically in the homepage news carousel.",
        "Use featured images, excerpts, and publish dates to keep the homepage section polished.",
        "Draft items stay hidden from visitors until they are published.",
        "Display order and publish date help control which stories feel most prominent.",
      ]}
    />
  );
}
