"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import type { TEvent, TEventType, TPermission } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventTile } from "@/components/EventTile"
import { EventModal } from "@/components/EventModal"
import { Search } from "lucide-react"
import { Reorder } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { NoResults } from "@/components/NoResults"
import { Footer } from "@/components/Footer"

export default function EventsPage() {
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()
  const [events, setEvents] = useState<TEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<TEvent[]>([])
  const [originalEvents, setOriginalEvents] = useState<TEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<TEventType | "all">("all")
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://api.hackthenorth.com/v3/events")
        const data: TEvent[] = await response.json()

        const sortedEvents = data.sort((a, b) => a.start_time - b.start_time)
        const visibleEvents = isAuthenticated
          ? sortedEvents
          : sortedEvents.filter((event) => event.permission !== "private")

        setEvents(visibleEvents)
        setFilteredEvents(visibleEvents)
        setOriginalEvents(visibleEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [isAuthenticated])

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        (selectedType === "all" || event.event_type === selectedType) &&
        (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredEvents(filtered)
  }, [searchTerm, selectedType, events])

  const handleLogout = () => {
    logout()
    router.push("/")
    setShowLogoutDialog(false)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedType("all")
  }

  const resetSort = () => {
    setEvents([...originalEvents])
    setFilteredEvents([...originalEvents])
  }

  const handleRelatedEventClick = (eventId: number) => {
    const relatedEvent = events.find((e) => e.id === eventId)
    if (relatedEvent) setSelectedEvent(relatedEvent)
  }

  const getRelatedEventNames = (relatedIds: number[]): { id: number; name: string; permission?: TPermission }[] => {
    return relatedIds
      .map((id) => events.find((e) => e.id === id))
      .filter((event): event is TEvent => !!event && (!!isAuthenticated || event.permission !== "private"))
  }

  // Add a function to check if current order matches original order
  const isDefaultOrder = () => {
    return JSON.stringify(filteredEvents) === JSON.stringify(originalEvents.filter(
      event => 
        (selectedType === "all" || event.event_type === selectedType) &&
        (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    ))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading events...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="container max-w-[900px] mx-auto px-8 py-12 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              Events
              <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent mt-1" />
            </h1>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-muted/50 font-medium placeholder:font-normal"
              />
            </div>
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as TEventType | "all")}>
              <SelectTrigger className="w-[160px] font-medium">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-medium">All Types</SelectItem>
                <SelectItem value="workshop" className="font-medium">Workshop</SelectItem>
                <SelectItem value="activity" className="font-medium">Activity</SelectItem>
                <SelectItem value="tech_talk" className="font-medium">Tech Talk</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={resetFilters} className="h-9 px-5">
              Clear Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetSort}
              className="h-9 px-5"
              disabled={isDefaultOrder()}
            >
              Reset Sort
            </Button>
          </div>

          {filteredEvents.length > 0 ? (
            <Reorder.Group axis="y" values={filteredEvents} onReorder={setFilteredEvents} className="space-y-6">
              {filteredEvents.map((event) => (
                <Reorder.Item key={event.id} value={event}>
                  <EventTile event={event} onClick={() => setSelectedEvent(event)} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <NoResults />
          )}
        </div>
      </div>
      <Footer />

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRelatedEventClick={handleRelatedEventClick}
        getRelatedEventNames={getRelatedEventNames}
        isAuthenticated={!!isAuthenticated}
      />

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>You will no longer have access to private events.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

