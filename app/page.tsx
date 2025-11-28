'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { StudyPlace, Category } from '@/types';
import { useApp } from '@/context/AppContext';

export default function Home() {
  const { places } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const categories: (Category | 'all')[] = ['all', 'indoor', 'outdoor', 'quiet', 'cafe', 'library'];

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter(place => place.categories.includes(selectedCategory));

  const recommendations = [
    { title: 'Quiet places near you', filter: 'quiet' },
    { title: 'Popular study spots', filter: 'popular' },
    { title: 'Spaces with many outlets', filter: 'outlets' },
  ];

  const handleRecommendationClick = (filter: string) => {
    if (filter === 'quiet') {
      setSelectedCategory('quiet');
    } else if (filter === 'outlets') {
      // Filter is handled by selectedCategory state
      setSelectedCategory('all');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Campus Study Places</h1>
          <p className="text-sm text-gray-600 mt-1">Find your perfect study spot</p>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Recommendations Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recommendations.map((rec, idx) => (
              <button
                key={idx}
                onClick={() => handleRecommendationClick(rec.filter)}
                className="flex-shrink-0 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium whitespace-nowrap"
              >
                {rec.title}
              </button>
            ))}
          </div>
        </section>

        {/* Category Filters */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Search Bar */}
        <Link href="/search" className="block mb-6">
          <div className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
            <span className="text-gray-400">🔍</span>
            <span className="text-gray-500 text-sm">Search study places...</span>
          </div>
        </Link>

        {/* Study Places List */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedCategory === 'all' ? 'All Study Places' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Places`}
          </h2>
          <div className="space-y-4">
            {filteredPlaces.map((place) => (
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
                    <div className="flex flex-wrap gap-2 mb-2">
                      {place.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        {place.noiseLevel === 'Quiet' ? '🔇' : place.noiseLevel === 'Moderate' ? '🔉' : '🔊'}
                        {place.noiseLevel}
                      </span>
                      <span className="flex items-center gap-1">
                        {place.crowdedness === 'Low' ? '🟢' : place.crowdedness === 'Medium' ? '🟡' : '🔴'}
                        {place.crowdedness}
                      </span>
                      {place.seatingAvailable && (
                        <span className="flex items-center gap-1">
                          💺 Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}

