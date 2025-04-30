"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Modificar a interface LeadCaptureModalProps para incluir o webhook
interface LeadCaptureModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  telegramLink: string
  webhookUrl: string
}

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

// Atualizar a função para receber o webhook como prop
export function LeadCaptureModal({ isOpen, onOpenChange, telegramLink, webhookUrl }: LeadCaptureModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [utmParams, setUtmParams] = useState<UTMParams>({})
  const router = useRouter()
  const { toast } = useToast()

  // Função para extrair parâmetros UTM da URL
  const getUTMParams = () => {
    if (typeof window === "undefined") return {}

    const params = new URLSearchParams(window.location.search)
    const utmParams: UTMParams = {}

    // Lista de parâmetros UTM que queremos capturar
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

    utmKeys.forEach((key) => {
      const value = params.get(key)
      if (value) {
        utmParams[key as keyof UTMParams] = value
      }
    })

    return utmParams
  }

  // Capturar parâmetros UTM quando o componente montar
  useEffect(() => {
    setUtmParams(getUTMParams())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validação básica dos campos
      if (!email.trim() || !phone.trim()) {
        throw new Error("Por favor, preencha todos os campos")
      }

      // Preparar dados para envio
      const formData = {
        email: email.trim(),
        phone: phone.trim(),
        source: window.location.href,
        timestamp: new Date().toISOString(),
        // Incluir parâmetros UTM
        ...utmParams,
      }

      // Enviar os dados para o webhook
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        console.log("Dados enviados com sucesso para o webhook")
      } catch (webhookError) {
        // Apenas registrar o erro, mas continuar com o redirecionamento
        console.error("Erro ao enviar dados para o webhook:", webhookError)
      }

      // Limpar o formulário
      setEmail("")
      setPhone("")

      // Fechar o modal
      onOpenChange(false)

      // Redirecionar imediatamente para o Telegram
      window.location.href = telegramLink
    } catch (error) {
      console.error("Erro ao processar formulário:", error)
      toast({
        title: "Erro",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.",
        variant: "destructive",
      })
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
