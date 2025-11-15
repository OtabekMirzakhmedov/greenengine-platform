import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { MapPin, ExternalLink } from "lucide-react";
import type { Institution } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Stories() {
  const { data: institutions, isLoading } = useQuery<Institution[]>({
    queryKey: ["/api/institutions"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Stories of GREENENGINE"
        description="Discover the unique contributions and achievements of our partner institutions"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Partner Institution Stories</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each of our partner institutions brings unique perspectives, expertise, and commitment to the GREENENGINE project. Explore their stories, achievements, and contributions to intercultural education.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-48 w-full mb-4 rounded-md" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : institutions && institutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutions.map((institution) => (
                <Link key={institution.id} href={`/stories/${institution.slug}`}>
                  <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-institution-${institution.slug}`}>
                    {institution.heroImageUrl && (
                      <div className="relative h-48 overflow-hidden rounded-t-md">
                        <img
                          src={institution.heroImageUrl}
                          alt={institution.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      {institution.logoUrl && (
                        <div className="h-12 mb-4">
                          <img
                            src={institution.logoUrl}
                            alt={`${institution.name} logo`}
                            className="h-full object-contain"
                          />
                        </div>
                      )}
                      <CardTitle className="text-xl leading-tight">{institution.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4" />
                        {institution.country}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {institution.description || "Explore this institution's contribution to the GREENENGINE project."}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-medium mt-4">
                        <span className="text-sm">Read Story</span>
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
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Institution Stories Yet</h3>
                <p className="text-muted-foreground">
                  Institution stories will appear here once they are added by administrators.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
