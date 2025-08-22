import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X, ScanSearch } from "lucide-react";

export default function EMLens() {
  const [open, setOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300);
  const [hasExpired, setHasExpired] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Restore previous remaining time & expired state
    const storedTime = localStorage.getItem("emLensRemaining");
    const expiredFlag = localStorage.getItem("emLensExpired");

    if (expiredFlag === "true") {
      setHasExpired(true);
    }
    if (storedTime !== null) {
      const timeLeft = parseInt(storedTime, 10);
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    }
  }, []);

  useEffect(() => {
    if (open && !hasExpired) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          const nextTime = prev - 1;
          localStorage.setItem("emLensRemaining", nextTime.toString());

          if (nextTime <= 0) {
            clearInterval(timerRef.current!);
            setHasExpired(true);
            localStorage.setItem("emLensExpired", "true");
            return 0;
          }
          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [open, hasExpired]);

  useEffect(() => {
    if (!open || !iframeRef.current) return;
    iframeRef.current.src = `https://earthmind-lens.streamlit.app/?embed=true&embed_options=disable_scrolling=true&hide_footer=true&embedded=true&hide_streamlit_footer=true#noFooter=1&hideFooter=1`;
  }, [open]);

  return (
    <div className="fixed bottom-8 left-8 z-50">
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
            <ScanSearch
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
            [&>button.absolute]:hidden
          "
        >
          <div className="flex flex-col h-full">
            <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
              {/* Title */}
              <DialogTitle className="flex items-center gap-2">
                🔍 <span className="gradient-text">EarthMinds</span> Lens
              </DialogTitle>

              {/* Right side: Timer or Expired Message + Close Button */}
              <div className="flex items-center gap-4">
                {hasExpired ? (
                  <p className="text-sm font-semibold text-red-500 whitespace-nowrap">
                    ⏳ Maximum time usage reached
                  </p>
                ) : (
                  <div
                    key={remainingTime}
                    className="text-sm font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-800 shadow-sm animate-pulse-once"
                  >
                    ⏳ {remainingTime}s
                  </div>
                )}

                {/* Close Button */}
                <DialogClose className="p-2 rounded-md hover:bg-gray-200 transition-colors">
                  <X className="h-4 w-4" />
                </DialogClose>
              </div>
            </DialogHeader>

            <div className="flex-1 relative">
              <div className="absolute inset-0 overflow-hidden">
                {!hasExpired && (
                  <iframe
                    ref={iframeRef}
                    src="https://earthmind-lens.streamlit.app/?embed=true"
                    className="absolute top-0 left-0 w-full h-full border-none"
                    title="EarthMinds Lens"
                    loading="eager"
                    allow="camera;microphone"
                  />
                )}
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
