"use client"

import { Button } from "@/components/ui/button"

interface KeypadProps {
  onPress: (key: string) => void
}

export function Keypad({ onPress }: KeypadProps) {
  const keys = [
    "7", "8", "9",
    "4", "5", "6",
    "1", "2", "3",
    "C", "0", "Enter"
  ]

  return (
    <div className="grid grid-cols-3 gap-2 max-w-[250px] sm:max-w-[300px] mx-auto">
      {keys.map((key) => (
        <Button
          key={key}
          variant={key === "Enter" ? "default" : "outline"}
          className="aspect-square text-base sm:text-lg font-medium p-2 sm:p-4"
          onClick={() => onPress(key)}
        >
          {key}
        </Button>
      ))}
    </div>
  )
}

