import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Mail, MapPin, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Partner } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import heroImage from "@assets/stock_images/international_cooper_13d95da6.jpg";

// Placeholder images for partners
import university1 from "@assets/stock_images/university_building__06a72c16.jpg";
import university2 from "@assets/stock_images/university_building__66575053.jpg";
import university3 from "@assets/stock_images/university_building__b8846995.jpg";
import university4 from "@assets/stock_images/university_building__3c798553.jpg";
import university5 from "@assets/stock_images/university_building__e8834c0d.jpg";
import technical1 from "@assets/stock_images/technical_university_ba758916.jpg";
import technical2 from "@assets/stock_images/technical_university_029ce668.jpg";
import technical3 from "@assets/stock_images/technical_university_1d5655ee.jpg";
import research1 from "@assets/stock_images/research_institute_l_54bd77de.jpg";
import research2 from "@assets/stock_images/research_institute_l_ca287ff3.jpg";
import research3 from "@assets/stock_images/research_institute_l_a46a7ac3.jpg";

const placeholderImages = [
  university1,
  university2,
  university3,
  university4,
  university5,
  technical1,
  technical2,
  technical3,
  research1,
  research2,
  research3
];

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-48 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : partners && partners.length > 0 ? (
            <div className="space-y-8">
              {/* Group partners by country */}
              {["Uzbekistan", "Georgia", "Turkey", "Greece", "Italy"].map((country) => {
                const countryPartners = partners.filter(p => p.country === country);
                if (countryPartners.length === 0) return null;

                return (
                  <div key={country} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">{country}</h2>
                      <Badge variant="secondary">{countryPartners.length} {countryPartners.length === 1 ? 'Partner' : 'Partners'}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {countryPartners.map((partner, index) => (
                        <Card key={partner.id} className="hover-elevate overflow-hidden" data-testid={`card-partner-${partner.id}`}>
                          <div className="relative h-48 bg-muted overflow-hidden">
                            <img
                              src={partner.logoUrl || placeholderImages[index % placeholderImages.length]}
                              alt={partner.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <CardHeader>
                            <CardTitle className="text-xl leading-tight">{partner.name}</CardTitle>
                            {partner.pic && (
                              <p className="text-sm text-muted-foreground">PIC: {partner.pic}</p>
                            )}
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            {partner.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {partner.description}
                              </p>
                            )}

                            <Separator />

                            <div className="space-y-3">
                              {partner.address && (
                                <div className="flex gap-3 text-sm">
                                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                  <p className="text-muted-foreground">{partner.address}</p>
                                </div>
                              )}
                              
                              {partner.phone && (
                                <div className="flex gap-3 text-sm">
                                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                  <a 
                                    href={`tel:${partner.phone}`} 
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    data-testid={`link-phone-${partner.id}`}
                                  >
                                    {partner.phone}
                                  </a>
                                </div>
                              )}
                              
                              {partner.email && (
                                <div className="flex gap-3 text-sm">
                                  <Mail className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                  <a 
                                    href={`mailto:${partner.email}`} 
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    data-testid={`link-email-${partner.id}`}
                                  >
                                    {partner.email}
                                  </a>
                                </div>
                              )}
                            </div>

                            {partner.websiteUrl && (
                              <Button variant="outline" className="w-full" asChild data-testid={`button-website-${partner.id}`}>
                                <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Visit Website
                                </a>
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
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
