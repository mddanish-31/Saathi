import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] bg-[var(--bg-base)] animate-fade-in flex flex-col justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      {/* Header Skeleton */}
      <div className="space-y-4 max-w-xl mb-12">
        <div className="h-8 w-48 bg-[var(--bg-surface)] border border-[var(--border)] rounded-full animate-pulse" />
        <div className="h-10 w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl animate-pulse" />
        <div className="h-4 w-3/4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg animate-pulse" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] p-6 flex flex-col items-center justify-between animate-pulse"
          >
            <div className="w-24 h-24 rounded-full bg-[var(--bg-base)] border border-[var(--border)]" />
            <div className="space-y-2 w-full flex flex-col items-center">
              <div className="h-4 w-32 bg-[var(--bg-base)] rounded-md" />
              <div className="h-3 w-44 bg-[var(--bg-base)] rounded-md" />
            </div>
            <div className="h-8 w-28 rounded-full bg-[var(--bg-base)] border border-[var(--border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
