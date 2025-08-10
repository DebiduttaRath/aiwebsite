import { VideoItem } from "../../types";
import "./videos.css";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10 transition-colors"
          aria-label="Close video modal"
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full h-[70vh] bg-black flex items-center justify-center">
          <div className="relative w-full h-full max-w-[1200px] mx-auto">
            <video
              controls
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="mt-4 text-white">
          <h3 className="text-xl font-bold">
            <span className="gradient-text">earthminds </span>
            {video.title}
          </h3>
          {video.description && <p className="mt-2">{video.description}</p>}
        </div>
      </div>
    </div>
  );
}
