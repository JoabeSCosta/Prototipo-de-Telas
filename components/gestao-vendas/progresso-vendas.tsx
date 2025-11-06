"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function SalesProgress() {
  return (
    <Card className="bg-white border-none shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Progresso de Vendas</CardTitle>
          <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent">
            Todos
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="flex flex-col items-center justify-center min-h-full py-4">
          {/* Circular progress gauge */}
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e5e5" strokeWidth="8" />
              {/* Progress circle - 72% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40 * 0.72} ${2 * Math.PI * 40}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ff5722" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">72%</div>
              <div className="text-xs text-gray-500">Concluído</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 w-full mt-4">
            <div className="text-center">
              <div className="text-xl font-bold">60</div>
              <div className="text-xs text-gray-500">Total de vendas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">43</div>
              <div className="text-xs text-gray-500">Concluídas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">12</div>
              <div className="text-xs text-gray-500">Em andamento</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">5</div>
              <div className="text-xs text-gray-500">Canceladas</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
