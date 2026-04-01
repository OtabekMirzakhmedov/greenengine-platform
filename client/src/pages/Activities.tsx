import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { format } from "date-fns";
import { Calendar, ExternalLink, Image as ImageIcon } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Activity } from "@shared/schema";
import heroImage from "@assets/stock_images/environmental_sustai_bb342fce.jpg";

export default function ActivitiesPage() {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Activities"
        description="Explore all GREENENGINE project activities, outputs, and collaborative initiatives"
        imageUrl={heroImage}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-semibold text-foreground">Project Activities</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Each activity item is managed from the admin panel and opens into its own detail page with full text, gallery content, and attached materials when available.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <Skeleton className="h-52 w-full rounded-t-md" />
                  <CardHeader>
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : activities && activities.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <Link key={activity.id} href={`/activities/${activity.slug}`}>
                  <Card className="h-full cursor-pointer overflow-hidden transition-all hover-elevate active-elevate-2" data-testid={`card-activity-${activity.slug}`}>
                    <div className="relative h-56 overflow-hidden bg-muted">
                      <img src={activity.imageUrl} alt={activity.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(activity.publishedAt), "MMM d, yyyy")}</span>
                      </div>
                      <CardTitle className="text-xl leading-tight">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 line-clamp-3 leading-relaxed text-muted-foreground">{activity.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {activity.gallery?.length ? <span className="rounded bg-muted px-2 py-1">{activity.gallery.length} images</span> : null}
                        {activity.attachments?.length ? <span className="rounded bg-muted px-2 py-1">{activity.attachments.length} attachments</span> : null}
                      </div>
                      <div className="flex items-center gap-2 font-medium text-primary">
                        <span className="text-sm">{activity.ctaText || "Read Activity"}</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No Activities Yet</h3>
                <p className="text-muted-foreground">
                  Activity items will appear here once they are created in the admin panel.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
