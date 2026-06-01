import { Metadata } from "next";

export function generateHomeMetadata(title: string, description: string, keywords: string): Metadata {
  return {
    title,
    description,
    keywords,
  };
} 