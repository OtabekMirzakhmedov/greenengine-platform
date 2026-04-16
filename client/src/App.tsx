import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/ModernFooter";
import Home from "@/pages/Home";
import ActivitiesPage from "@/pages/Activities";
import ActivityDetail from "@/pages/ActivityDetail";
import About from "@/pages/about/About";
import Goals from "@/pages/about/Goals";
import Management from "@/pages/about/Management";
import Passport from "@/pages/passport/Passport";
import PassportSectionPage from "@/pages/passport/PassportSectionPage";
import PassportStoryDetail from "@/pages/passport/PassportStoryDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import CommunityPlans from "@/pages/CommunityPlans";
import Partners from "@/pages/Partners";
import NewsPage from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import TendersPage from "@/pages/Tenders";
import TenderDetail from "@/pages/TenderDetail";
import Login from "@/pages/Login";
import Dashboard from "@/pages/admin/Dashboard";
import ActivitiesAdmin from "@/pages/admin/ActivitiesAdmin";
import HeroSectionsAdmin from "@/pages/admin/HeroSectionsAdmin";
import PagesAdmin from "@/pages/admin/PagesAdmin";
import PassportSectionsAdmin from "@/pages/admin/PassportSectionsAdmin";
import PassportStoriesAdmin from "@/pages/admin/PassportStoriesAdmin";
import EventsAdmin from "@/pages/admin/EventsAdmin";
import CommunityPlansAdmin from "@/pages/admin/CommunityPlansAdmin";
import PartnersAdmin from "@/pages/admin/PartnersAdmin";
import NewsAdmin from "@/pages/admin/NewsAdmin";
import TendersAdmin from "@/pages/admin/TendersAdmin";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <PublicLayout>
            <Home />
          </PublicLayout>
        )}
      </Route>

      <Route path="/about">
        {() => (
          <PublicLayout>
            <About />
          </PublicLayout>
        )}
      </Route>

      <Route path="/about/goals">
        {() => (
          <PublicLayout>
            <Goals />
          </PublicLayout>
        )}
      </Route>

      <Route path="/about/activities">
        {() => (
          <PublicLayout>
            <ActivitiesPage />
          </PublicLayout>
        )}
      </Route>

      <Route path="/activities">
        {() => (
          <PublicLayout>
            <ActivitiesPage />
          </PublicLayout>
        )}
      </Route>

      <Route path="/activities/:slug">
        {() => (
          <PublicLayout>
            <ActivityDetail />
          </PublicLayout>
        )}
      </Route>

      <Route path="/about/management">
        {() => (
          <PublicLayout>
            <Management />
          </PublicLayout>
        )}
      </Route>

      <Route path="/passport">
        {() => (
          <PublicLayout>
            <Passport />
          </PublicLayout>
        )}
      </Route>

      <Route path="/passport/:sectionSlug/stories/:storySlug">
        {() => (
          <PublicLayout>
            <PassportStoryDetail />
          </PublicLayout>
        )}
      </Route>

      <Route path="/passport/:slug">
        {() => (
          <PublicLayout>
            <PassportSectionPage />
          </PublicLayout>
        )}
      </Route>

      <Route path="/events">
        {() => (
          <PublicLayout>
            <Events />
          </PublicLayout>
        )}
      </Route>

      <Route path="/events/:slug">
        {() => (
          <PublicLayout>
            <EventDetail />
          </PublicLayout>
        )}
      </Route>

      <Route path="/community-plans">
        {() => (
          <PublicLayout>
            <CommunityPlans />
          </PublicLayout>
        )}
      </Route>

      <Route path="/partners">
        {() => (
          <PublicLayout>
            <Partners />
          </PublicLayout>
        )}
      </Route>

      <Route path="/news">
        {() => (
          <PublicLayout>
            <NewsPage />
          </PublicLayout>
        )}
      </Route>

      <Route path="/news/:slug">
        {() => (
          <PublicLayout>
            <NewsDetail />
          </PublicLayout>
        )}
      </Route>

      <Route path="/tenders">
        {() => (
          <PublicLayout>
            <TendersPage />
          </PublicLayout>
        )}
      </Route>

      <Route path="/tenders/:slug">
        {() => (
          <PublicLayout>
            <TenderDetail />
          </PublicLayout>
        )}
      </Route>

      <Route path="/login" component={Login} />

      <Route path="/admin">
        {() => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/hero-sections">
        {() => (
          <ProtectedRoute>
            <HeroSectionsAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/activities">
        {() => (
          <ProtectedRoute>
            <ActivitiesAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/pages">
        {() => (
          <ProtectedRoute>
            <PagesAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/passport-sections">
        {() => (
          <ProtectedRoute>
            <PassportSectionsAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/passport-stories">
        {() => (
          <ProtectedRoute>
            <PassportStoriesAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/events">
        {() => (
          <ProtectedRoute>
            <EventsAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/community-plans">
        {() => (
          <ProtectedRoute>
            <CommunityPlansAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/partners">
        {() => (
          <ProtectedRoute>
            <PartnersAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/news">
        {() => (
          <ProtectedRoute>
            <NewsAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/tenders">
        {() => (
          <ProtectedRoute>
            <TendersAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
