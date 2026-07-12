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
        <div className="py-12 relative bg-white">
            {/* Sticky reading progress bar */}
            <div 
              className="fixed top-0 left-0 h-1 bg-brand-orange-500 z-50 transition-all duration-100" 
              style={{ width: `${scrollProgress}%` }}
            />

            <Container>
                <div className="w-full max-w-3xl mx-auto space-y-8">
                    {/* Back navigation */}
                    <div className="px-2">
                      <button 
                        onClick={() => navigate(-1)} 
                        className="text-xs font-semibold text-brand-orange-500 hover:text-brand-orange-600 flex items-center gap-1 cursor-pointer transition-colors duration-150"
                      >
                        ← Back to Articles
                      </button>
                    </div>

                    {/* Cover Image Container */}
                    <div className="w-full aspect-video md:max-h-[400px] overflow-hidden rounded-xl border border-neutral-black-200 relative shadow-sm bg-neutral-black-50">
                        <AuthImage
                            fileId={post.featuredimage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details and Actions Block */}
                    <div className="relative pt-4">
                        {/* Author and Date metadata */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-black-100 pb-6 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-orange-50 border border-brand-orange-100 flex items-center justify-center font-bold text-brand-orange-600 text-sm">
                                  {post.userid?.substring(0, 2).toUpperCase() || "AU"}
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-black-500">Written by</p>
                                    <p className="text-sm font-semibold text-neutral-black-900">Author ({post.userid?.substring(0, 8)})</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-neutral-black-500">
                                <span>📅 Date Published</span>
                                <span>⏱️ 5 min read</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-neutral-black-950 tracking-tight mb-8 leading-tight">
                            {post.title}
                        </h1>

                        {/* Rich Content Area */}
                        <div className="editorial-prose mb-10">
                            {parse(post.content)}
                        </div>

                        {/* Author Actions */}
                        {isAuthor && (
                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-black-100">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-5 py-2 rounded-lg text-xs font-semibold text-brand-orange-600 border border-brand-orange-200 hover:bg-brand-orange-50 hover:border-brand-orange-500 transition-all duration-150 cursor-pointer">
                                        Edit Post
                                    </button>
                                </Link>
                                <button 
                                    onClick={deletePost}
                                    className="px-5 py-2 rounded-lg text-xs font-semibold text-neutral-black-600 border border-neutral-black-200 hover:bg-neutral-black-50 hover:border-neutral-black-400 transition-all duration-150 cursor-pointer"
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