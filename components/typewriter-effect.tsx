"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypewriterEffectProps {
  words: {
    text: string
    className?: string
  }[]
  delay?: number
  cursor?: boolean
}

export default function TypewriterEffect({ words, delay = 1500, cursor = true }: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current word being processed
      const currentWord = words[currentWordIndex].text

      // If deleting
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        setTypingSpeed(50) // Faster when deleting
      } else {
        // If typing
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        setTypingSpeed(150) // Normal typing speed
      }

      // If word is complete and not deleting yet
      if (!isDeleting && currentText === currentWord) {
        // Pause at the end of typing a word
        setTimeout(() => setIsDeleting(true), delay)
      }
      // If deletion is complete
      else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        // Move to the next word
        setCurrentWordIndex((currentWordIndex + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, delay, typingSpeed])

  return (
    <div className="flex items-center justify-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
        >
          <span className={words[currentWordIndex].className}>{currentText}</span>
          {cursor && <span className="animate-blink ml-1 inline-block h-8 w-[3px] bg-primary" />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

