import React, { useEffect, useState } from 'react'
import appwriteService from "../Appwrite/database_services";
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ArrowRight, Zap, FileText } from 'lucide-react'

function Home() {
  const [posts, setPosts] = useState([])
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden bg-grid"
        style={{ backgroundColor: '#0B0B0B' }}
      >
        {/* Radial glow behind hero */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '700px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(200,255,46,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <Container>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 fade-in">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(200, 255, 46, 0.1)',
                  border: '1px solid rgba(200, 255, 46, 0.25)',
                  color: '#C8FF2E',
                }}
              >
                <Zap size={11} />
                Developer community · 2026
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
              style={{ color: '#FFFFFF', letterSpacing: '-0.04em' }}
            >
              Learn. Build.{' '}
              <span style={{ color: '#C8FF2E' }}>Ship.</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Discover modern developer blogs, high-quality tutorials, and insights from developers building the future.
            </p>

            {!authStatus ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/signup" className="btn-primary text-sm px-7 py-3">
                  Get Started Free <ArrowRight size={15} />
                </Link>
                <Link to="/login" className="btn-secondary text-sm px-7 py-3">
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="flex justify-center">
                <a href="#posts-section" className="btn-primary text-sm px-7 py-3">
                  Explore Articles <ArrowRight size={15} />
                </a>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Posts Section */}
      <div
        id="posts-section"
        className="py-20"
        style={{ backgroundColor: '#0B0B0B' }}
      >
        <Container>
          {!authStatus ? (
            /* Guest: sign-in prompt */
            <div
              className="text-center py-16 max-w-xl mx-auto rounded-3xl px-10 fade-in"
              style={{
                backgroundColor: '#111111',
                border: '1px solid #2B2B2B',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: 'rgba(200, 255, 46, 0.1)', border: '1px solid rgba(200, 255, 46, 0.2)' }}
              >
                <FileText size={24} style={{ color: '#C8FF2E' }} />
              </div>
              <h2
                className="text-2xl font-bold mb-3 tracking-tight"
                style={{ color: '#FFFFFF', letterSpacing: '-0.025em' }}
              >
                Join BlogifyX
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: '#6B7280' }}>
                Sign in or create an account to access community posts, tutorials, and developer insights.
              </p>
              <Link to="/login" className="btn-primary text-sm px-8 py-3">
                Sign In Now <ArrowRight size={14} />
              </Link>
            </div>
          ) : posts.length === 0 ? (
            /* Logged in but no posts */
            <div
              className="text-center py-16 max-w-xl mx-auto rounded-3xl px-10 fade-in"
              style={{
                backgroundColor: '#111111',
                border: '1px solid #2B2B2B',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: 'rgba(200, 255, 46, 0.1)', border: '1px solid rgba(200, 255, 46, 0.2)' }}
              >
                <FileText size={24} style={{ color: '#C8FF2E' }} />
              </div>
              <h2 className="text-2xl font-bold mb-3 tracking-tight" style={{ color: '#FFFFFF', letterSpacing: '-0.025em' }}>
                No Posts Yet
              </h2>
              <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
                Be the first to share something with the developer community!
              </p>
              <Link to="/add-post" className="btn-primary text-sm px-8 py-3">
                Write First Post <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            /* Post grid */
            <div className="fade-in">
              <div className="flex items-center justify-between mb-10 px-1">
                <div>
                  <h2
                    className="text-2xl font-bold mb-1 tracking-tight"
                    style={{ color: '#FFFFFF', letterSpacing: '-0.025em' }}
                  >
                    Latest Articles
                  </h2>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Recently published insights and tutorials.
                  </p>
                </div>
                <Link
                  to="/all-posts"
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150"
                  style={{ color: '#C8FF2E' }}
                >
                  View All <ArrowRight size={13} />
                </Link>
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
    </div>
  )
}

export default Home