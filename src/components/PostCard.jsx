import React from 'react'
import appwriteService from '../Appwrite/database_services'
import { Link } from 'react-router-dom'
import AuthImage from './AuthImage'
import { Clock, ArrowRight } from 'lucide-react'

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`} className="block h-full group">
      <div
        className="w-full h-full flex flex-col transition-all duration-300 overflow-hidden"
        style={{
          backgroundColor: '#171717',
          border: '1px solid #2B2B2B',
          borderRadius: '24px',
          padding: '0',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.015)';
          e.currentTarget.style.borderColor = 'rgba(200, 255, 46, 0.25)';
          e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.5)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.borderColor = '#2B2B2B';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        <div
          className="w-full overflow-hidden relative"
          style={{ aspectRatio: '16/9', borderRadius: '24px 24px 0 0' }}
        >
          <AuthImage
            fileId={featuredimage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="badge-lime">Article</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h2
            className="text-base font-bold mb-3 line-clamp-2 flex-1 leading-snug tracking-tight transition-colors duration-150"
            style={{ color: '#FFFFFF', letterSpacing: '-0.015em' }}
          >
            {title}
          </h2>

          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid #2B2B2B' }}
          >
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#6B7280' }}>
              <Clock size={12} />
              <span>5 min read</span>
            </div>
            <span
              className="text-xs font-semibold flex items-center gap-1 transition-colors duration-150"
              style={{ color: '#C8FF2E' }}
            >
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard