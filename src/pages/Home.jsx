import React, { useEffect, useState } from 'react'
import appwriteService from "../Appwrite/database_services";
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

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
            <div className="relative py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center">
                {/* Glowing backdrop circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
                
                <Container>
                    <div className="max-w-3xl mx-auto px-4 z-10 relative">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6 animate-pulse">
                            ✦ The Future of Blogging
                        </div>
                        <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-6">
                            Learn. Build. <span className="gradient-text">Share.</span>
                        </h1>
                        <p className="text-base md:text-xl text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                            Discover modern developer blogs, high-quality tutorials, and insights from developers building the future.
                        </p>
                        
                        {!authStatus ? (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/login" className="px-8 py-3 rounded-xl font-semibold text-sm btn-gradient text-white shadow-lg">
                                    Get Started
                                </Link>
                                <Link to="/signup" className="px-8 py-3 rounded-xl font-semibold text-sm glass text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all">
                                    Create Account
                                </Link>
                            </div>
                        ) : (
                            <a href="#posts-section" className="px-8 py-3 rounded-xl font-semibold text-sm btn-gradient text-white shadow-lg inline-block">
                                Explore Articles
                            </a>
                        )}
                    </div>
                </Container>
            </div>

            {/* Posts Section */}
            <div id="posts-section" className="py-12 border-t border-white/5">
                <Container>
                    {!authStatus || posts.length === 0 ? (
                        <div className="text-center py-20 glass max-w-lg mx-auto rounded-3xl border border-white/10 p-8">
                            <h2 className="text-xl font-bold text-white mb-2">Welcome to BlogifyX</h2>
                            <p className="text-slate-400 text-sm mb-6">You need to sign in or create an account to view and read our community posts.</p>
                            <Link to="/login" className="px-6 py-2.5 rounded-xl font-semibold text-xs btn-gradient text-white shadow-md inline-block">
                                Sign In Now
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
                                    <p className="text-xs text-slate-400">Recently published tech insights and tutorials.</p>
                                </div>
                                <Link to="/all-posts" className="text-xs font-semibold text-purple-400 hover:text-purple-300">
                                    View All Posts ➔
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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