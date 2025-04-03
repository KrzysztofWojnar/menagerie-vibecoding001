import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import StatusBar from "@/components/status-bar";
import NavigationBar from "@/components/navigation-bar";
import { useAuthStore } from "@/store/auth-store";
import { Match } from "@/types/animal";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Matches() {
  const [location, setLocation] = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  // Fetch matches
  const { data: matches, isLoading } = useQuery<Match[]>({
    queryKey: ["/api/matches"],
    enabled: isAuthenticated,
  });

  // Separate new matches (last 7 days) and others
  const newMatches = matches?.filter(match => {
    const createdAt = new Date(match.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdAt > sevenDaysAgo;
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-background relative overflow-hidden px-4">
      <div className="bg-white py-3 px-4 -mx-4 flex justify-between items-center shadow-sm">
        <button 
          className="text-dark p-2" 
          onClick={() => setLocation("/home")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="font-bold text-lg">Your Matches</h2>
        <div className="w-10"></div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {/* New Matches Section */}
        <h3 className="text-dark text-lg font-semibold mb-3">New Matches</h3>
        {isLoading ? (
          <div className="flex space-x-3 pb-4 mb-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="w-16 h-4 mt-2" />
              </div>
            ))}
          </div>
        ) : newMatches && newMatches.length > 0 ? (
          <div className="flex space-x-3 overflow-x-auto pb-4 mb-6">
            {newMatches.map(match => (
              <div key={match.id} className="flex-shrink-0 w-20">
                <div className="relative">
                  <img 
                    src={match.matchedUser.avatar} 
                    alt={`${match.matchedUser.name}'s avatar`} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                </div>
                <p className="text-center text-sm mt-1 truncate">{match.matchedUser.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 mb-6">
            <p className="text-gray-500">No new matches yet</p>
          </div>
        )}
        
        {/* Messages Section */}
        <h3 className="text-dark text-lg font-semibold mb-3">Messages</h3>
        {isLoading ? (
          <div className="space-y-3">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="w-14 h-14 rounded-full mr-3" />
                <div className="flex-1">
                  <Skeleton className="w-24 h-4 mb-2" />
                  <Skeleton className="w-full h-3" />
                </div>
              </div>
            ))}
          </div>
        ) : matches && matches.length > 0 ? (
          <div className="space-y-3">
            {matches.map(match => (
              <div key={match.id} className="bg-white rounded-xl p-3 shadow-sm flex items-center">
                <img 
                  src={match.matchedUser.avatar} 
                  alt={`${match.matchedUser.name}'s avatar`} 
                  className="w-14 h-14 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold">{match.matchedUser.name}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(match.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm truncate">
                    {`${match.matchedUser.name} is a ${match.matchedUser.species}. Start a conversation!`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No matches yet. Keep swiping!</p>
          </div>
        )}
      </ScrollArea>
      
      <NavigationBar activePath={location} />
    </div>
  );
}
