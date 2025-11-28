'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useApp } from '@/context/AppContext';

export default function PlaceDetails() {
  const params = useParams();
  const router = useRouter();
  const { getPlace, toggleFavorite, toggleVisited, isFavorite, isVisited } = useApp();
  const place = getPlace(params.id as string);

  if (!place) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Place not found</h1>
          <Link href="/" className="text-blue-600">Go back home</Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(place.id);
  const visited = isVisited(place.id);

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-600">
            ← Back
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Study Place Details</h1>
        </div>
      </header>

      <main>
        {/* Photo */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={place.photo}
            alt={place.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Study+Place';
            }}
          />
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Header Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{place.name}</h2>
            <p className="text-gray-600 mb-3">{place.location}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="font-semibold">{place.rating}</span>
                <span className="text-gray-500 text-sm">({place.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => toggleFavorite(place.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium ${
                favorite
                  ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
              }`}
            >
              {favorite ? '⭐ Favorited' : '⭐ Add to Favorites'}
            </button>
            <button
              onClick={() => toggleVisited(place.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium ${
                visited
                  ? 'bg-green-100 text-green-800 border-2 border-green-400'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
              }`}
            >
              {visited ? '✓ Visited' : '✓ Mark as Visited'}
            </button>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{place.description}</p>
          </section>

          {/* Quick Info */}
          <section className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Quiet Level</span>
                <span className="font-medium flex items-center gap-2">
                  {place.noiseLevel === 'Quiet' ? '🔇' : place.noiseLevel === 'Moderate' ? '🔉' : '🔊'}
                  {place.noiseLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Crowded Now?</span>
                <span className="font-medium flex items-center gap-2">
                  {place.crowdedness === 'Low' ? '🟢' : place.crowdedness === 'Medium' ? '🟡' : '🔴'}
                  {place.crowdedness}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Seating Available</span>
                <span className="font-medium">
                  {place.seatingAvailable ? '✅ Yes' : '❌ No'}
                </span>
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {place.amenities.wifi && (
                <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                  📶 Wi-Fi
                </div>
              )}
              {place.amenities.outlets && (
                <div className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                  🔌 Outlets
                </div>
              )}
              {place.amenities.foodNearby && (
                <div className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium">
                  🍕 Food Nearby
                </div>
              )}
            </div>
          </section>

          {/* Categories */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {place.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>
              <Link
                href={`/place/${place.id}/review`}
                className="text-blue-600 font-medium text-sm"
              >
                Write Review →
              </Link>
            </div>
            <div className="space-y-4">
              {place.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                  <p className="text-gray-500 text-xs">{review.date}</p>
                </div>
              ))}
              {place.reviews.length === 0 && (
                <p className="text-gray-500 text-center py-4">No reviews yet. Be the first!</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Navigation />
    </div>
  );
}

