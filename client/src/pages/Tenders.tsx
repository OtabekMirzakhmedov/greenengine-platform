import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowRight, Calendar, FileText, Leaf, Sprout } from "lucide-react";
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
      <section className="relative overflow-hidden border-b border-primary/10 bg-[linear-gradient(180deg,#f3f8f4_0%,#eef6ef_52%,#f9fcf9_100%)] py-18 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(107,160,112,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(163,201,151,0.16),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <Leaf className="h-4 w-4" />
                Sustainable Procurement
              </div>
              <h1 className="text-4xl font-bold tracking-[-0.03em] text-foreground md:text-5xl lg:text-6xl">
                Tenders
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Access official tender notices, procurement opportunities, and supporting documents published under the GREENENGINE project.
              </p>
            </div>

            <div className="rounded-[2rem] border border-primary/10 bg-white/86 p-6 shadow-[0_24px_70px_rgba(25,58,40,0.08)] backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Sprout className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">Open Tender Notices</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Published opportunities are listed below with their latest documents, dates, and full notice details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 bg-[linear-gradient(180deg,#f8fbf8_0%,#ffffff_100%)] py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-[-0.02em] text-foreground">Open Tender Notices</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                All published tender notices are displayed here dynamically from the admin panel, with documents ready for review and download.
              </p>
            </div>
            {tenders && tenders.length > 0 ? (
              <div className="inline-flex rounded-full border border-primary/10 bg-secondary/35 px-4 py-2 text-sm font-medium text-primary">
                {tenders.length} active {tenders.length === 1 ? "tender" : "tenders"}
              </div>
            ) : null}
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-[26rem] w-full rounded-[1.75rem]" />
              ))}
            </div>
          ) : tenders && tenders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tenders.map((tender) => (
                <Link key={tender.id} href={`/tenders/${tender.slug}`}>
                  <Card className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)] shadow-[0_16px_44px_rgba(25,58,40,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(25,58,40,0.12)]">
                    <div className="relative h-56 overflow-hidden bg-muted">
                      {tender.imageUrl ? (
                        <img
                          src={tender.imageUrl}
                          alt={tender.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#edf5ee_0%,#f7faf7_55%,#e9f1e8_100%)]">
                          <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-primary/10 bg-white/85 shadow-sm">
                            <FileText className="h-10 w-10 text-primary/60" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/55 via-emerald-950/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                        <Badge className="border-0 bg-white/92 text-foreground hover:bg-white">
                          Tender
                        </Badge>
                        <Badge variant="secondary" className="bg-emerald-950/60 text-white">
                          {tender.attachments?.length ?? 0} file(s)
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="space-y-4 pb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{format(new Date(tender.publishedAt), "MMMM d, yyyy")}</span>
                      </div>
                      <CardTitle className="line-clamp-2 text-xl">{tender.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col justify-between">
                      <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                        {tender.excerpt || "Open this tender to review the full notice and attached files."}
                      </p>
                      <div className="mt-6">
                        <Button variant="outline" className="w-full justify-between rounded-full border-primary/15 bg-white hover:bg-primary hover:text-primary-foreground">
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
            <div className="flex min-h-[24rem] items-center justify-center">
              <div className="max-w-xl rounded-[2rem] border border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f6faf6_100%)] px-8 py-14 text-center shadow-[0_24px_70px_rgba(25,58,40,0.08)]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-secondary text-primary shadow-sm">
                  <Sprout className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  No tenders available at the moment
                </h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Tender opportunities and procurement notices will appear here once they are published by the project team.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
