import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/database_services";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import AuthImage from "../components/AuthImage";
import { ArrowLeft, Calendar, Clock, Pencil, Trash2 } from "lucide-react";

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
    <div className="py-12 relative" style={{ backgroundColor: '#0B0B0B', minHeight: '80vh' }}>
      {/* Lime reading progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%`, backgroundColor: '#C8FF2E' }}
      />

      <Container>
        <div className="w-full max-w-3xl mx-auto space-y-8 fade-in">
          {/* Back navigation */}
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-colors duration-150"
              style={{ color: '#6B7280' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C8FF2E'}
              onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
            >
              <ArrowLeft size={15} />
              Back to Articles
            </button>
          </div>

          {/* Cover Image */}
          <div
            className="w-full overflow-hidden relative"
            style={{
              aspectRatio: '16/9',
              borderRadius: '20px',
              border: '1px solid #2B2B2B',
              backgroundColor: '#111111',
              maxHeight: '420px',
            }}
          >
            <AuthImage
              fileId={post.featuredimage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta block */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6"
            style={{ borderBottom: '1px solid #1F1F1F' }}
          >
            {/* Author chip */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(200, 255, 46, 0.1)',
                  border: '2px solid rgba(200, 255, 46, 0.3)',
                  color: '#C8FF2E',
                }}
              >
                {post.userid?.substring(0, 2).toUpperCase() || "AU"}
              </div>
              <div>
                <p className="text-xs" style={{ color: '#6B7280' }}>Written by</p>
                <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                  Author ({post.userid?.substring(0, 8)})
                </p>
              </div>
            </div>

            {/* Reading meta */}
            <div className="flex items-center gap-5 text-xs" style={{ color: '#6B7280' }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                Date Published
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                5 min read
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-5xl font-black leading-tight"
            style={{ color: '#FFFFFF', letterSpacing: '-0.035em' }}
          >
            {post.title}
          </h1>

          {/* Rich content */}
          <div className="editorial-prose">
            {parse(post.content)}
          </div>

          {/* Author Actions */}
          {isAuthor && (
            <div
              className="flex items-center justify-end gap-3 pt-6"
              style={{ borderTop: '1px solid #1F1F1F' }}
            >
              <Link to={`/edit-post/${post.$id}`}>
                <button
                  className="flex items-center gap-1.5 btn-secondary text-xs"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  <Pencil size={13} />
                  Edit Post
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="flex items-center gap-1.5 btn-danger text-xs"
                style={{ padding: '0.5rem 1rem' }}
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}