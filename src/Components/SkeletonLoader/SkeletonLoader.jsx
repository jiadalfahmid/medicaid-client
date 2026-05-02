import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="flex flex-col gap-4 w-full bg-base-100 p-4 rounded-xl shadow-sm animate-pulse border border-base-200">
            <div className="h-40 w-full bg-slate-200 rounded-lg"></div>
            <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
            <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
            <div className="flex justify-between mt-4">
              <div className="h-8 w-16 bg-slate-200 rounded"></div>
              <div className="h-8 w-24 bg-slate-200 rounded"></div>
            </div>
          </div>
        );
      case 'row':
        return (
          <div className="flex items-center gap-4 w-full bg-base-100 p-4 rounded-xl shadow-sm animate-pulse border border-base-200">
            <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
              <div className="h-3 w-1/4 bg-slate-200 rounded"></div>
            </div>
            <div className="h-8 w-20 bg-slate-200 rounded"></div>
          </div>
        );
      case 'chart':
        return (
          <div className="w-full bg-base-100 p-6 rounded-xl shadow-sm animate-pulse border border-base-200">
            <div className="h-4 w-1/4 bg-slate-200 rounded mb-6"></div>
            <div className="h-64 w-full bg-slate-200 rounded-lg"></div>
          </div>
        );
      default:
        return <div className="h-8 w-full bg-slate-200 rounded animate-pulse"></div>;
    }
  };

  return (
    <div className={`grid gap-4 ${type === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>{renderSkeleton()}</React.Fragment>
      ))}
    </div>
  );
};

export default SkeletonLoader;
