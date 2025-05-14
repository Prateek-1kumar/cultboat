// Declare global modules
declare module "react" {
  export * from "react";
  export default React;
}

declare module "next/font/google" {
  export function Geist(options: { subsets?: string[]; variable?: string }): {
    className: string;
    style: any;
    variable: string;
  };
  
  export function Geist_Mono(options: { subsets?: string[]; variable?: string }): {
    className: string;
    style: any;
    variable: string;
  };
}

declare module "next/image" {
  import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
  
  export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
  }
  
  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module "framer-motion" {
  import React from "react";
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    whileInView?: any;
    transition?: any;
    className?: string;
  }
  
  export const motion: {
    div: React.FC<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    p: React.FC<MotionProps & React.HTMLAttributes<HTMLParagraphElement>>;
    // Add more as needed
  };
}

declare module "clsx" {
  export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];
  
  export default function clsx(...inputs: ClassValue[]): string;
  
  export function clsx(...inputs: ClassValue[]): string;
}

declare module "tailwind-merge" {
  export function twMerge(...inputs: string[]): string;
}

declare module "tailwindcss-animate" {
  const plugin: any;
  export default plugin;
} 