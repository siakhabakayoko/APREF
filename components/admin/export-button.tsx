"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ExportButtonProps {
    data: any[]
    filename?: string
}

export function ExportButton({ data, filename = "export.csv" }: ExportButtonProps) {
    const handleExport = () => {
        if (!data || !data.length) return

        // Get headers
        const headers = Object.keys(data[0])

        // Create CSV content
        const csvContent = [
            headers.join(","),
            ...data.map(row =>
                headers.map(fieldName => {
                    const value = row[fieldName]
                    // Handle specific types or escape quotes
                    return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
                }).join(",")
            )
        ].join("\n")

        // Create download link
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", filename)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Button variant="outline" size="sm" onClick={handleExport} disabled={!data || data.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Exporter CSV
        </Button>
    )
}
