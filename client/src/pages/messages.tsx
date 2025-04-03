import React from 'react';
import NavigationBar from '../components/navigation-bar';
import { useQuery } from '@tanstack/react-query';
import { Match } from '../types/animal';
import { formatDate } from '../utils/format';

export default function Messages() {
  const { data: matches, isLoading } = useQuery<Match[]>({
    queryKey: ["/api/matches"],
  });
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Messages</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : !matches || matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500">
              When you match with someone, you'll be able to chat with them here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map(match => (
              <div 
                key={match.id} 
                className="bg-white rounded-lg shadow p-4 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <img 
                  src={match.matchedUser.avatar} 
                  alt={match.matchedUser.name} 
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {match.matchedUser.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    No messages yet. Say hello!
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(new Date(match.createdAt))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <NavigationBar activePath="/messages" />
    </div>
  );
}