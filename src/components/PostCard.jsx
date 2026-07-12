import React from 'react'
import appwriteService from '../Appwrite/database_services'
import { Link } from 'react-router-dom'
import AuthImage from './AuthImage'
import { Clock, ArrowRight } from 'lucide-react'

function PostCard({$id,title,featuredimage}) {
  return (
    <Link to={`/post/${$id}`} className="block h-full group">
        <div className="w-full h-full bg-white border border-neutral-black-200 rounded-xl p-4 flex flex-col transition-all duration-200 hover:border-brand-orange-300 hover:shadow-md">
            <div className="w-full overflow-hidden rounded-xl mb-4 aspect-video relative bg-neutral-black-50">
                <AuthImage 
                  fileId={featuredimage} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" 
                />
                <div className="absolute top-3 left-3 bg-brand-orange-500 text-white text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide uppercase">
                  Article
                </div>
            </div>
            <h2 className="text-lg font-bold text-neutral-black-950 font-heading mb-2 line-clamp-2 group-hover:text-brand-orange-600 transition-colors duration-150 flex-1">
              {title}
            </h2>
            <div className="flex items-center justify-between text-xs text-neutral-black-500 mt-auto pt-3 border-t border-neutral-black-100">
                <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-neutral-black-400" />
                    <span>5 min read</span>
                </div>
                <span className="text-brand-orange-500 font-semibold group-hover:text-brand-orange-600 transition-colors flex items-center gap-1">Read Article <ArrowRight size={14} /></span>
            </div>
        </div>
    </Link>
  )
}

export default PostCard