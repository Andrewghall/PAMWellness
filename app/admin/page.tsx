"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "../components/AdminContext";

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

interface AccessEvent {
  id: string;
  ts: number;
  type: "platform_access" | "commercial_estimates_access";
  path?: string;
  visitorId: string;
  country?: string;
  region?: string;
  city?: string;
  userAgent?: string;
}

export default function AdminDashboard() {
  const { isAdmin } = useAdmin();
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);
  const [scrollEvents, setScrollEvents] = useState<ScrollEvent[]>([]);
  const [accessEvents, setAccessEvents] = useState<AccessEvent[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "users" | "interactions" | "access">("overview");

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

    const loadAccessEvents = async () => {
      try {
        const res = await fetch("/api/access-events?limit=200");
        if (!res.ok) return;
        const data = (await res.json()) as { events: AccessEvent[] };
        setAccessEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        // ignore
      }
    };

    loadAnalytics();
    loadAccessEvents();
    const interval = setInterval(() => {
      loadAnalytics();
      loadAccessEvents();
    }, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [isAdmin]);

  const uniqueAccessVisitors = new Set(accessEvents.map((e) => e.visitorId)).size;

  const resetAccessEvents = async () => {
    await fetch("/api/access-events/reset", {
      method: "POST",
      headers: { "x-carecore-admin": "true" },
    }).catch(() => undefined);
    const res = await fetch("/api/access-events?limit=200").catch(() => undefined);
    if (res && (res as Response).ok) {
      const data = (await (res as Response).json()) as { events: AccessEvent[] };
      setAccessEvents(Array.isArray(data.events) ? data.events : []);
    }
  };

  const resetLocalAnalytics = () => {
    localStorage.removeItem("page_views");
    localStorage.removeItem("click_events");
    localStorage.removeItem("scroll_events");
    setPageViews([]);
    setClickEvents([]);
    setScrollEvents([]);
  };

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
                { id: "users", label: "User Behaviour" },
                { id: "interactions", label: "Interactions" },
                { id: "access", label: "Access Events" },
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
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Access Events</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{accessEvents.length}</p>
                <p className="text-sm text-gray-600 mt-1">Tracked logins</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Unique Access</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{uniqueAccessVisitors}</p>
                <p className="text-sm text-gray-600 mt-1">Unique visitors</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Reset</h3>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    onClick={resetAccessEvents}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Clear Access Events
                  </button>
                  <button
                    onClick={resetLocalAnalytics}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
                  >
                    Clear Local Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "access" && (
            <div className="space-y-6">
              {/* Unique Visitors Summary */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Unique Visitors Summary</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Each unique visitor ID represents a different browser/device. Compare locations and access times to identify yourself.
                  </p>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Access</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Access</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(() => {
                      const visitorGroups = accessEvents.reduce((acc, ev) => {
                        if (!acc[ev.visitorId]) {
                          acc[ev.visitorId] = {
                            count: 0,
                            location: [ev.city, ev.region, ev.country].filter(Boolean).join(", ") || "Unknown",
                            firstAccess: ev.ts,
                            lastAccess: ev.ts,
                            userAgent: ev.userAgent || "Unknown"
                          };
                        }
                        acc[ev.visitorId].count++;
                        acc[ev.visitorId].firstAccess = Math.min(acc[ev.visitorId].firstAccess, ev.ts);
                        acc[ev.visitorId].lastAccess = Math.max(acc[ev.visitorId].lastAccess, ev.ts);
                        return acc;
                      }, {} as Record<string, { count: number; location: string; firstAccess: number; lastAccess: number; userAgent: string }>);

                      return Object.entries(visitorGroups)
                        .sort(([, a], [, b]) => b.lastAccess - a.lastAccess)
                        .map(([visitorId, stats]) => (
                          <tr key={visitorId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                              {visitorId.slice(0, 16)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {stats.count}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {stats.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(stats.firstAccess).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(stats.lastAccess).toLocaleString()}
                            </td>
                          </tr>
                        ));
                    })()}
                    {accessEvents.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No access events yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* All Access Events */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">All Access Events</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Complete log of all access-code entries.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={resetAccessEvents}
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {accessEvents.map((ev) => (
                      <tr key={ev.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(ev.ts).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ev.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {[ev.city, ev.region, ev.country].filter(Boolean).join(", ") || "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                          {ev.visitorId?.slice(0, 12) || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ev.path || "-"}</td>
                      </tr>
                    ))}
                    {accessEvents.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No access events yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pages Tab */}
          {activeTab === "pages" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Page Performance Analytics</h3>
                <p className="text-sm text-gray-600 mt-1">See which pages are most popular and how long users stay</p>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Visitors</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time Spent</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(pageStats).map(([page, stats]) => (
                    <tr key={page}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats.users.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stats.views > 0 ? Math.round(stats.totalTime / stats.views / 1000) : 0} seconds
                      </td>
                    </tr>
                  ))}
                  {Object.keys(pageStats).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No page data available yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Individual User Activity</h3>
                <p className="text-sm text-gray-600 mt-1">Track how each user navigates through your site</p>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages Visited</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time on Site</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Visit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(userStats).map(([userId, stats]) => (
                    <tr key={userId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stats.pages.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(stats.totalTime / 1000)} seconds</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(stats.firstVisit).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {Object.keys(userStats).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No user activity recorded yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Interactions Tab */}
          {activeTab === "interactions" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent User Interactions</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {clickEvents.slice(-10).reverse().map((click, index) => (
                    <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{click.element}</span>
                        <span className="text-gray-500 ml-2">on {click.page}</span>
                      </div>
                      <span className="text-gray-400 text-xs">{new Date(click.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                  {clickEvents.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No user interactions recorded yet</p>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Content Engagement by Page</h3>
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
                        <span className="text-gray-600 font-medium">{page}</span>
                        <span className="text-gray-500">
                          {Math.round(depths.reduce((a, b) => a + b, 0) / depths.length)}% average scroll depth
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
                  {Object.keys(scrollEvents).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No scroll data recorded yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
  );
}
