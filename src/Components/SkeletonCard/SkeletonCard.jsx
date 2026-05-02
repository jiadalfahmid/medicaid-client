const SkeletonCard = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white shadow-xl rounded-2xl animate-pulse ring-1 ring-black/5">
      <div className="h-48 bg-gray-200"></div>
      <div className="flex flex-col flex-grow p-5 space-y-4">
        <div className="w-2/3 h-6 rounded bg-gray-200"></div>
        <div className="w-1/2 h-4 rounded bg-gray-200"></div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
          <div className="w-1/3 h-6 rounded bg-gray-200"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
