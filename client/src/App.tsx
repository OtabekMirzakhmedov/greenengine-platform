import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/about/About";
import Goals from "@/pages/about/Goals";
import Activities from "@/pages/about/Activities";
import Management from "@/pages/about/Management";
import Passport from "@/pages/passport/Passport";
import MOOC from "@/pages/passport/MOOC";
import Storytelling from "@/pages/passport/Storytelling";
import Stories from "@/pages/Stories";
import StoryDetail from "@/pages/StoryDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import ActionPlans from "@/pages/ActionPlans";
import Infographics from "@/pages/Infographics";
import CommunityPlans from "@/pages/CommunityPlans";
import Partners from "@/pages/Partners";
import Login from "@/pages/Login";
import Dashboard from "@/pages/admin/Dashboard";
import InstitutionsAdmin from "@/pages/admin/InstitutionsAdmin";
import PagesAdmin from "@/pages/admin/PagesAdmin";
import EventsAdmin from "@/pages/admin/EventsAdmin";
import ActionPlansAdmin from "@/pages/admin/ActionPlansAdmin";
import InfographicsAdmin from "@/pages/admin/InfographicsAdmin";
import CommunityPlansAdmin from "@/pages/admin/CommunityPlansAdmin";
import PartnersAdmin from "@/pages/admin/PartnersAdmin";
import NewsAdmin from "@/pages/admin/NewsAdmin";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
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
            <Activities />
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

      <Route path="/passport/mooc">
        {() => (
          <PublicLayout>
            <MOOC />
          </PublicLayout>
        )}
      </Route>

      <Route path="/passport/storytelling">
        {() => (
          <PublicLayout>
            <Storytelling />
          </PublicLayout>
        )}
      </Route>

      <Route path="/stories">
        {() => (
          <PublicLayout>
            <Stories />
          </PublicLayout>
        )}
      </Route>

      <Route path="/stories/:slug">
        {() => (
          <PublicLayout>
            <StoryDetail />
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

      <Route path="/action-plans">
        {() => (
          <PublicLayout>
            <ActionPlans />
          </PublicLayout>
        )}
      </Route>

      <Route path="/infographics">
        {() => (
          <PublicLayout>
            <Infographics />
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

      <Route path="/login" component={Login} />

      <Route path="/admin">
        {() => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/institutions">
        {() => (
          <ProtectedRoute>
            <InstitutionsAdmin />
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

      <Route path="/admin/events">
        {() => (
          <ProtectedRoute>
            <EventsAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/action-plans">
        {() => (
          <ProtectedRoute>
            <ActionPlansAdmin />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/infographics">
        {() => (
          <ProtectedRoute>
            <InfographicsAdmin />
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
