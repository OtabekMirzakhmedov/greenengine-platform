import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tender } from "@shared/schema";

export default function Tenders() {
  const { data: tenders, isLoading } = useQuery<Tender[]>({
    queryKey: ["/api/tenders"],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero
        title="Tenders"
        description="Browse published tender notices, supporting documents, and procurement updates from the GREENENGINE project."
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-semibold text-foreground">Open Tender Notices</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              All published tenders are listed here dynamically from the admin panel, with attached documents ready for download.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-80 w-full" />
              ))}
            </div>
          ) : tenders && tenders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tenders.map((tender) => (
                <Link key={tender.id} href={`/tenders/${tender.slug}`}>
                  <Card className="group flex h-full cursor-pointer flex-col overflow-hidden border-0 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden bg-muted">
                      {tender.imageUrl ? (
                        <img
                          src={tender.imageUrl}
                          alt={tender.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-background to-muted">
                          <FileText className="h-10 w-10 text-primary/60" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <Badge className="bg-white/90 text-foreground hover:bg-white">
                          Tender
                        </Badge>
                        <Badge variant="secondary" className="bg-black/45 text-white">
                          {tender.attachments?.length ?? 0} file(s)
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(tender.publishedAt), "MMMM d, yyyy")}</span>
                      </div>
                      <CardTitle className="line-clamp-2 text-xl">{tender.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col justify-between">
                      <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                        {tender.excerpt || "Open this tender to review the full notice and attached files."}
                      </p>
                      <div className="mt-6">
                        <Button variant="outline" className="w-full justify-between">
                          View Tender
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed px-6 py-20 text-center">
              <h3 className="text-xl font-semibold text-foreground">No published tenders yet</h3>
              <p className="mt-3 text-muted-foreground">
                New tender opportunities will appear here as soon as they are published.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
