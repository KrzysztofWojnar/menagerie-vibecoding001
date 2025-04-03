import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import NotImplementedModal from "./not-implemented-modal";

export default function StatusBar() {
  const { user } = useAuthStore();
  const [showFilters, setShowFilters] = useState(false);
  const [showNotImplementedModal, setShowNotImplementedModal] = useState(false);
  
  if (!user) return null;

  return (
    <div className="bg-white py-3 px-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <img 
          src={user.avatar} 
          alt={`${user.name}'s avatar`} 
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <span className="font-semibold text-dark">{user.name}</span>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          className="text-dark opacity-70 hover:opacity-100"
          onClick={() => setShowFilters(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
        </button>
        <button 
          className="text-dark opacity-70 hover:opacity-100"
          onClick={() => setShowNotImplementedModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
      </div>
      
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent>
          <DialogTitle>Filter Preferences</DialogTitle>
          <DialogDescription>
            You are currently looking for these species:
          </DialogDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            {user.speciesPreferences.map((species, index) => (
              <div key={index} className="bg-gray-100 px-3 py-2 rounded-full text-sm flex items-center">
                {species}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Currently, preferences can only be changed from your profile settings.
          </p>
        </DialogContent>
      </Dialog>

      {/* Not implemented modal */}
      <NotImplementedModal
        isOpen={showNotImplementedModal}
        onClose={() => setShowNotImplementedModal(false)}
        title="Settings"
        description="The settings feature is not implemented yet."
      />
    </div>
  );
}
