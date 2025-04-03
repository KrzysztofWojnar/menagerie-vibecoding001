import { useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/navigation-bar";
import { useAuthStore } from "@/store/auth-store";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Animal } from "@/types/animal";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Profile() {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, user, clearUser } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout", {});
      return res.json();
    },
    onSuccess: () => {
      clearUser();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      setLocation("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to logout: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="bg-white py-3 px-4 flex justify-between items-center shadow-sm">
        <button 
          className="text-dark p-2" 
          onClick={() => setLocation("/home")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="font-bold text-lg">Profile</h2>
        <div className="w-10"></div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              <img 
                src={user.avatar} 
                alt={`${user.name}'s profile`} 
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </button>
            </div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.species}, {user.age}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-dark mb-3">About Me</h3>
            <p className="text-gray-600">{user.bio || `I'm a ${user.species} looking for friends!`}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-dark mb-3">I'm interested in</h3>
            <div className="flex flex-wrap gap-2">
              {user.speciesPreferences.map((species, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {species}
                </span>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full py-3 rounded-xl font-semibold my-4"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Log Out"}
          </Button>
        </div>
      </ScrollArea>
      
      <NavigationBar activePath={location} />
    </div>
  );
}
