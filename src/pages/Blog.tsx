import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Managing Stress in Ministry",
      excerpt: "Practical tips for pastors and church workers to maintain mental health while serving.",
      date: "March 15, 2026",
      author: "Dr. Simon Priestley",
      category: "Mental Health"
    },
    {
      id: 2,
      title: "Nutrition for Long Services",
      excerpt: "What to eat before and after long church services to maintain energy levels.",
      date: "March 10, 2026",
      author: "Nurse Jennifer Enwerem",
      category: "Wellness"
    },
    {
      id: 3,
      title: "First Aid Basics Every Usher Should Know",
      excerpt: "Essential skills for handling common medical situations during service.",
      date: "March 5, 2026",
      author: "Paramedic Christiana Ekremide",
      category: "First Aid"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">Health & Wellness Blog</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Articles, tips, and resources to help our community stay healthy and serve better.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-brand-secondary/30 transition-colors flex flex-col">
            <div className="h-48 bg-white/5 flex items-center justify-center text-text-secondary/30">
              <span className="text-sm">Image Placeholder</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-secondary border border-brand-primary/30">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <User className="w-3 h-3" /> {post.author}
                </div>
                <button className="text-brand-secondary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center pt-8 border-t border-white/10">
        <p className="text-text-secondary">More articles coming soon...</p>
      </div>
    </div>
  );
}
