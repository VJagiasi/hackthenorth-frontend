import type React from "react"
import { motion } from "framer-motion"
import type { TEvent } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EventTileProps {
  event: TEvent
  onClick: () => void
}

export const EventTile: React.FC<EventTileProps> = ({ event, onClick }) => {
  const formatEventType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatTimeRange = (start: number, end: number) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} ${startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  const getTagStyles = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-[#4C51BF] text-white" // Primary purple
      case "activity":
        return "bg-[#ED64A6] text-white" // Secondary pink
      case "tech_talk":
        return "bg-[#38B2AC] text-white" // Accent teal
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatSpeakers = (speakers: TEvent['speakers']) => {
    if (speakers.length === 1) {
      return `Speaker: ${speakers[0].name}`
    }
    return `Speakers: ${speakers.map(s => s.name).join(', ')}`
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      whileDrag={{ scale: 1.05, zIndex: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer group p-4 sm:p-6 transition-all duration-300 rounded-2xl sm:rounded-[32px] border border-[#E5E7EB] hover:border-primary/20 relative overflow-hidden bg-white shadow-sm hover:shadow-lg" 
        onClick={onClick}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="font-semibold text-lg sm:text-xl text-gray-900 group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm">
            <span className={`font-medium px-3 py-1 sm:px-4 sm:py-1.5 rounded-full ${getTagStyles(event.event_type)}`}>
              {formatEventType(event.event_type)}
            </span>
            <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black text-white font-medium shadow-sm">
              {formatTimeRange(event.start_time, event.end_time)}
            </span>
          </div>

          {event.speakers.length > 0 && (
            <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600">Speaker:</span>
                  {speaker.profile_pic && (
                    <div className="relative">
                      <Avatar className="h-8 w-8 sm:h-12 sm:w-12 border-2 border-white shadow-lg rounded-full overflow-hidden">
                        <AvatarImage 
                          src={speaker.profile_pic} 
                          alt={speaker.name}
                          className="object-cover"
                        />
                      </Avatar>
                      <div className="absolute inset-0 rounded-full border-2 border-gray-100" />
                    </div>
                  )}
                  <span className="text-xs sm:text-sm text-gray-600">{speaker.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}