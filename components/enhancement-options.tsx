'use client'

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Settings, ChevronDown, ChevronRight } from 'lucide-react'
import { EnhancementOptions, ENHANCEMENT_OPTIONS } from "@/types/enhancement"

interface EnhancementOptionsProps {
  options: EnhancementOptions
  onOptionsChange: (options: EnhancementOptions) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function EnhancementOptionsDropdown({
  options,
  onOptionsChange,
  isOpen,
  onOpenChange,
}: EnhancementOptionsProps) {
  const handleOptionChange = (id: keyof EnhancementOptions, checked: boolean) => {
    onOptionsChange({
      ...options,
      [id]: checked,
    })
  }

  return (
    <div className="relative">
      <Collapsible open={isOpen} onOpenChange={onOpenChange}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Settings className="h-4 w-4 mr-2" />
            Options
            {isOpen ? (
              <ChevronDown className="h-4 w-4 ml-2" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute top-full right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-4 space-y-4">
            <h4 className="font-medium text-white mb-3">Enhancement Options</h4>
            <div className="space-y-3">
              {ENHANCEMENT_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label 
                      htmlFor={option.id} 
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      {option.description}
                    </p>
                  </div>
                  <Switch
                    id={option.id}
                    checked={options[option.id]}
                    onCheckedChange={(checked) => handleOptionChange(option.id, checked)}
                    className="ml-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
} 