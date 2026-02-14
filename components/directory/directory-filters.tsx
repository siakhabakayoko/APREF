"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export function DirectoryFilters() {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = "/directory"

    // Simple debounce implementation
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q")?.toString() || "")

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams)
            if (searchTerm) {
                params.set("q", searchTerm)
            } else {
                params.delete("q")
            }
            replace(`${pathname}?${params.toString()}`)
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm, replace, pathname, searchParams])

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Rechercher un membre par nom, rôle ou pays..."
                    className="pl-8"
                    defaultValue={searchParams.get("q")?.toString()}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* Future: Add Country/Region Select here */}
        </div>
    )
}
