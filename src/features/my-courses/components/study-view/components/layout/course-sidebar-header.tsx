'use client';

import React from 'react';
import { TabsList, TabsTrigger } from '@/components/shared/Tabs';
import { Button } from '@/components/ui/button';
import { Sparkles, X, Maximize2, Minimize2 } from 'lucide-react';

interface CourseSidebarHeaderProps {
  onClose?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

export const CourseSidebarHeader: React.FC<CourseSidebarHeaderProps> = ({
  onClose,
  onMaximize,
  isMaximized,
}) => {
  return (
    <div className="flex items-center justify-between px-2 pt-2 border-b border-border/40">
      <TabsList variant="line" className="h-12 bg-transparent">
        <TabsTrigger
          value="content"
          className="px-4 py-3 gap-2 data-active:text-primary"
        >
          <span>محتوى الدورة</span>
        </TabsTrigger>
        <TabsTrigger
          value="assistant"
          className="px-4 py-3 gap-2 data-active:text-primary"
        >
          <Sparkles className="size-4 text-primary" />
          <span>AI Assistant</span>
        </TabsTrigger>
      </TabsList>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={onMaximize}
        >
          {isMaximized ? (
            <Minimize2 className="size-4" />
          ) : (
            <Maximize2 className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
