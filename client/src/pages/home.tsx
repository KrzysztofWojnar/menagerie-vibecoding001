import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import StatusBar from "@/components/status-bar";
import NavigationBar from "@/components/navigation-bar";
import ProfileCard from "@/components/profile-card";
import MatchNotification from "@/components/match-notification";
import { useAuthStore } from "@/store/auth-store";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useSwipe } from "@/hooks/use-swipe";
import { Animal, LikeResponse } from "@/types/animal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Home() {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, user, setUser } = useAuthStore();
  const { toast } = useToast();
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedAnimal, setMatchedAnimal] = useState<Animal | null>(null);

  // Form setup for login
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Fetch potential matches for swiping
  const { data: potentialMatches, isLoading: isLoadingMatches } = useQuery<Animal[]>({
    queryKey: ["/api/users/potential-matches"],
    enabled: isAuthenticated,
  });

  // Like mutation
  const likeMutation = useMutation<LikeResponse, Error, { likedId: number }>({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/likes", data);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/potential-matches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/matches"] });
      
      if (data.isMatch && data.matchedUser) {
        setMatchedAnimal(data.matchedUser);
        setShowMatchModal(true);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to like: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await apiRequest("POST", "/api/auth/login", data);
      return res.json();
    },
    onSuccess: (data) => {
      setUser(data);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  // Handle swipe actions
  const handleLike = (animal: Animal) => {
    likeMutation.mutate({ likedId: animal.id });
  };

  const handleDislike = () => {
    // Just remove the card, no API call needed for dislike
    queryClient.setQueryData<Animal[]>(
      ["/api/users/potential-matches"],
      (old) => old ? old.slice(1) : []
    );
  };

  // Use custom swipe hook
  const { currentIndex, swipeLeft, swipeRight } = useSwipe({
    items: potentialMatches || [],
    onSwipeLeft: handleDislike,
    onSwipeRight: handleLike,
  });

  // Login form display when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">PawSwipe</h1>
            <p className="text-center mb-6 text-gray-600">Find your perfect animal match!</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-sm text-center text-gray-500">
              <p>Use one of the demo accounts:</p>
              <p className="mt-1">username: fluffy, password: password</p>
              <p>username: max, password: password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-background relative overflow-hidden">
      <StatusBar />
      
      <div className="flex-1 p-4 overflow-hidden relative">
        <div className="relative h-full flex items-center justify-center">
          <AnimatePresence>
            {potentialMatches && potentialMatches.length > 0 ? (
              potentialMatches.map((animal, index) => (
                <ProfileCard
                  key={animal.id}
                  animal={animal}
                  isActive={index === currentIndex}
                  onSwipeLeft={swipeLeft}
                  onSwipeRight={() => swipeRight(animal)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <i className="text-6xl text-gray-300 mb-4">🐾</i>
                <h3 className="text-xl font-bold text-dark mb-2">No more profiles!</h3>
                <p className="text-gray-500 mb-6">We're working on finding your perfect animal match.</p>
                <Button
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/users/potential-matches"] })}
                >
                  Refresh
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center items-center space-x-4 mt-4 mb-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-14 w-14"
            onClick={swipeLeft}
            disabled={!potentialMatches || potentialMatches.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 w-6 h-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-12 w-12"
            disabled={!potentialMatches || potentialMatches.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-14 w-14"
            onClick={() => {
              if (potentialMatches && potentialMatches.length > 0) {
                swipeRight(potentialMatches[currentIndex]);
              }
            }}
            disabled={!potentialMatches || potentialMatches.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-6 h-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </Button>
        </div>
      </div>
      
      <NavigationBar activePath={location} />
      
      {showMatchModal && matchedAnimal && (
        <MatchNotification
          matchedAnimal={matchedAnimal}
          onClose={() => setShowMatchModal(false)}
          onSendMessage={() => {
            setShowMatchModal(false);
            setLocation("/matches");
          }}
        />
      )}
    </div>
  );
}
