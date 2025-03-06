import React from 'react'
import { useLoadingStore } from '../../store/loadingStore';

const Loading = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-2xl flex flex-col items-center transform transition-all duration-300 scale-100 hover:scale-105">

        <div className="flex space-x-2 mb-4">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>

        <p className="mt-4 text-gray-700 font-semibold tracking-wide">
          Procesando solicitud...
        </p>
      </div>
    </div>
  );
};

export default Loading;
