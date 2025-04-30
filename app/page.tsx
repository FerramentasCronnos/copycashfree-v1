"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LeadCaptureModal } from "@/components/lead-capture-modal"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const telegramLink = "https://t.me/copycashforexfree"
  const webhookUrl = "https://hook.us1.make.com/vprf2fax8g6giy7emdlr4vrdok5wjvpz"

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      {/* Conteúdo principal */}
      <div className="w-full max-w-md flex flex-col items-center px-4 py-6">
        {/* Título principal */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Use Absolutamente De Graça O Método Copy Cash
          <br />
          <span className="text-blue-500"> Que Tá Gerando De R$300 A R$1.250/Mês </span>
          <br />
          Mesmo Para Iniciantes No Mercado Financeiro.
        </h1>

        {/* Imagem principal */}
        <div className="relative w-full h-64 my-4">
          <Image
            src="/yellow-car.png"
            alt="Homem de camisa preta ao lado de carro esportivo amarelo"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Texto Telegram com logo */}
        <div className="flex items-center justify-center gap-2 mt-2 mb-4">
          <p className="text-center">Comunidade no TELEGRAM</p>
          <Image src="/telegram-logo-new.png" alt="Logo Telegram" width={28} height={28} className="inline-block" />
        </div>

        {/* Botão de ação */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md text-lg"
          onClick={() => {
            // Abrir o modal para captura de leads
            setIsModalOpen(true)
          }}
        >
          CLIQUE AQUI PARA ACESSAR
        </Button>

        {/* Texto abaixo do botão */}
        <p className="text-center text-sm mt-3 mb-6">
          <span className="text-gray-400">Clique no botão</span> acima e entre no
          <br />
          grupo gratuito do <span className="text-blue-500">Telegram</span>
        </p>

        {/* Benefícios */}
        <div className="w-full space-y-2 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-blue-500 flex-shrink-0">🔄</div>
            <p className="text-sm">Operações ao vivo todo dia.</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="text-blue-500 flex-shrink-0">📊</div>
            <p className="text-sm">Para iniciantes e quem já opera.</p>
          </div>
        </div>
      </div>

      {/* Modal de captura de leads */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        telegramLink={telegramLink}
        webhookUrl={webhookUrl}
      />
    </div>
  )
}
