'use client';

import { Github } from 'lucide-react';

export function GithubLink() {
  return (
    <a
      href="https://github.com/Yukiniro/tickflow"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Github className="h-5 w-5" />
      <span className="sr-only">GitHub 仓库</span>
    </a>
  );
} 