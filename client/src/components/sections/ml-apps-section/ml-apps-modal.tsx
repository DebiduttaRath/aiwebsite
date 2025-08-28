import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MLApp } from "@/data/mlApps";
import { X } from "lucide-react";

interface MLAppsModalProps {
  app: MLApp | null;
  isOpen: boolean;
  onClose: () => void;
  remainingTime?: number;
  hasExpired?: boolean;
}

export default function MLAppsModal({
  app,
  isOpen,
  onClose,
  remainingTime,
  hasExpired,
}: MLAppsModalProps) {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[90vw] 
            h-[90vh]
            max-w-[1400px]
            max-h-[900px]
            p-0
            overflow-hidden
            [&>button.absolute]:hidden"
      >
        <div className="flex flex-col h-full">
          <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-3">
              <span className="text-2xl">{app.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{app.title}</h2>
                <p className="text-sm font-normal">{app.description}</p>
              </div>
            </DialogTitle>

            <div className="flex items-center gap-4">
              {hasExpired && (
                <p className="text-sm font-semibold text-red-300 whitespace-nowrap">
                  ⏳ Maximum time usage reached
                </p>
              )}
              {remainingTime !== undefined && !hasExpired && (
                <div className="text-sm font-bold px-3 py-1 rounded-full bg-slate-700 text-white shadow-sm animate-pulse">
                  ⏳ {remainingTime}s
                </div>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="flex-1 relative bg-slate-900">
            {!hasExpired && (
              <iframe
                src={app.url}
                className="absolute top-0 left-0 w-full h-full border-none"
                title={app.title}
                loading="eager"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            )}

            {hasExpired && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">⏰</div>
                  <h3 className="text-2xl font-bold mb-2">Session Expired</h3>
                  <p className="text-slate-300">
                    Maximum usage time reached for this application.
                  </p>
                </div>
              </div>
            )}

            {app.isStreamlit && (
              <div
                className="
                  absolute bottom-0 left-0 right-0 
                  h-[40px] bg-background z-10 
                  pointer-events-none
                  bg-gradient-to-t from-background to-transparent
                "
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
