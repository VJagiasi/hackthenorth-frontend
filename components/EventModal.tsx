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
      <DialogContent 
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] 
          w-[min(calc(100%-32px),500px)]
          max-h-[min(calc(100vh-48px),700px)]
          min-h-[200px]
          rounded-2xl sm:rounded-3xl 
          p-4 sm:p-6 
          overflow-y-auto overflow-x-hidden
          border-0 
          bg-white shadow-xl"
        hideCloseButton
      >
        <button
          onClick={onClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-3 sm:p-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 pr-8 break-words">
              {event.name}
            </h2>

            <div className="flex flex-wrap gap-2">
              <span 
                className={`inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-medium border w-fit ${getEventTypeStyles(event.event_type)}`}
              >
                {event.event_type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </span>
              <div className="inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-gray-900 text-gray-900 w-fit">
                {formatDate(event.start_time)} - {formatDate(event.end_time)}
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="px-3 sm:px-4 py-4 max-h-[40vh] border-y bg-gray-50/30">
          <div className="max-w-full">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
              {event.description}
            </p>
          </div>
        </ScrollArea>

        <div className="p-3 sm:p-4 space-y-4">
          {/* Speakers */}
          {event.speakers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Speakers:</h3>
              <div className="space-y-2">
                {event.speakers.map((speaker, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100"
                  >
                    {speaker.profile_pic && (
                      <div className="relative">
                        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-white shadow-md rounded-full overflow-hidden">
                          <AvatarImage 
                            src={speaker.profile_pic} 
                            alt={speaker.name}
                            className="object-cover"
                          />
                        </Avatar>
                      </div>
                    )}
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-gray-900">{speaker.name}</p>
                      {speaker.role && (
                        <p className="text-xs sm:text-sm text-gray-600">{speaker.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Events */}
          {event.related_events.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">Related Events:</h4>
              <div className="flex flex-wrap gap-2">
                {getRelatedEventNames(event.related_events)
                  .filter((relatedEvent) => isAuthenticated || relatedEvent.permission !== "private")
                  .map((relatedEvent) => (
                    <Button
                      key={relatedEvent.id}
                      variant="outline"
                      size="sm"
                      onClick={() => onRelatedEventClick(relatedEvent.id)}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    >
                      {relatedEvent.name}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

