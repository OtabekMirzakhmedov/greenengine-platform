import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Download, User } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Activity } from "@shared/schema";

export default function ActivityDetail() {
  const [, params] = useRoute("/activities/:slug");
  const slug = params?.slug;

  const { data: activity, isLoading } = useQuery<Activity>({
    queryKey: ["/api/activities/slug", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const response = await fetch(`/api/activities/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Activity not found");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="h-[40vh] min-h-[300px] animate-pulse bg-muted" />
        <div className="flex-1 py-12 md:py-16">
          <div className="mx-auto max-w-4xl space-y-6 px-6 lg:px-8">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex min-h-screen flex-col">
        <PageHero title="Activity Not Found" description="The activity you're looking for doesn't exist" />
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Activity Not Available</h2>
            <p className="mb-6 text-muted-foreground">This activity could not be found.</p>
            <Link href="/activities">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Activities
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero title={activity.title} imageUrl={activity.imageUrl} />

      <div className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/activities">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Activities
              </Button>
            </Link>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{format(new Date(activity.publishedAt), "MMMM d, yyyy")}</span>
            </div>
            {activity.author ? (
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{activity.author}</span>
              </div>
            ) : null}
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg italic leading-relaxed text-muted-foreground">{activity.description}</p>
            </CardContent>
          </Card>

          {activity.content ? (
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none whitespace-pre-line text-foreground leading-relaxed">
                  {activity.content}
                </div>
              </CardContent>
            </Card>
          ) : null}

          {activity.gallery && activity.gallery.length > 0 ? (
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">Gallery</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activity.gallery.map((imageUrl, index) => (
                    <div key={`${imageUrl}-${index}`} className="aspect-video overflow-hidden rounded-md bg-muted">
                      <img src={imageUrl} alt={`${activity.title} ${index + 1}`} className="h-full w-full object-cover transition-transform hover:scale-105" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}

          {activity.attachments && activity.attachments.length > 0 ? (
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">Attachments</h2>
                <div className="space-y-4">
                  {activity.attachments.map((attachment, index) => (
                    <div key={`${attachment.url}-${index}`} className="flex items-center justify-between rounded-md bg-muted/50 p-4 hover-elevate" data-testid={`activity-attachment-${index}`}>
                      <div>
                        <div className="font-medium text-foreground">{attachment.name}</div>
                        <div className="text-sm text-muted-foreground">{attachment.size}</div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={attachment.url} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
