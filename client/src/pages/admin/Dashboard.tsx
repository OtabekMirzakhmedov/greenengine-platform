import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  BarChart3,
  FolderOpen,
  Building2,
  LogOut,
} from "lucide-react";

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
    },
    {
      title: "Institutions",
      icon: Building2,
      href: "/admin/institutions",
      description: "Institution stories and profiles",
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/admin/events",
      description: "Project meetings and workshops",
    },
    {
      title: "Action Plans",
      icon: FileText,
      href: "/admin/action-plans",
      description: "Strategic implementation plans",
    },
    {
      title: "Infographics",
      icon: BarChart3,
      href: "/admin/infographics",
      description: "Visual reports and data",
    },
    {
      title: "Community Plans",
      icon: FolderOpen,
      href: "/admin/community-plans",
      description: "Community development initiatives",
    },
    {
      title: "Partners",
      icon: Users,
      href: "/admin/partners",
      description: "Partner institutions information",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">GREENENGINE CMS</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
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
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2 text-foreground">Content Management</h2>
          <p className="text-muted-foreground">
            Manage all GREENENGINE platform content from this dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
