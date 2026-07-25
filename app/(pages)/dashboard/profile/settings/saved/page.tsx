"use client";

import { useEffect, useState } from "react";
import Posts from "../../../_components/Posts";
import SectionHeader from "@/global/SectionHeader";
import { Bookmark } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SavedPostsPage() {
  const { user } = useAuth();
  const currentUserId = user?._id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchSavedPosts = async () => {
      try {
        const res = await fetch("/api/posts/get-save");

        if (!res.ok) throw new Error("Failed request");

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch saved posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [currentUserId]);

  return (
    <main className="w-full min-h-screen bg-white/60 border border-white/30 rounded-xl overflow-hidden">
      <SectionHeader
        title="Saved Posts"
        icon={<Bookmark className="w-6 h-6" />}
      />

      <div className="py-10">
        <div className="mx-auto w-full max-w-2xl">
          {loading ? (
            <div className="flex justify-center items-center py-20 gap-4">
              <p className="text-gray-400">Loading Saved Posts</p>

              <svg
                className="animate-spin h-10 w-10 text-cyan-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth={4}
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-lg">
              No saved posts yet.
            </div>
          ) : (
            <Posts
              currentUserId={currentUserId || ""}
              mode="self"
              initialPosts={posts}
              isSavedView={true}
            />
          )}
        </div>
      </div>
    </main>
  );
}