import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Match } from "../types/animal";
import { useQuery } from "@tanstack/react-query";

interface NavigationBarProps {
  activePath: string;
}

export default function NavigationBar({ activePath }: NavigationBarProps) {
  const [_, setLocation] = useLocation();
  const [hasNewMatches, setHasNewMatches] = useState(false);
  
  // Fetch matches to see if there are any new ones
  const { data: matches } = useQuery<Match[]>({
    queryKey: ["/api/matches"],
  });
  
  useEffect(() => {
    if (matches && matches.length > 0) {
      // Check if there are matches from the last 24 hours
      const hasNew = matches.some(match => {
        const createdAt = new Date(match.createdAt);
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return createdAt > oneDayAgo;
      });
      
      setHasNewMatches(hasNew);
    }
  }, [matches]);

  return (
    <div className="bg-white py-3 px-6 flex justify-between items-center shadow-lg border-t border-gray-100">
      <button 
        className={`p-2 ${activePath === "/home" ? "text-primary" : "text-gray-400 hover:text-primary"}`}
        onClick={() => setLocation("/home")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 5.5 9 3 3 5.5V19l6-2.5 6 2.5 6-2.5V5l-6-2.5Z"/><path d="M9 3v17"/><path d="M15 5.5v16.5"/></svg>
      </button>
      
      <div className="relative">
        <button 
          className={`p-2 ${activePath === "/matches" ? "text-primary" : "text-gray-400 hover:text-primary"}`}
          onClick={() => setLocation("/matches")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={activePath === "/matches" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
        {hasNewMatches && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        )}
      </div>
      
      <button 
        className={`p-2 ${activePath === "/messages" ? "text-primary" : "text-gray-400 hover:text-primary"}`}
        onClick={() => setLocation("/matches")}  // Temporarily point to matches
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
      </button>
      
      <button 
        className={`p-2 ${activePath === "/profile" ? "text-primary" : "text-gray-400 hover:text-primary"}`}
        onClick={() => setLocation("/profile")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          {/* Fox Head Icon */}
          <path d="M7 9.5l-3.5-3c-.83-.83-.83-2.17 0-3 .62-.62 1.57-.77 2.35-.37C6.76 3.5 7.93 4 9 4h6c1.07 0 2.24-.5 3.15-.87.78-.4 1.73-.25 2.35.37.83.83.83 2.17 0 3L17 9.5" />
          <path d="M11 6v4c0 1.1.9 2 2 2s2-.9 2-2V6" />
          <path d="M7 6v4c0 1.1.9 2 2 2s2-.9 2-2V6" />
          <path d="M9 12.5v2.33c0 .59-.27 1.12-.7 1.47l-1.8 1.5C5.67 18.5 5 19.62 5 20.8V21h14v-.2c0-1.18-.67-2.3-1.5-3l-1.8-1.5c-.43-.35-.7-.88-.7-1.47V12.5" />
          <path d="M16 2l-1 2m-7-2l1 2" />
          <circle cx="9" cy="9" r="1" />
          <circle cx="15" cy="9" r="1" />
        </svg>
      </button>
    </div>
  );
}
