export interface MLApp {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string[];
  icon: string;
  color: string;
  isStreamlit: boolean;
}

export const mlApps: MLApp[] = [
  {
    id: "earthmind-lens",
    title: "Lens",
    description:
      "Computer vision application for image analysis and object detection",
    url: "https://earthmind-lens.streamlit.app/?embed=true&embed_options=disable_scrolling=true&hide_footer=true",
    category: ["Computer Vision", "NLP"],
    icon: "🔍",
    color: "blue",
    isStreamlit: true,
  },
  {
    id: "earthminds-quantum",
    title: "Quantum",
    description:
      "A next-gen platform that turns noisy data into clarity through intelligent cleaning and visualization",
    url: "https://dataplatform.earthminds.ai/",
    category: ["Data Analytics"],
    icon: "📝",
    color: "green",
    isStreamlit: false,
  },
];

export const categories = [
  "All",
  "Computer Vision",
  "NLP",
  "Predictive Analytics",
  "Data Analytics",
  "Audio AI",
];
