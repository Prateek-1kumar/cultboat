/// <reference types="react" />
/// <reference types="next" />
/// <reference types="framer-motion" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// React and Next.js type declarations
declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
  }
}

declare module 'next/font/google' {
  export interface FontOptions {
    subsets?: string[];
    variable?: string;
  }

  export function Geist(options: FontOptions): {
    className: string;
    style: any;
    variable: string;
  };

  export function Geist_Mono(options: FontOptions): {
    className: string;
    style: any;
    variable: string;
  };
}

declare module 'next/image' {
  const Image: React.FC<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
  }>;
  export default Image;
}

// Framer Motion
declare module 'framer-motion' {
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    variants?: any;
    className?: string;
    key?: React.Key;
    children?: React.ReactNode;
    style?: any;
  }

  export const motion: {
    div: React.FC<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    span: React.FC<MotionProps & React.HTMLAttributes<HTMLSpanElement>>;
    p: React.FC<MotionProps & React.HTMLAttributes<HTMLParagraphElement>>;
    // Add more elements as needed
  };

  export interface ScrollOptions {
    target?: React.RefObject<HTMLElement>;
    offset?: [string, string];
  }

  export interface MotionValue<T> {
    get(): T;
    set(value: T): void;
    onChange(callback: (value: T) => void): () => void;
  }
  
  export function useScroll(options?: ScrollOptions): { 
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
  };
  
  export function useTransform<T>(
    value: MotionValue<number>,
    inputRange: number[],
    outputRange: T[]
  ): MotionValue<T>;
}

// Utility libraries
declare module 'clsx' {
  export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];
  
  export default function clsx(...inputs: ClassValue[]): string;
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: string[]): string;
}

declare module 'tailwindcss' {
  export interface Config {
    darkMode: string[];
    content: string[];
    theme: any;
    plugins: any[];
  }
}

declare module 'tailwindcss-animate' {
  const plugin: any;
  export default plugin;
} 