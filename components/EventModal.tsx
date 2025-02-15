import type React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { TEvent, TPermission } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EventModalProps {
  event: TEvent | null
  isOpen: boolean
  onClose: () => void
  onRelatedEventClick: (eventId: number) => void
  getRelatedEventNames: (relatedIds: number[]) => { id: number; name: string; permission?: TPermission }[]
  isAuthenticated: boolean
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
  onRelatedEventClick,
  getRelatedEventNames,
  isAuthenticated,
}) => {
  if (!event) return null

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case "workshop":
        return "border-[#4C51BF] text-[#4C51BF] bg-[#4C51BF]/5"
      case "activity":
        return "border-[#ED64A6] text-[#ED64A6] bg-[#ED64A6]/5"
      case "tech_talk":
        return "border-[#38B2AC] text-[#38B2AC] bg-[#38B2AC]/5"
      default:
        return "border-gray-500 text-gray-500 bg-gray-50"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden" hideCloseButton>
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 pb-4">
          <div className="flex flex-col gap-6">
            {/* Title */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {event.name}
            </h2>

            {/* Event Type and Time in same line */}
            <div className="flex items-center gap-3 flex-wrap">
              <span 
                className={`inline-flex px-4 py-1.5 rounded-full text-sm font-medium border-2 w-fit ${getEventTypeStyles(event.event_type)}`}
              >
                {event.event_type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </span>
              <div className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium border-2 border-gray-900 text-gray-900 w-fit">
                {formatDate(event.start_time)} - {formatDate(event.end_time)}
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="px-8 py-6 max-h-[60vh] border-y bg-gray-50/30">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed text-lg">
              {event.description}
            </p>
          </div>
        </ScrollArea>

        <div className="p-8 pt-6 space-y-6">
          {/* Speakers */}
          {event.speakers.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Speakers:</h3>
              <div className="space-y-3">
                {event.speakers.map((speaker, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-5 px-6 py-4 rounded-xl bg-gray-50/50 border border-gray-100"
                  >
                    {speaker.profile_pic && (
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg rounded-full overflow-hidden">
                          <AvatarImage 
                            src={speaker.profile_pic} 
                            alt={speaker.name}
                            className="object-cover"
                          />
                        </Avatar>
                        <div className="absolute inset-0 rounded-full border-2 border-gray-100" />
                      </div>
                    )}
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{speaker.name}</p>
                      {speaker.role && (
                        <p className="text-sm text-gray-600">{speaker.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Events */}
        
          {event.related_events.length > 0 && (
              <div>
                <h4 className="font-semibold">Related Events:</h4>
                <div className="flex flex-wrap gap-2">
                  {getRelatedEventNames(event.related_events)
                    .filter((relatedEvent) => isAuthenticated || relatedEvent.permission !== "private")
                    .map((relatedEvent) => (
                      <Button
                        key={relatedEvent.id}
                        variant="outline"
                        size="sm"
                        onClick={() => onRelatedEventClick(relatedEvent.id)}
                      >
                        {relatedEvent.name}
                      </Button>
                    ))}
                </div>
              </div>
            )}

          {/* Links Section */}
          <div className="flex flex-col gap-2 text-lg">
            {event.public_url && (
              <a
                href={event.public_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Public Link <span className="ml-2">↗</span>
              </a>
            )}
            {isAuthenticated && event.private_url && (
              <a
                href={event.private_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Private Link <span className="ml-2">↗</span>
              </a>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

