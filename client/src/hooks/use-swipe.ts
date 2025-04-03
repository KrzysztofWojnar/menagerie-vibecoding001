import { useState, useEffect } from "react";

interface UseSwipeProps<T> {
  items: T[];
  onSwipeLeft: () => void;
  onSwipeRight: (item: T) => void;
}

export function useSwipe<T>({ items, onSwipeLeft, onSwipeRight }: UseSwipeProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset the index when items change
  useEffect(() => {
    setCurrentIndex(0);
  }, [items.length]);

  const swipeLeft = () => {
    if (items.length > 0) {
      onSwipeLeft();
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }
  };

  const swipeRight = (item: T) => {
    if (items.length > 0) {
      onSwipeRight(item);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }
  };

  return {
    currentIndex,
    swipeLeft,
    swipeRight,
  };
}
