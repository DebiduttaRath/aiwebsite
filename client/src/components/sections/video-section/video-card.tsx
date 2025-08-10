import { VideoItem } from "../../types";
import "./videos.css";

interface VideoCardProps {
  video: VideoItem;
  onVideoSelect: (video: VideoItem) => void;
}

export default function VideoCard({ video, onVideoSelect }: VideoCardProps) {
  return (
    <div
      className="video-card group rounded-lg overflow-hidden cursor-pointer relative h-full"
      onClick={() => onVideoSelect(video)}
      aria-label={`Watch video: ${video.title}`}
    >
      <div className="relative pt-[56.25%]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:bg-opacity-90 transition-all duration-300 shadow-lg">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-lg font-semibold text-white">
          <span className="gradient-text">earthminds </span>
          {video.title}
        </h3>
        {video.description && (
          <div className="overflow-hidden max-h-0 group-hover:max-h-[100px] transition-all duration-500 ease-in-out">
            <p className="text-gray-200 mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
              {video.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
