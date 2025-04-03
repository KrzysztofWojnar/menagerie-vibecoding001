import React from 'react';
import { Animal } from '../types/animal';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '../components/ui/dialog';
import { formatNameAndAge } from '../utils/format';

interface MatchNotificationProps {
  matchedAnimal: Animal;
  onClose: () => void;
  onSendMessage: () => void;
}

export default function MatchNotification({ matchedAnimal, onClose, onSendMessage }: MatchNotificationProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold bg-gradient-to-r from-pink-500 to-primary bg-clip-text text-transparent">
            It's a Match!
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-gray-600">
            You and {matchedAnimal.name} like each other!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <img 
              src={matchedAnimal.avatar} 
              alt={matchedAnimal.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </div>
          
          <h3 className="mt-4 text-xl font-semibold">
            {formatNameAndAge(matchedAnimal.name, matchedAnimal.age)}
          </h3>
          <p className="text-gray-600">{matchedAnimal.species}</p>
          
          {matchedAnimal.bio && (
            <p className="mt-2 text-sm text-center text-gray-500 max-w-[300px]">
              "{matchedAnimal.bio}"
            </p>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full">
            Keep Swiping
          </Button>
          <Button onClick={onSendMessage} className="w-full">
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}