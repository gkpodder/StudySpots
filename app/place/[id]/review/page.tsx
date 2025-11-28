'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useApp } from '@/context/AppContext';
import { Review } from '@/types';

export default function WriteReview() {
  const params = useParams();
  const router = useRouter();
  const { getPlace, addReview } = useApp();
  const place = getPlace(params.id as string);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!place) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Place not found</h1>
          <button onClick={() => router.back()} className="text-blue-600">Go back</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      alert('Please write a comment');
      return;
    }

    const newReview: Review = {
      id: `r${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    addReview(place.id, newReview);
    router.push(`/place/${place.id}`);
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-600">
            ← Cancel
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Write a Review</h1>
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{place.name}</h2>
          <p className="text-gray-600">{place.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Widget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Your Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-4xl focus:outline-none transition-transform active:scale-90"
                >
                  <span
                    className={
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }
                  >
                    ⭐
                  </span>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Great!'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Fair'}
                {rating === 1 && 'Poor'}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience at this study place..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">{comment.length} characters</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium text-lg active:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </main>

      <Navigation />
    </div>
  );
}

