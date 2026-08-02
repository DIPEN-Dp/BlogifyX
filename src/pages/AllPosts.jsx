import React, { useState, useEffect } from 'react'
import { Container, PostCard } from "../components"
import appwriteServices from "../Appwrite/database_services"
import { BookOpen, Inbox } from 'lucide-react'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteServices.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    })
  }, [])

  return (
    <div className="w-full py-12" style={{ backgroundColor: '#0B0B0B', minHeight: '80vh' }}>
      <Container>
        {/* Header */}
        <div className="mb-12 fade-in">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} style={{ color: '#C8FF2E' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6B7280' }}>
              Community
            </span>
          </div>
          <h1
            className="text-4xl font-black tracking-tight mb-3"
            style={{ color: '#FFFFFF', letterSpacing: '-0.035em' }}
          >
            All Articles
          </h1>
          <p className="text-sm max-w-xl" style={{ color: '#6B7280' }}>
            Browse through community written insights, technical guides, and creative writing from developers worldwide.
          </p>
        </div>

        {loading ? (
          /* Loading skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden"
                style={{ backgroundColor: '#111111', border: '1px solid #1F1F1F' }}
              >
                <div className="aspect-video animate-pulse" style={{ backgroundColor: '#1A1A1A' }} />
                <div className="p-5 space-y-3">
                  <div className="h-4 rounded-lg animate-pulse" style={{ backgroundColor: '#1A1A1A', width: '80%' }} />
                  <div className="h-4 rounded-lg animate-pulse" style={{ backgroundColor: '#1A1A1A', width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty state */
          <div
            className="text-center py-20 max-w-md mx-auto rounded-3xl px-10 fade-in"
            style={{ backgroundColor: '#111111', border: '1px solid #2B2B2B' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: 'rgba(200, 255, 46, 0.08)', border: '1px solid rgba(200, 255, 46, 0.15)' }}
            >
              <Inbox size={22} style={{ color: '#C8FF2E' }} />
            </div>
            <h2 className="text-xl font-bold mb-2 tracking-tight" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              No Posts Found
            </h2>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Be the first to publish a new post on BlogifyX!
            </p>
          </div>
        ) : (
          <div className="fade-in">
            {/* Count bar */}
            <div className="flex items-center justify-between mb-8 pb-5" style={{ borderBottom: '1px solid #1F1F1F' }}>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                <span className="font-semibold" style={{ color: '#FFFFFF' }}>{posts.length}</span> articles published
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts