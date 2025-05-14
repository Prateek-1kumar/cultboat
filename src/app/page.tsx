"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
// @ts-ignore
import React, { useEffect, useState, useMemo, useCallback } from "react";

export default function Home() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Mouse position state for water cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Update cursor position on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);
  
  // Add global mouse move listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);
  
  // Enhanced scroll handling with explicit container
  const { scrollYProgress } = useScroll({
    // smooth: 0.15 // Add smooth scrolling effect - not supported in this version
  });
  
  // Enhanced transform values with better easing and GPU acceleration
  const leftColumnY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  
  // More refined horizontal scroll for the navigation
  const navScrollX = useTransform(scrollYProgress, [0, 1], ["5%", "-80%"]);
  
  // Custom image paths - organized by left and right columns
  const imagePathsLeft = useMemo(() => [
    "/images/design9.jpeg",
    "/images/design11.jpeg",
    "/images/design13.jpeg",
    "/images/design16.jpeg",
    "/images/design18.jpeg",
    "/images/design7.jpeg", 
    "/images/design5.jpeg",
    "/images/design3.jpeg",
    "/images/design1.jpeg", // Last item will be shown first with flex-col-reverse
  ], []);
  
  const imagePathsRight = useMemo(() => [
    "/images/design2.jpeg", // First item will be shown first with flex-col
    "/images/design4.jpeg",
    "/images/design6.jpeg",
    "/images/design8.jpeg",
    "/images/design10.jpeg",
    "/images/design14.jpeg",
    "/images/design17.jpeg",
    "/images/design3.jpeg", 
    "/images/design5.jpeg", 
  ], []);
  
  // Generate image cards for left column
  const leftColumnImages = useMemo(() => imagePathsLeft.map((src, i) => ({
    id: i,
    src,
    alt: `Design image ${i + 1}`,
    category: "design",
  })), [imagePathsLeft]);
  
  // Generate image cards for right column
  const rightColumnImages = useMemo(() => imagePathsRight.map((src, i) => ({
    id: i,
    src,
    alt: `Design image ${i + 10}`,
    category: "design",
  })), [imagePathsRight]);

  // Navigation items with sections
  const navItems = useMemo(() => ["PR", "DESIGN", "SOCIAL"], []);
  
  // Update active section based on scroll position - memoized callback
  const handleScrollChange = useCallback((value: number) => {
    const newIndex = Math.floor(value * navItems.length);
    if (newIndex !== activeIndex && newIndex < navItems.length) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex, navItems.length]);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(handleScrollChange);
    return () => unsubscribe();
  }, [scrollYProgress, handleScrollChange]);

  // Add scroll behavior to html and body with performance optimizations
  useEffect(() => {
    // Apply CSS to optimize rendering performance
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    
    // Add a class to optimize CSS transitions and animations
    document.documentElement.classList.add('smooth-scroll');
    
    // Add will-change hint for better performance
    const style = document.createElement('style');
    style.innerHTML = `
      .transform-gpu {
        will-change: transform;
        transform: translateZ(0);
      }
      .smooth-scroll {
        scroll-behavior: smooth;
      }
      @media (prefers-reduced-motion: reduce) {
        .smooth-scroll {
          scroll-behavior: auto;
        }
      }
      body {
        cursor: none; /* Hide default cursor */
      }
      .water-cursor {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.documentElement.classList.remove('smooth-scroll');
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      {/* Water-like cursor effect */}
      <motion.div 
        className="water-cursor fixed pointer-events-none z-50 transform-gpu"
        animate={{ 
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ 
          type: "spring", 
          damping: 15, 
          stiffness: 150, 
          mass: 0.1 
        }}
        style={{
          left: 0,
          top: 0,
          marginLeft: "-20px",
          marginTop: "-20px"
        }}
      >
        {/* Main ripple */}
        <motion.div 
          className="absolute rounded-full bg-blue-400/30 backdrop-blur-sm"
          style={{ width: "40px", height: "40px" }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary ripple */}
        <motion.div 
          className="absolute rounded-full bg-blue-300/40"
          style={{ width: "20px", height: "20px", left: "10px", top: "10px" }}
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
            delay: 0.2,
          }}
        />
        
        {/* Center dot */}
        <motion.div 
          className="absolute rounded-full bg-white/80 backdrop-blur-md shadow-lg"
          style={{ width: "10px", height: "10px", left: "15px", top: "15px" }}
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Background Image Grid - Increased opacity for better visibility */}
      <div className="fixed inset-0 -z-10 opacity-50">
        <div className="grid grid-cols-2 gap-4 h-screen overflow-hidden">
          {/* Left Column - Scrolls Down */}
          <motion.div 
            className="flex flex-col-reverse gap-4 transform-gpu" 
            style={{ y: leftColumnY }}
          >
            {leftColumnImages.map((img) => (
              <div 
                key={`left-${img.id}`} 
                className="w-full h-64 overflow-hidden rounded-lg transform-gpu"
                data-category={img.category}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1600}
                  height={900}
                  className="object-cover w-full h-full scale-[1.02]"
                  priority={img.id < 2}
                />
              </div>
            ))}
          </motion.div>
          
          {/* Right Column - Scrolls Up */}
          <motion.div 
            className="flex flex-col gap-4 pt-16 transform-gpu" 
            style={{ y: rightColumnY }}
          >
            {rightColumnImages.map((img) => (
              <div 
                key={`right-${img.id}`} 
                className="w-full h-64 overflow-hidden rounded-lg transform-gpu"
                data-category={img.category}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1600}
                  height={900}
                  className="object-cover w-full h-full scale-[1.02]"
                  priority={img.id < 2}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-50 bg-neutral-900/20 transform-gpu">
          <span className="text-2xl font-light">AQ</span>
          <button className="w-6 h-4 flex flex-col justify-between" aria-label="Menu">
            <span className="block h-[2px] bg-neutral-100" />
            <span className="block h-[2px] bg-neutral-100" />
          </button>
        </header>

        {/* Fixed Navigation Bar with enhanced connection to scroll */}
        <section className="fixed top-1/2 left-0 w-full -translate-y-1/2 z-40 py-8 overflow-hidden bg-neutral-800/50 transform-gpu">
          <motion.div 
            className="flex items-center space-x-24 px-20 transform-gpu"
            style={{ x: navScrollX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8,
              type: "spring", 
              stiffness: 100,
              bounce: 0.1 // Reduce bounce for smoother animation
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={i}
                className="text-neutral-300 text-5xl font-light whitespace-nowrap hover:text-white focus:text-white transition-colors cursor-pointer transform-gpu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  scale: activeIndex === i ? 1.1 : 1,
                  color: activeIndex === i ? "#ffffff" : "#a3a3a3",
                  textShadow: activeIndex === i ? "0 0 10px rgba(255,255,255,0.5)" : "none"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  mass: 0.8 // Add mass for smoother transitions
                }}
                tabIndex={0}
                aria-label={item.toLowerCase()}
                role="button"
              >
                {item} <span className="text-neutral-500 ml-3">•</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Scroll indicator with dynamic pulse effect */}
          <motion.div 
            className="flex justify-center mt-6 transform-gpu"
            animate={{ 
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror" // Smoother infinite animation
            }}
          >
            <motion.span 
              className="text-2xl transform-gpu"
              animate={{ 
                y: [0, 8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror" // Smoother infinite animation
              }}
            >
              ↓
            </motion.span>
          </motion.div>
        </section>
      </div>
      
      {/* Invisible scroll sections with performance improvements */}
      <div className="relative">
        {/* Sections with minimal DOM content for better performance */}
        {[...Array(5)].map((_, index) => (
          <section 
            key={`section-${index}`} 
            className="h-screen w-full" 
            aria-hidden="true"
          >
            <div className="opacity-0 pointer-events-none sr-only">Section {index + 1}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
