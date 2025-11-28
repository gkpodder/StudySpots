'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useApp } from '@/context/AppContext';

export default function Profile() {
  const { favorites, visited } = useApp();
  const [notifications, setNotifications] = useState({
    crowdedness: false,
    newPlaces: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  const handleNotificationToggle = (key: 'crowdedness' | 'newPlaces') => {
    const newNotifications = {
      ...notifications,
      [key]: !notifications[key],
    };
    setNotifications(newNotifications);
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Stats */}
        <section className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{favorites.length}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{visited.length}</div>
              <div className="text-sm text-gray-600">Visited</div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h2>
          <div className="space-y-2">
            <Link
              href="/favorites"
              className="block bg-white rounded-lg p-4 border border-gray-200 active:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <span className="font-medium text-gray-900">My Favorites</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </Link>
            <Link
              href="/visited"
              className="block bg-white rounded-lg p-4 border border-gray-200 active:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span className="font-medium text-gray-900">Visited Places</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </Link>
            <Link
              href="/add-place"
              className="block bg-white rounded-lg p-4 border border-gray-200 active:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">➕</span>
                  <span className="font-medium text-gray-900">Add New Place</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Crowdedness Alerts</p>
                <p className="text-sm text-gray-600">
                  Notify me when a favorite place becomes less crowded
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.crowdedness}
                  onChange={() => handleNotificationToggle('crowdedness')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">New Places</p>
                <p className="text-sm text-gray-600">
                  Notify me when a new study space on campus is added
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newPlaces}
                  onChange={() => handleNotificationToggle('newPlaces')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}

