import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-[#5D4037] dark:border-amber-500 box-content animate-in zoom-in-95 duration-300 group">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 group-hover:scale-110"
          title="Close Video"
        >
          <X size={24} className="transition-transform duration-300 group-hover:rotate-90" />
        </button>

        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
