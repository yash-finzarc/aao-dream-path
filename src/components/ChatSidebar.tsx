import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  MessageSquare, 
  History, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Menu,
  Trash2,
  Edit
} from "lucide-react";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface ChatSidebarProps {
  onNewChat: () => void;
}

const ChatSidebar = ({ onNewChat }: ChatSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatHistory] = useState<ChatHistoryItem[]>([
    {
      id: "1",
      title: "Engineering Colleges",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      preview: "Best engineering colleges in India with JEE cutoffs..."
    },
    {
      id: "2",
      title: "MBA Programs Europe",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      preview: "MBA programs in Europe under 15 lakhs budget..."
    },
    {
      id: "3",
      title: "Medical Colleges NEET",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      preview: "Medical colleges with low NEET cutoffs and fees..."
    },
    {
      id: "4",
      title: "Study Abroad Guide",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      preview: "Complete guide to studying abroad with scholarships..."
    },
  ]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-80'} glass-card border-0 border-r border-border/30 flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">Chats</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-foreground-muted hover:text-primary"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* New Chat Button */}
        <Button
          onClick={onNewChat}
          className={`${isCollapsed ? 'w-10 h-10 p-0' : 'w-full'} btn-gradient-primary flex items-center justify-center space-x-2`}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span>New Chat</span>}
        </Button>
      </div>

      {!isCollapsed && (
        <>
          <Separator className="bg-border/30" />

          {/* Chat History */}
          <div className="flex-1 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <History className="h-4 w-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground-muted">Recent Chats</span>
              </div>
            </div>

            <ScrollArea className="flex-1 px-2">
              <div className="space-y-1">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="group relative p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors duration-200"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground truncate">{chat.title}</h4>
                        <span className="text-xs text-foreground-muted flex-shrink-0 ml-2">
                          {formatTimestamp(chat.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                        {chat.preview}
                      </p>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-foreground-muted hover:text-primary"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-foreground-muted hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator className="bg-border/30" />

          {/* Footer Actions */}
          <div className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground-muted hover:text-primary hover:bg-accent/50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground-muted hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </>
      )}

      {/* Collapsed State */}
      {isCollapsed && (
        <div className="flex-1 flex flex-col items-center space-y-4 p-2">
          {chatHistory.slice(0, 3).map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              size="icon"
              className="w-10 h-10 text-foreground-muted hover:text-primary hover:bg-accent/50 relative"
              title={chat.title}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;