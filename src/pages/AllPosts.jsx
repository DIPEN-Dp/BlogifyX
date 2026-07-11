import React, { useState, useEffect } from 'react'
import { Container, PostCard } from "../components"
import appwriteServices from "../Appwrite/database_services"

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteServices.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="w-full py-12">
      <Container>
        {/* Header Block */}
        <div className="mb-10 px-2">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Community <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-sm text-slate-400">
            Browse through all community written insights, technical guides, and creative writing.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 glass max-w-lg mx-auto rounded-3xl border border-white/10 p-8">
            <span className="block text-3xl mb-3">📭</span>
            <h2 className="text-xl font-bold text-white mb-1">No Posts Found</h2>
            <p className="text-slate-400 text-xs">Be the first to publish a new post on BlogifyX!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts