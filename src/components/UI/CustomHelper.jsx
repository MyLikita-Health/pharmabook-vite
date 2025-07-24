import React from "react";

function CustomHelper() {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 shadow-lg border border-slate-600">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Shortcuts
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-200">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>
            <span>Add to cart</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-200">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">E</kbd>
            <span>Edit</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-200">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">F2</kbd>
            <span>Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomHelper;
