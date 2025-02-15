import { Search } from "lucide-react"

export function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
      <div className="bg-muted/50 p-4 rounded-full mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
      <p className="text-muted-foreground text-center max-w-sm">
        Looks like these events got caught in an infinite loop! 🔄 Try different filters to debug this situation.
      </p>
      <p className="text-sm text-muted-foreground mt-2 italic">
        (Error 404: Events temporarily stuck in the dev branch) 
      </p>
    </div>
  )
} 