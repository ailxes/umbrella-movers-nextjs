"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="relative overflow-hidden aspect-[4/3]">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-destructive font-semibold text-sm hover:gap-3 transition-all group/link"
        >
          Read Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
