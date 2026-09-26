import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface SearchBarProps {
  onSearch?: (query: string, location?: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Try "Bridal stylist", "Interior designer", "Candid photographer"...',
  className = '',
  debounceMs = 350,
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All India');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  // Debounced auto-trigger on typing
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!onSearch) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onSearch(query, location);
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, location, debounceMs, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (onSearch) {
      onSearch(query, location);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`saathi-search-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-full)',
        padding: '0.4rem 0.4rem 0.4rem 0.85rem',
        boxShadow: 'var(--shadow-md)',
        width: '100%',
        maxWidth: '740px',
        gap: '0.5rem',
        transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
      }}
    >
      {/* Service / Query input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          flex: '1 1 240px',
          minWidth: '0',
          paddingLeft: '0.35rem',
          paddingRight: '0.5rem',
        }}
      >
        <Search size={18} color="var(--saathi-maroon)" style={{ flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search service or professional"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-sm)',
            width: '100%',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: '0 1 auto',
          gap: '0.5rem',
          marginLeft: 'auto',
        }}
      >
        {/* Location / Scope Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            flex: '0 0 auto',
            paddingRight: '0.5rem',
            borderRight: '1px solid var(--border-subtle)',
            marginRight: '0.25rem',
          }}
        >
          <MapPin size={15} color="var(--text-muted)" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Location selector"
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <option value="All India">All India</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
            <option value="Jaipur">Jaipur</option>
          </select>
        </div>

        {/* Submit CTA */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          rightIcon={<Sparkles size={14} />}
        >
          Search
        </Button>
      </div>
    </form>
  );
};
