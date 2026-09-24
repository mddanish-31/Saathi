import React from 'react';
import { Calendar } from 'lucide-react';
import { ReviewItem } from '../../types';
import { Rating } from '../ui/Rating';
import { Avatar } from '../ui/Avatar';

interface ReviewSectionProps {
  reviews: ReviewItem[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  averageRating,
  totalReviews,
  className = '',
}) => {
  return (
    <div className={`saathi-review-section ${className}`}>
      {/* Overview Rating Header Card */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-6)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--bg-surface-soft)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          marginBottom: 'var(--space-8)',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '3rem',
              fontWeight: 700,
              color: 'var(--text-headings)',
              lineHeight: 1,
              marginBottom: 'var(--space-2)',
            }}
          >
            {averageRating.toFixed(1)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-2)' }}>
            <Rating value={averageRating} size="md" />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            Based on {totalReviews} client reviews (Demo Data)
          </p>
        </div>

        {/* Rating Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => Math.floor(r.rating) === stars).length;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div
                key={stars}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ width: '45px', textAlign: 'right', fontWeight: 600 }}>
                  {stars} Star
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      backgroundColor: 'var(--saathi-maroon)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                </div>
                <span style={{ width: '25px', color: 'var(--text-muted)' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {reviews.map((rev) => (
          <div
            key={rev.id}
            style={{
              padding: 'clamp(var(--space-5), 3vw, var(--space-6))',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Reviewer Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Avatar name={rev.authorName} size="md" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: 'var(--text-headings)',
                      }}
                    >
                      {rev.authorName}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    <span>{rev.eventType}</span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Calendar size={11} />
                      {rev.date}
                    </span>
                  </div>
                </div>
              </div>

              <Rating value={rev.rating} size="sm" showValue />
            </div>

            {/* Comment Body */}
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                fontStyle: 'italic',
              }}
            >
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
