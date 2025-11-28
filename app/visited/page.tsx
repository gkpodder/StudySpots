'use client';

import { useApp } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function Visited() {
  const { places, visited, isVisited } = useApp();
  const visitedPlaces = places.filter(place => isVisited(place.id));

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Visited</h1>
          <p className="text-sm text-gray-600 mt-1">Places you've been to</p>
        </div>
      </header>

      <main className="px-4 py-6">
        {visitedPlaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No visited places yet</h2>
            <p className="text-gray-600 mb-6">Mark places as visited to keep track!</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
            >
              Browse Study Places
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {visitedPlaces.map((place) => (
              <Link key={place.id} href={`/place/${place.id}`}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden active:bg-gray-50">
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={place.photo}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Study+Place';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-semibold">{place.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{place.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{place.location}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        {place.noiseLevel === 'Quiet' ? '🔇' : place.noiseLevel === 'Moderate' ? '🔉' : '🔊'}
                        {place.noiseLevel}
                      </span>
                      <span className="flex items-center gap-1">
                        {place.crowdedness === 'Low' ? '🟢' : place.crowdedness === 'Medium' ? '🟡' : '🔴'}
                        {place.crowdedness}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}

