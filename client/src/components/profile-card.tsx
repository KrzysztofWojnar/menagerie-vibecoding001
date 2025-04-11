import { motion, PanInfo, useAnimation } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Animal } from "../types/animal";
import { useState } from "react";

interface ProfileCardProps {
  animal: Animal;
  isActive: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: (animal: Animal) => void;
}

export default function ProfileCard({ animal, isActive, onSwipeLeft, onSwipeRight }: ProfileCardProps) {
  const controls = useAnimation();
  const [exitX, setExitX] = useState(0);
  const [showYay, setShowYay] = useState(false);
  const [showNope, setShowNope] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitX(200);
      setShowYay(true);
      controls.start({ x: 200, opacity: 0, transition: { duration: 0.2 } });
      setTimeout(() => onSwipeRight(animal), 300);
    } else if (info.offset.x < -100) {
      setExitX(-200);
      setShowNope(true);
      controls.start({ x: -200, opacity: 0, transition: { duration: 0.2 } });
      setTimeout(() => onSwipeLeft(), 300);
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.2 } });
      setShowYay(false);
      setShowNope(false);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      setShowYay(true);
      setShowNope(false);
    } else if (info.offset.x < -50) {
      setShowNope(true);
      setShowYay(false);
    } else {
      setShowYay(false);
      setShowNope(false);
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      data-testid="profile-card"
      className="w-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      animate={controls}
      initial={{ opacity: 1 }}
      exit={{ 
        x: exitX, 
        opacity: 0, 
        transition: { duration: 0.2 } 
      }}
      style={{ zIndex: 10 }}
    >
      <Card className="rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-[60vh]">
          <img
            src={animal.avatar}
            alt={animal.name}
            className="w-full h-full object-cover"
          />
          
          {showYay && (
            <div className="absolute top-5 left-5 transform -rotate-12 border-4 border-green-500 rounded-md p-2 bg-white bg-opacity-80">
              <span className="text-green-500 font-bold text-2xl">YAY!</span>
            </div>
          )}
          
          {showNope && (
            <div className="absolute top-5 right-5 transform rotate-12 border-4 border-primary rounded-md p-2 bg-white bg-opacity-80">
              <span className="text-primary font-bold text-2xl">NOPE</span>
            </div>
          )}
          
          {/* Hidden buttons for testing purposes */}
          <button 
            className="hidden" 
            aria-label="like" 
            onClick={() => onSwipeRight(animal)} 
          />
          <button 
            className="hidden" 
            aria-label="dislike" 
            onClick={onSwipeLeft} 
          />
        </div>
        
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-dark flex items-center">
              <span>{animal.name}</span>
              <span className="text-lg ml-2">{animal.age}</span>
            </h2>
            <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-semibold">
              <span>{Math.floor(Math.random() * 10) + 1} miles away</span>
            </span>
          </div>
          
          <p className="text-sm text-gray-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 inline-block mr-1"><path d="M12 2a3 3 0 0 0-3 3c0 1.7-1.3 3-3 3s-3 1.3-3 3 1.3 3 3 3c1.7 0 3 1.3 3 3a3 3 0 0 0 6 0c0-1.7 1.3-3 3-3s3-1.3 3-3-1.3-3-3-3-3-1.3-3-3a3 3 0 0 0-3-3z"/></svg>
            <span>{animal.species}</span>
          </p>
          
          <div className="bg-gray-50 p-3 rounded-md mb-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              {animal.bio || `I'm a ${animal.species} looking for friends!`}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-dark mb-1">Interested in:</p>
            <div className="flex flex-wrap gap-1">
              {animal.speciesPreferences.map((species, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                  {species}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
