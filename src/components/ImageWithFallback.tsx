import React, { useState, useEffect, useRef } from 'react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackComponent?: React.ReactNode;
  aspectRatioClass?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  rootMargin?: string;
  threshold?: number;
  onLoadCallback?: () => void;
}

export const ImageWithFallback: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackComponent,
  aspectRatioClass = 'aspect-[16/10]',
  className = '',
  imgClassName = '',
  priority = false,
  rootMargin = '250px 0px',
  threshold = 0.01,
  onLoadCallback,
  ...props
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    // If browser lacks IntersectionObserver support, load immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const currentEl = containerRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(currentEl);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [priority, rootMargin, threshold]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoadCallback) {
      onLoadCallback();
    }
  };

  const handleImageError = () => {
    setHasError(true);
  };

  if (hasError && fallbackComponent) {
    return (
      <div className={`relative overflow-hidden ${aspectRatioClass} ${className}`}>
        {fallbackComponent}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#EBF3F5] ${aspectRatioClass} ${className}`}
    >
      {/* Shimmer skeleton placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAF2F4] via-[#F6FAFA] to-[#EAF2F4] animate-pulse pointer-events-none z-0" />
      )}

      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  );
};

export const LazyImage = ImageWithFallback;
