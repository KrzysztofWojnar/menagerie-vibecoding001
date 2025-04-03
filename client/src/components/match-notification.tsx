import { Animal } from "@/types/animal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { motion, AnimatePresence } from "framer-motion";

interface MatchNotificationProps {
  matchedAnimal: Animal;
  onClose: () => void;
  onSendMessage: () => void;
}

export default function MatchNotification({ matchedAnimal, onClose, onSendMessage }: MatchNotificationProps) {
  const { user } = useAuthStore();
  
  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-dark bg-opacity-80 z-30 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 w-10/12 max-w-sm text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { 
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20 
            }
          }}
        >
          <motion.div 
            className="mb-4 text-primary"
            animate={{ 
              scale: [1, 1.1, 1],
              transition: { 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              } 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-dark mb-2">It's a Menagerie Match!</h2>
          <p className="text-gray-600 mb-6">You and {matchedAnimal.name} like each other</p>
          
          <div className="flex justify-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt="Your profile" 
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
            <div className="relative">
              <img 
                src={matchedAnimal.avatar} 
                alt={`${matchedAnimal.name}'s profile`} 
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold"
              onClick={onSendMessage}
            >
              Send Message
            </Button>
            <Button
              variant="outline"
              className="w-full py-3 rounded-xl font-semibold"
              onClick={onClose}
            >
              Keep Swiping
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
