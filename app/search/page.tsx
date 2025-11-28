'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useApp } from '@/context/AppContext';
import { StudyPlace, FilterOptions } from '@/types';

export default function Search() {
  const router = useRouter();
  const { places } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [filteredPlaces, setFilteredPlaces] = useState<StudyPlace[]>([]);

  const applyFilters = (query: string, currentFilters: FilterOptions) => {
    let results = places;

    // Apply search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        place =>
          place.name.toLowerCase().includes(lowerQuery) ||
          place.location.toLowerCase().includes(lowerQuery) ||
          place.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply filters
    if (currentFilters.noiseLevel) {
      results = results.filter(place => place.noiseLevel === currentFilters.noiseLevel);
    }
    if (currentFilters.crowdedness) {
      results = results.filter(place => place.crowdedness === currentFilters.crowdedness);
    }
    if (currentFilters.hasFood !== undefined) {
      results = results.filter(place => place.amenities.foodNearby === currentFilters.hasFood);
    }
    if (currentFilters.hasOutlets !== undefined) {
      results = results.filter(place => place.amenities.outlets === currentFilters.hasOutlets);
    }
    if (currentFilters.isIndoor !== undefined) {
      results = results.filter(place =>
        currentFilters.isIndoor
          ? place.categories.includes('indoor')
          : place.categories.includes('outdoor')
      );
    }
    if (currentFilters.seatingAvailable !== undefined) {
      results = results.filter(place => place.seatingAvailable === currentFilters.seatingAvailable);
    }

    setFilteredPlaces(results);
  };

  useEffect(() => {
    applyFilters(searchQuery, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    applyFilters(searchQuery, {});
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => router.back()} className="text-gray-600">
              ← Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Search</h1>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search study places..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
            >
              Filters
            </button>
          </div>
        </div>
      </header>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Noise Level Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiet Level
                </label>
                <select
                  value={filters.noiseLevel || ''}
                  onChange={(e) =>
                    handleFilterChange('noiseLevel', e.target.value || undefined)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Levels</option>
                  <option value="Quiet">Quiet</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Loud">Loud</option>
                </select>
              </div>

              {/* Crowdedness */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crowded Now?
                </label>
                <select
                  value={filters.crowdedness || ''}
                  onChange={(e) =>
                    handleFilterChange('crowdedness', e.target.value || undefined)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Levels</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Indoor/Outdoor Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFilterChange('isIndoor', true)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium ${filters.isIndoor === true
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    Indoor
                  </button>
                  <button
                    onClick={() => handleFilterChange('isIndoor', false)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium ${filters.isIndoor === false
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    Outdoor
                  </button>
                </div>
              </div>

              {/* Amenities Toggles */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Amenities</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.hasFood === true}
                      onChange={(e) =>
                        handleFilterChange('hasFood', e.target.checked ? true : undefined)
                      }
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span>Food Nearby</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.hasOutlets === true}
                      onChange={(e) =>
                        handleFilterChange('hasOutlets', e.target.checked ? true : undefined)
                      }
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span>Outlets Available</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.seatingAvailable === true}
                      onChange={(e) =>
                        handleFilterChange('seatingAvailable', e.target.checked ? true : undefined)
                      }
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span>Seating Available</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="px-4 py-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredPlaces.length} {filteredPlaces.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <Link key={place.id} href={`/place/${place.id}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden active:bg-gray-50">
                <div className="relative h-40 bg-gray-200">
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

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No study places found. Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}

