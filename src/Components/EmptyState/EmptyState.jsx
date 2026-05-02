import { PackageOpen } from "lucide-react";

const EmptyState = ({ message = "No items found", subMessage, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-4 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
      <div className="p-4 mb-4 bg-gray-100 rounded-full text-gray-400">
        <PackageOpen className="w-12 h-12" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{message}</h3>
      {subMessage && <p className="mb-6 text-gray-500">{subMessage}</p>}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-full bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
