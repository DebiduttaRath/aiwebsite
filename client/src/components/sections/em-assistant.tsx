import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";

export default function EMAssistant() {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!open || !iframeRef.current) return;
    iframeRef.current.src = `https://earthminds-ai-assistant.streamlit.app/?embed=true&embed_options=disable_scrolling=true&hide_footer=true&embedded=true&hide_streamlit_footer=true#noFooter=1&hideFooter=1`;
  }, [open]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="
              rounded-full 
              h-20 w-20 p-0
              shadow-xl
              hover:shadow-2xl
              bg-gradient-to-br from-blue-600 to-purple-600
              hover:from-blue-700 hover:to-purple-700
              transition-all
              duration-300
              hover:scale-110
              hover:animate-none
              group
              flex items-center justify-center
            "
          >
            <Bot
              style={{ width: "2.5rem", height: "2.5rem" }}
              className="transition-transform group-hover:rotate-12"
            />
            <span className="sr-only">AI Assistant</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="
            w-[90vw] 
            h-[90vh]
            max-w-[1400px]
            max-h-[900px]
            p-0
            overflow-hidden
          "
        >
          <div className="flex flex-col h-full">
            <DialogHeader className="p-4 border-b">
              <DialogTitle
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                  style={{ borderRadius: 50 }}
                />
                <span className="gradient-text">EarthMinds </span>AI Assistant
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 relative">
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src="https://earthminds-ai-assistant.streamlit.app/?embed=true"
                  className="absolute top-0 left-0 w-full h-full border-none"
                  title="EarthMinds AI Assistant"
                  loading="eager"
                  allow="camera;microphone"
                />
              </div>

              <div
                className="
                absolute bottom-0 left-0 right-0 
                h-[40px] bg-background z-10 
                pointer-events-none
                bg-gradient-to-t from-background to-transparent
              "
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
