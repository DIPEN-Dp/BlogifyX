import React from 'react'
import appwriteService from '../Appwrite/database_services'
import { Link } from 'react-router-dom'
import AuthImage from './AuthImage'

function PostCard({$id,title,featuredimage}) {
  return (
    <Link to={`/post/${$id}`} className="block h-full">
        <div className='w-full h-full glass-card rounded-2xl p-4 flex flex-col'>
            <div className='w-full overflow-hidden rounded-xl mb-4 aspect-video relative'>
                <AuthImage 
                  fileId={featuredimage} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                <div className="absolute top-3 left-3 bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-purple-300 text-xs px-2.5 py-1 rounded-full font-medium">
                  Article
                </div>
            </div>
            <h2 className='text-lg font-bold text-white mb-2 line-clamp-2 hover:text-purple-400 transition-colors duration-200 flex-1'>{title}</h2>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-2 border-t border-white/5">
                <span>5 min read</span>
                <span className="text-purple-400 font-medium">Read More ➔</span>
            </div>
        </div>
    </Link>
  )
}

export default PostCard