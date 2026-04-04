import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  FolderOpen,
  LogOut,
  ChevronRight,
  Shield,
  Newspaper,
  Images,
  Grid3X3,
  BriefcaseBusiness,
} from "lucide-react";

const brandLogoUrl = "/attached_assets/greenengine-logo-new.jpg";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      setLocation("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const sections = [
    {
      title: "Pages",
      icon: BookOpen,
      href: "/admin/pages",
      description: "Manage About and Passport pages",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Hero Slides",
      icon: Images,
      href: "/admin/hero-sections",
      description: "Homepage hero images and copy",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Activities",
      icon: Grid3X3,
      href: "/admin/activities",
      description: "Manage homepage cards, list page, and activity details",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/admin/events",
      description: "Project meetings and workshops",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Action Plans",
      icon: FileText,
      href: "/admin/action-plans",
      description: "Strategic implementation plans",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Community Plans",
      icon: FolderOpen,
      href: "/admin/community-plans",
      description: "Community development initiatives",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      title: "Partners",
      icon: Users,
      href: "/admin/partners",
      description: "Partner institutions information",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      title: "News",
      icon: Newspaper,
      href: "/admin/news",
      description: "Latest news, publishing status, and downloadable assets",
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
    {
      title: "Tenders",
      icon: BriefcaseBusiness,
      href: "/admin/tenders",
      description: "Tender notices, procurement files, and publish controls",
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-muted/30">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <img
                  src={brandLogoUrl}
                  alt="GREENENGINE Logo"
                  className="h-12 w-auto max-w-[180px] object-contain"
                />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">GREENENGINE CMS</h1>
                  <p className="text-sm text-muted-foreground">Content Management System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs">{user?.email}</span>
              </Badge>
              <Separator orientation="vertical" className="h-8" />
              <Link href="/">
                <Button variant="outline" size="sm" data-testid="button-view-site">
                  View Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-3 text-foreground">
            Welcome Back 👋
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage all GREENENGINE platform content from this centralized dashboard. 
            Select a section below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer group" data-testid={`card-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader className="pb-3">
                  <div className={`h-14 w-14 rounded-lg ${section.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <section.icon className={`h-7 w-7 ${section.color}`} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-background/60 backdrop-blur-sm border rounded-lg">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Administrator Access</h3>
              <p className="text-sm text-muted-foreground">
                You have full access to all content sections. Changes you make will be reflected on the public website immediately. 
                Please ensure all content follows the GREENENGINE guidelines and quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
