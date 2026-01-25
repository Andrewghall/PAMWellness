"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../components/AdminContext";
import Navigation from "../components/Navigation";

interface PageView {
  page: string;
  timestamp: number;
  duration?: number;
  userId: string;
}

interface ClickEvent {
  element: string;
  timestamp: number;
  userId: string;
  page: string;
}

interface ScrollEvent {
  maxScroll: number;
  timestamp: number;
  userId: string;
  page: string;
}

export default function AdminDashboard() {
  const { isAdmin } = useAdmin();
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);
  const [scrollEvents, setScrollEvents] = useState<ScrollEvent[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "users" | "interactions">("overview");

  useEffect(() => {
    if (!isAdmin) return;

    // Load analytics data
    const loadAnalytics = () => {
      const views = JSON.parse(localStorage.getItem("page_views") || "[]");
      const clicks = JSON.parse(localStorage.getItem("click_events") || "[]");
      const scrolls = JSON.parse(localStorage.getItem("scroll_events") || "[]");
      
      setPageViews(views);
      setClickEvents(clicks);
      setScrollEvents(scrolls);
    };

    loadAnalytics();
    const interval = setInterval(loadAnalytics, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  // Calculate analytics
  const uniqueUsers = new Set(pageViews.map(v => v.userId)).size;
  const totalPages = new Set(pageViews.map(v => v.page)).size;
  const totalClicks = clickEvents.length;
  const avgScrollDepth = scrollEvents.length > 0 
    ? Math.round(scrollEvents.reduce((acc, s) => acc + s.maxScroll, 0) / scrollEvents.length)
    : 0;

  const pageStats = pageViews.reduce((acc, view) => {
    if (!acc[view.page]) {
      acc[view.page] = { views: 0, totalTime: 0, users: new Set() };
    }
    acc[view.page].views++;
    acc[view.page].users.add(view.userId);
    if (view.duration) {
      acc[view.page].totalTime += view.duration;
    }
    return acc;
  }, {} as Record<string, { views: number; totalTime: number; users: Set<string> }>);

  const userStats = pageViews.reduce((acc, view) => {
    if (!acc[view.userId]) {
      acc[view.userId] = { pages: new Set(), totalTime: 0, firstVisit: view.timestamp };
    }
    acc[view.userId].pages.add(view.page);
    acc[view.userId].totalTime += view.duration || 0;
    acc[view.userId].firstVisit = Math.min(acc[view.userId].firstVisit, view.timestamp);
    return acc;
  }, {} as Record<string, { pages: Set<string>; totalTime: number; firstVisit: number }>);

  return (
    <Navigation>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time analytics and user insights</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "pages", label: "Page Analytics" },
                { id: "users", label: "User Behavior" },
                { id: "interactions", label: "Interactions" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{uniqueUsers}</p>
                <p className="text-sm text-gray-600 mt-1">Unique visitors</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Page Views</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pageViews.length}</p>
                <p className="text-sm text-gray-600 mt-1">Total views</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalClicks}</p>
                <p className="text-sm text-gray-600 mt-1">User interactions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Avg Scroll Depth</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgScrollDepth}%</p>
                <p className="text-sm text-gray-600 mt-1">Content engagement</p>
              </div>
            </div>
          )}

          {/* Pages Tab */}
          {activeTab === "pages" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(pageStats).map(([page, stats]) => (
                    <tr key={page}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats.users.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stats.views > 0 ? Math.round(stats.totalTime / stats.views / 1000) : 0}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages Viewed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Visit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(userStats).map(([userId, stats]) => (
                    <tr key={userId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats.pages.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(stats.totalTime / 1000)}s</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(stats.firstVisit).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Interactions Tab */}
          {activeTab === "interactions" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Click Events</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {clickEvents.slice(-10).reverse().map((click, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{click.element}</span>
                      <span className="text-gray-500">{click.page}</span>
                      <span className="text-gray-400">{new Date(click.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Scroll Depth by Page</h3>
                <div className="space-y-4">
                  {Object.entries(
                    scrollEvents.reduce((acc, scroll) => {
                      if (!acc[scroll.page]) {
                        acc[scroll.page] = [];
                      }
                      acc[scroll.page].push(scroll.maxScroll);
                      return acc;
                    }, {} as Record<string, number[]>)
                  ).map(([page, depths]) => (
                    <div key={page}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{page}</span>
                        <span className="text-gray-500">
                          {Math.round(depths.reduce((a, b) => a + b, 0) / depths.length)}% avg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.round(depths.reduce((a, b) => a + b, 0) / depths.length)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Navigation>
  );
}
