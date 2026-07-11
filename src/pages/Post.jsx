import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/database_services";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import AuthImage from "../components/AuthImage";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const progress = (window.scrollY / totalScroll) * 100;
                setScrollProgress(progress);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 relative">
            {/* Sticky reading progress bar */}
            <div 
              className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 z-50 transition-all duration-100" 
              style={{ width: `${scrollProgress}%` }}
            />

            <Container>
                <div className="w-full max-w-4xl mx-auto space-y-8">
                    {/* Back navigation */}
                    <div className="px-2">
                      <button 
                        onClick={() => navigate(-1)} 
                        className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                      >
                        ← Back to Articles
                      </button>
                    </div>

                    {/* Cover Image Container */}
                    <div className="w-full aspect-video md:max-h-[400px] overflow-hidden rounded-3xl border border-white/10 relative shadow-2xl">
                        <AuthImage
                            fileId={post.featuredimage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Details and Actions Block */}
                    <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 relative shadow-xl">
                        {/* Author and Date metadata */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                                  {post.userid?.substring(0, 2).toUpperCase() || "AU"}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Written by</p>
                                    <p className="text-sm font-semibold text-white">Author ({post.userid?.substring(0, 8)})</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span>📅 Date Published</span>
                                <span>⏱️ 5 min read</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Rich Content Area */}
                        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-base md:text-lg mb-8">
                            {parse(post.content)}
                        </div>

                        {/* Author Actions */}
                        {isAuthor && (
                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/5">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-5 py-2 rounded-xl text-xs font-semibold text-green-400 border border-green-500/20 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200 cursor-pointer">
                                        Edit Post
                                    </button>
                                </Link>
                                <button 
                                    onClick={deletePost}
                                    className="px-5 py-2 rounded-xl text-xs font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200 cursor-pointer"
                                >
                                    Delete Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}