import type React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { TEvent, TPermission } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { X, ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { motion } from "framer-motion"

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
        return "bg-[#4C51BF] text-white font-medium"
      case "activity":
        return "bg-[#ED64A6] text-white font-medium"
      case "tech_talk":
        return "bg-[#38B2AC] text-white font-medium"
      default:
        return "bg-gray-500 text-white font-medium"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        hideCloseButton
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] 
          w-[calc(100%-2rem)] max-w-[500px]
          max-h-[85vh]
          rounded-2xl sm:rounded-3xl 
          p-0
          border-0 
          bg-white shadow-xl
          overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <ScrollArea className="h-full max-h-[85vh]">
          <div className="p-4 sm:p-6">
            <div className="space-y-6">
              <div className="px-3 sm:px-4">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black pr-8 break-words">
                    {event.name}
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    <span 
                      className={`inline-flex px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm ${getEventTypeStyles(event.event_type)}`}
                    >
                      {event.event_type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                    </span>
                    <div className="inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-black text-white shadow-sm">
                      {formatDate(event.start_time)} - {formatDate(event.end_time)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-3 sm:px-4 py-4 border-y bg-gray-50/30">
                <div className="max-w-full">
                  <p className="text-sm sm:text-base text-black leading-relaxed break-words">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="px-3 sm:px-4 space-y-4">
                {/* Event URLs */}
                <div className="flex gap-6 text-sm">
                  {event.public_url && (
                    <motion.a 
                      href={event.public_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-900 hover:text-primary transition-colors group"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      Public Link
                      <motion.span
                        initial={{ opacity: 0.5 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.span>
                    </motion.a>
                  )}
                  {isAuthenticated && event.private_url && (
                    <motion.a 
                      href={event.private_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-900 hover:text-primary transition-colors group"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      Private Link
                      <motion.span
                        initial={{ opacity: 0.5 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.span>
                    </motion.a>
                  )}
                </div>

                {/* Speakers */}
                {event.speakers.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-black">Speakers:</h3>
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
                            <p className="text-sm sm:text-base font-semibold text-black">{speaker.name}</p>
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
                    <h4 className="text-lg font-semibold text-black">Related Events:</h4>
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
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

