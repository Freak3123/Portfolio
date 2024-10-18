"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: (string | JSX.Element)[]; // Accept an array of strings or JSX elements
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {words.map((word, idx) => {
          // Check if the word is a string
          const isString = typeof word === 'string';
          return (
            <motion.span
              key={idx} // Use index as key
              className={cn("opacity-0", {
                'text-purple-500': isString && word.includes("Interactive Web Solutions"), // Apply purple class conditionally
                'dark:text-white text-black': !(isString && word.includes("Interactive Web Solutions")),
              })}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {isString ? word : word}{" "} {/* Render the word or JSX element */}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};