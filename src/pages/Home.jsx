import React, { useEffect, useState } from 'react'
import appwriteService from "../Appwrite/database_services";
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import cherryBlossom from '../assets/Blog post-amico.svg'
import { ArrowRight } from 'lucide-react'

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
            <div className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 overflow-hidden flex flex-col justify-center text-left">
                <Container>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 z-10 relative px-4">
                        <div className="w-full lg:w-1/2">
                          
                            <h1 className="text-5xl md:text-7xl font-bold font-heading text-neutral-black-950 tracking-tight leading-none mb-6">
                                Learn. Build. <br className="hidden md:block" /> <span className="text-brand-orange-500">Share.</span>
                            </h1>
                            <p className="text-base md:text-xl text-neutral-black-600 mb-8 max-w-xl leading-relaxed">
                                Discover modern developer blogs, high-quality tutorials, and insights from developers building the future.
                            </p>
                            
                            {!authStatus ? (
                                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                                    <Link to="/login" className="px-8 py-3 rounded-lg font-semibold text-sm bg-brand-orange-500 hover:bg-brand-orange-600 text-white shadow-sm transition-colors duration-150 text-center">
                                        Get Started
                                    </Link>
                                    <Link to="/signup" className="px-8 py-3 rounded-lg font-semibold text-sm border border-neutral-black-200 text-neutral-black-800 hover:bg-neutral-black-50 transition-colors duration-150 text-center">
                                        Create Account
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex justify-start">
                                    <a href="#posts-section" className="px-8 py-3 rounded-lg font-semibold text-sm bg-brand-orange-500 hover:bg-brand-orange-600 text-white shadow-sm transition-colors duration-150 inline-block text-center">
                                        Explore Articles
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
                            <img src={cherryBlossom} alt="Hero Illustration" className="w-full max-w-lg lg:max-w-xl h-auto drop-shadow-sm" />
                        </div>
                    </div>
                </Container>
            </div>

            {/* Posts Section */}
            <div id="posts-section" className="py-16 border-t border-neutral-black-100 bg-neutral-black-50/30">
                <Container>
                    {!authStatus || posts.length === 0 ? (
                        <div className="text-center py-20 bg-white max-w-2xl mx-auto rounded-2xl border border-neutral-black-200 px-10 shadow-md">
                            <h2 className="text-3xl font-bold font-heading text-neutral-black-950 mb-4">Welcome to BlogifyX</h2>
                            <p className="text-neutral-black-600 text-base md:text-lg mb-8">You need to sign in or create an account to view and read our community posts.</p>
                            <Link to="/login" className="px-8 py-3 rounded-xl font-semibold text-sm bg-brand-orange-500 hover:bg-brand-orange-600 text-white shadow-sm inline-block transition-colors duration-150">
                                Sign In Now
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div>
                                    <h2 className="text-2xl font-bold font-heading text-neutral-black-950">Latest Articles</h2>
                                    <p className="text-xs text-neutral-black-500">Recently published tech insights and tutorials.</p>
                                </div>
                                <Link to="/all-posts" className="text-xs font-semibold text-brand-orange-500 hover:text-brand-orange-600 transition-colors flex items-center gap-1">
                                    View All Posts <ArrowRight size={14} />
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