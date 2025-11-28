'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudyPlace, Review } from '@/types';
import { mockStudyPlaces } from '@/data/mockData';

interface AppContextType {
  places: StudyPlace[];
  favorites: string[];
  visited: string[];
  getPlace: (placeId: string) => StudyPlace | undefined;
  toggleFavorite: (placeId: string) => void;
  toggleVisited: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
  isVisited: (placeId: string) => boolean;
  addReview: (placeId: string, review: Review) => void;
  addPlace: (place: StudyPlace) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PLACES = 'studyPlaces';
const STORAGE_KEY_FAVORITES = 'favorites';
const STORAGE_KEY_VISITED = 'visited';

export function AppProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<StudyPlace[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data from session storage or use mock data
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load favorites and visited from localStorage (persistent)
    const savedFavorites = localStorage.getItem(STORAGE_KEY_FAVORITES);
    const savedVisited = localStorage.getItem(STORAGE_KEY_VISITED);
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedVisited) setVisited(JSON.parse(savedVisited));

    // Load places from session storage (temporary)
    const savedPlaces = sessionStorage.getItem(STORAGE_KEY_PLACES);
    if (savedPlaces) {
      try {
        const parsedPlaces = JSON.parse(savedPlaces);
        setPlaces(parsedPlaces);
      } catch (e) {
        // If parsing fails, use mock data
        setPlaces(mockStudyPlaces);
      }
    } else {
      // First time - use mock data
      setPlaces(mockStudyPlaces);
      sessionStorage.setItem(STORAGE_KEY_PLACES, JSON.stringify(mockStudyPlaces));
    }

    setIsInitialized(true);
  }, []);

  // Save places to session storage whenever they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY_PLACES, JSON.stringify(places));
    }
  }, [places, isInitialized]);

  // Save favorites and visited to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_VISITED, JSON.stringify(visited));
    }
  }, [visited]);

  const getPlace = (placeId: string): StudyPlace | undefined => {
    return places.find(p => p.id === placeId);
  };

  const toggleFavorite = (placeId: string) => {
    setFavorites(prev =>
      prev.includes(placeId)
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const toggleVisited = (placeId: string) => {
    setVisited(prev =>
      prev.includes(placeId)
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const isFavorite = (placeId: string) => favorites.includes(placeId);
  const isVisited = (placeId: string) => visited.includes(placeId);

  const addReview = (placeId: string, review: Review) => {
    setPlaces(prevPlaces => {
      const updatedPlaces = prevPlaces.map(place => {
        if (place.id === placeId) {
          const updatedReviews = [...place.reviews, review];
          // Recalculate rating and review count
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newRating = totalRating / updatedReviews.length;
          const newReviewCount = updatedReviews.length;

          return {
            ...place,
            reviews: updatedReviews,
            rating: Math.round(newRating * 10) / 10, // Round to 1 decimal
            reviewCount: newReviewCount,
          };
        }
        return place;
      });
      return updatedPlaces;
    });
  };

  const addPlace = (place: StudyPlace) => {
    setPlaces(prevPlaces => [...prevPlaces, place]);
  };

  return (
    <AppContext.Provider
      value={{
        places,
        favorites,
        visited,
        getPlace,
        toggleFavorite,
        toggleVisited,
        isFavorite,
        isVisited,
        addReview,
        addPlace,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

