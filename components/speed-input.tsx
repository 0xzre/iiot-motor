"use client"

import { Input } from "@/components/ui/input"

interface SpeedInputProps {
  value: number
  onChange: (value: number) => void
}

export function SpeedInput({ value, onChange }: SpeedInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
    onChange(newValue)
  }

  return (
    <Input
      type="number"
      value={Math.round(value)}
      onChange={handleChange}
      className="text-center text-base sm:text-lg font-semibold"
      min={0}
      max={100}
    />
  )
}

