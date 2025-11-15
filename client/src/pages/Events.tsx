import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, MapPin, Image, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Project Events"
        description="International meetings, workshops, and collaborative activities"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">GREENENGINE Meetings & Workshops</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our series of international events bringing together partner institutions for collaboration, knowledge exchange, and project development.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                  <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-event-${event.slug}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="font-medium">
                          {format(new Date(event.date), "MMM d, yyyy")}
                        </Badge>
                        {event.photoCount && event.photoCount > 0 && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Image className="h-4 w-4" />
                            <span>{event.photoCount}</span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl leading-tight">{event.title}</CardTitle>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                        {event.overview || "Explore details, agenda, and photos from this event."}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span className="text-sm">View Details</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Events Yet</h3>
                <p className="text-muted-foreground">
                  Project events will appear here as they are scheduled and documented.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
