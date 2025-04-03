import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Matches from "@/pages/matches";
import Profile from "@/pages/profile";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth-store";
import { apiRequest } from "./lib/queryClient";

function Router() {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, setUser } = useAuthStore();
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/current", {
          credentials: "include",
        });
        
        if (res.ok) {
          const user = await res.json();
          setUser(user);
        } else if (location !== "/") {
          // Redirect to home/login if not authenticated
          setLocation("/");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        if (location !== "/") {
          setLocation("/");
        }
      }
    };
    
    checkAuth();
  }, [setUser, location, setLocation]);
  
  // If user is authenticated, we redirect from / to /home
  useEffect(() => {
    if (isAuthenticated && location === "/") {
      setLocation("/home");
    }
  }, [isAuthenticated, location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/matches" component={Matches} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
