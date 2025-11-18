import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Partner } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@assets/stock_images/international_cooper_13d95da6.jpg";

export default function Partners() {
  const { data: partners, isLoading } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Project Partners"
        description="Collaborating institutions advancing intercultural education across three continents"
        imageUrl={heroImage}
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              GREENENGINE brings together leading universities and institutions from Central Asia, Georgia, and Europe to advance intercultural competence and sustainable development in higher education.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : partners && partners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} className="h-full flex flex-col" data-testid={`card-partner-${partner.id}`}>
                  <CardHeader className="flex-1">
                    {partner.logoUrl && (
                      <div className="h-20 mb-4 flex items-center justify-center">
                        <img
                          src={partner.logoUrl}
                          alt={`${partner.name} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <CardTitle className="text-xl leading-tight text-center">{partner.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {partner.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed text-center">
                        {partner.description}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      {partner.websiteUrl && (
                        <Button variant="outline" size="sm" className="w-full" asChild data-testid={`button-website-${partner.id}`}>
                          <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                      {partner.contactEmail && (
                        <Button variant="outline" size="sm" className="w-full" asChild data-testid={`button-email-${partner.id}`}>
                          <a href={`mailto:${partner.contactEmail}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Partner Information Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed partner information will be available shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
