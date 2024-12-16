"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function Toggle({ checked, onCheckedChange }: ToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="power" checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor="power">Power {checked ? "On" : "Off"}</Label>
    </div>
  )
}

