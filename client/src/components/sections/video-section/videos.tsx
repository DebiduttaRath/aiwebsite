import { useState } from "react";
import VideoCard from "./video-card";
import VideoModal from "./video-modal";
import { VideoItem } from "../../types";
import bgVideo from "../../../assets/video_bg_video.mp4";
import "./videos.css";

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const videos: VideoItem[] = [
    {
      id: 1,
      title: "AirVisions",
      thumbnail: "/video_preview/demo_air_drawing.png",
      videoUrl: "/work_videos/demo_air_drawing.mp4",
      description:
        "Turning invisible ideas into fluid, limitless sketches in motion.",
    },
    {
      id: 2,
      title: "Video Object Detector",
      thumbnail: "/video_preview/demo_video_object_detection.png",
      videoUrl: "/work_videos/demo_video_object_detection.mp4",
      description: "Identification of real world objects from video",
    },
    {
      id: 3,
      title: "Human Pose Detector",
      thumbnail: "/video_preview/demo_pose_detection.png",
      videoUrl: "/work_videos/demo_pose_detection.mp4",
      description: "Identification of human movements",
    },
    {
      id: 4,
      title: "Image Object Detector",
      thumbnail: "/video_preview/demo_image_object_detection.png",
      videoUrl: "/work_videos/demo_image_object_detection.mp4",
      description: "Identification of real world objects from image",
    },
    {
      id: 5,
      title: "Video Object Detector",
      thumbnail: "/video_preview/demo_video_object_detection_02.png",
      videoUrl: "/work_videos/demo_video_object_detection_02.mp4",
      description: "Identification of real world objects from video",
    },
  ];

  return (
    <section
      id="video-odyssey"
      className="relative py-24 min-h-[60vh] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
          <img src="/fallback-image.jpg" alt="Background" />
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">EarthMinds</span> Odyssey
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            A journey through technology and ideas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onVideoSelect={setSelectedVideo}
            />
          ))}
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
