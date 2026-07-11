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
          <h1 className="text-3xl font-extrabold font-heading text-neutral-black-950 mb-2">
            Community <span className="text-brand-orange-500">Articles</span>
          </h1>
          <p className="text-sm text-neutral-black-600">
            Browse through all community written insights, technical guides, and creative writing.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white max-w-lg mx-auto rounded-xl border border-neutral-black-200 p-8 shadow-sm">
            <span className="block text-3xl mb-3">📭</span>
            <h2 className="text-xl font-bold font-heading text-neutral-black-950 mb-1">No Posts Found</h2>
            <p className="text-neutral-black-500 text-xs">Be the first to publish a new post on BlogifyX!</p>
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