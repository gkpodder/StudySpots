'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useApp } from '@/context/AppContext';
import { NoiseLevel, Category, StudyPlace } from '@/types';

export default function AddPlace() {
  const router = useRouter();
  const { addPlace } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    photo: '',
    noiseLevel: 'Moderate' as NoiseLevel,
    crowdedness: 'Medium' as 'Low' | 'Medium' | 'High',
    seatingAvailable: true,
    amenities: {
      wifi: true,
      outlets: false,
      foodNearby: false,
    },
    categories: [] as Category[],
  });

  const categoryOptions: Category[] = ['indoor', 'outdoor', 'quiet', 'cafe', 'library'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newPlace: StudyPlace = {
      id: `place-${Date.now()}`,
      ...formData,
      rating: 0,
      reviewCount: 0,
      reviews: [],
      photo: formData.photo || 'https://via.placeholder.com/400x300?text=Study+Place',
    };

    addPlace(newPlace);
    alert('Place added successfully!');
    router.push('/');
  };

  const toggleCategory = (category: Category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-600">
            ← Cancel
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Add New Place</h1>
        </div>
      </header>

      <main className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Place Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Central Library - 3rd Floor"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Main Campus, Building A"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe this study place..."
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
              Photo URL
            </label>
            <input
              type="url"
              id="photo"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* Noise Level */}
          <div>
            <label htmlFor="noiseLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Quiet Level
            </label>
            <select
              id="noiseLevel"
              value={formData.noiseLevel}
              onChange={(e) => setFormData({ ...formData, noiseLevel: e.target.value as NoiseLevel })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="Quiet">Quiet</option>
              <option value="Moderate">Moderate</option>
              <option value="Loud">Loud</option>
            </select>
          </div>

          {/* Crowdedness */}
          <div>
            <label htmlFor="crowdedness" className="block text-sm font-medium text-gray-700 mb-2">
              Crowded Now?
            </label>
            <select
              id="crowdedness"
              value={formData.crowdedness}
              onChange={(e) =>
                setFormData({ ...formData, crowdedness: e.target.value as 'Low' | 'Medium' | 'High' })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${formData.categories.includes(cat)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.amenities.wifi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: { ...formData.amenities, wifi: e.target.checked },
                    })
                  }
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span>Wi-Fi</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.amenities.outlets}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: { ...formData.amenities, outlets: e.target.checked },
                    })
                  }
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span>Outlets</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.amenities.foodNearby}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: { ...formData.amenities, foodNearby: e.target.checked },
                    })
                  }
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span>Food Nearby</span>
              </label>
            </div>
          </div>

          {/* Seating Available */}
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.seatingAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, seatingAvailable: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span>Seating Available</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium text-lg active:bg-blue-700"
          >
            Submit Place
          </button>
        </form>
      </main>

      <Navigation />
    </div>
  );
}

