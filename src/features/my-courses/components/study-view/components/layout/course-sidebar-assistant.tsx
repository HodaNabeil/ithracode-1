'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseSidebarAssistantProps {
  onStartChat?: () => void;
}

export const CourseSidebarAssistant: React.FC<CourseSidebarAssistantProps> = ({
  onStartChat,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 gap-6">
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="relative size-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
          <Sparkles className="size-10 text-primary" />
        </div>
      </div>
      <div className="space-y-2 max-w-[240px]">
        <h3 className="text-xl font-bold tracking-tight">AI Assistant</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          اسأل أي سؤال حول محتوى الدورة وسأساعدك في الفهم الفوري والتعلم العميق.
        </p>
      </div>
      <Button
        onClick={onStartChat}
        className="rounded-2xl px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        بدء المحادثة
      </Button>
    </div>
  );
};
