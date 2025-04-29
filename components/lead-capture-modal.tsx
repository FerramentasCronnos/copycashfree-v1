"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

// Modificar a interface LeadCaptureModalProps para incluir o webhook
interface LeadCaptureModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  telegramLink: string
  webhookUrl: string
}

// Atualizar a função para receber o webhook como prop
export function LeadCaptureModal({ isOpen, onOpenChange, telegramLink, webhookUrl }: LeadCaptureModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar os dados para o webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          source: window.location.href,
          timestamp: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar dados para o webhook")
      }

      // Redireciona para o link do Telegram
      window.location.href = telegramLink
    } catch (error) {
      console.error("Erro ao enviar dados:", error)
      alert("Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Adicionar o campo de nome ao formulário
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Acesse o Grupo Exclusivo</DialogTitle>
          <DialogDescription className="text-center">
            Preencha seus dados para ter acesso ao Copy Cash e copiar as minhas operações
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Seu telefone com DDD"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "ACESSAR AGORA"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
