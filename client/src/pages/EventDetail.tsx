import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function EventDetail() {
  const [, params] = useRoute("/events/:slug");
  const slug = params?.slug;

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const event = events?.find((evt) => evt.slug === slug);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="h-[40vh] min-h-[300px] bg-muted animate-pulse" />
        <div className="flex-1 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageHero title="Event Not Found" description="The event you're looking for doesn't exist" />
        <div className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Event Not Available</h2>
            <p className="text-muted-foreground mb-6">This event could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero title={event.title} />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 mb-8 justify-center text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            )}
            {event.attendeeCount && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{event.attendeeCount} attendees</span>
              </div>
            )}
          </div>

          {event.overview && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Overview</h2>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: event.overview }}
                />
              </CardContent>
            </Card>
          )}

          {event.agenda && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Agenda</h2>
                  {event.agendaPdfUrl && (
                    <Button variant="outline" size="sm" asChild data-testid="button-download-agenda">
                      <a href={event.agendaPdfUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  )}
                </div>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: event.agenda }}
                />
              </CardContent>
            </Card>
          )}

          {event.gallery && event.gallery.length > 0 && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.gallery.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-muted rounded-md overflow-hidden"
                      data-testid={`gallery-image-${index}`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${event.title} photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {event.documents && event.documents.length > 0 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Event Documents</h2>
                <div className="space-y-4">
                  {event.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover-elevate"
                      data-testid={`document-${index}`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Download className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">{doc.size}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild data-testid={`button-download-${index}`}>
                        <a href={doc.url} download>
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
