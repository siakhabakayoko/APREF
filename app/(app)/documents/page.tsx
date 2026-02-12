"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Upload, Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Document {
    id: string
    title: string
    type: string
    size: string
    url: string
    created_at: string
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    useEffect(() => {
        fetchDocuments()
    }, [])

    const fetchDocuments = async () => {
        try {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching docs:', error)
            } else {
                setDocuments(data || [])
            }
        } catch (error) {
            console.error('Unexpected error:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        const file = e.target.files[0]
        setUploading(true)

        try {
            const user = (await supabase.auth.getUser()).data.user
            if (!user) throw new Error("User not authenticated")

            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${user.id}/${fileName}`

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath)

            // 3. Save Metadata to DB
            const { error: dbError } = await supabase
                .from('documents')
                .insert({
                    title: file.name,
                    type: fileExt?.toUpperCase() || 'FILE',
                    size: formatFileSize(file.size),
                    url: publicUrl,
                    owner_id: user.id
                })

            if (dbError) throw dbError

            toast.success("Document importé avec succès")
            fetchDocuments()

        } catch (error: any) {
            console.error('Upload failed:', error)
            toast.error("Échec de l'importation: " + error.message)
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleDownload = (doc: Document) => {
        window.open(doc.url, '_blank')
    }

    return (
        <div className="container py-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
                    <p className="text-muted-foreground">Base documentaire partagée.</p>
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    />
                    <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                        {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {uploading ? 'Importation...' : 'Importer'}
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
            ) : documents.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground border border-dashed rounded-lg">
                    Aucun document partagé pour le moment.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {documents.map((doc) => (
                        <Card key={doc.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleDownload(doc)}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium truncate pr-2" title={doc.title}>
                                    {doc.title}
                                </CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-xs text-muted-foreground mt-2">{doc.type} • {doc.size}</div>
                                <p className="text-xs text-muted-foreground mt-1">Ajouté le {new Date(doc.created_at).toLocaleDateString()}</p>
                                <div className="flex gap-2 mt-4">
                                    <Button variant="ghost" size="sm" className="w-full h-8">
                                        <Download className="mr-2 h-3 w-3" /> Télécharger
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
