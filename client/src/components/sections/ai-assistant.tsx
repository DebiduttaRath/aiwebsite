import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);

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
            "
          >
            <Bot className="h-10 w-10 transition-transform group-hover:rotate-12" />
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
              <DialogTitle>Earthminds AI Assistant</DialogTitle>
            </DialogHeader>
            <div className="flex-1 relative">
              <iframe
                src="https://earthminds-ai-assistant.streamlit.app/?embed=true&embed_options=show_colored_line&hide_streamlit_footer=true"
                className="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-full
                  border-none
                "
                title="Earthminds AI Assistant"
                loading="eager"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
