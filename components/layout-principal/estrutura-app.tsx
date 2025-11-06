"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Bell, Search, ChevronDown, LayoutDashboard, Car, ShoppingCart, Activity, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type * as React from "react"

type AppShellProps = {
  title?: string
  children: React.ReactNode
}

export function AppShell({ title = "Dashboard", children }: AppShellProps) {
  const pathname = usePathname()

  const isDashboard = pathname === "/"
  const isVehicles = pathname.startsWith("/vehicles")
  const isSales = pathname.startsWith("/sales")
  const isIoT = pathname.startsWith("/iot")
  const isFuncionarios = pathname.startsWith("/funcionarios")
  const isConfiguracoes = pathname.startsWith("/configuracoes")

  const navBtnBase = "w-full justify-start text-xs h-9 rounded-lg"

  return (
    <div className="flex h-screen bg-[#cdb8a5] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[165px] bg-[#1a1a1a] text-white flex flex-col">
        <div className="p-4 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
            <Image src="/salesight-icon.png" alt="SaleSight" width={32} height={32} className="w-8 h-8" />
          </div>
          <span className="font-semibold text-sm">SaleSight</span>
        </div>

        <nav className="flex-1 px-2 py-4">
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={cn(
                navBtnBase,
                isDashboard ? "bg-white text-black hover:bg-white/90" : "text-white hover:bg-white/10",
              )}
            >
              <Link href="/">
                <LayoutDashboard className={cn("w-4 h-4 mr-2", isDashboard ? "text-[#ff5722]" : "text-white")} />
                Dashboard
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className={cn(
                navBtnBase,
                isVehicles ? "bg-white text-black hover:bg-white/90" : "text-white hover:bg-white/10",
              )}
            >
              <Link href="/vehicles">
                <Car className={cn("w-4 h-4 mr-2", isVehicles ? "text-[#ff5722]" : "text-white")} />
                Veículos
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className={cn(
                navBtnBase,
                isSales ? "bg-white text-black hover:bg-white/90" : "text-white hover:bg-white/10",
              )}
            >
              <Link href="/sales">
                <ShoppingCart className={cn("w-4 h-4 mr-2", isSales ? "text-[#ff5722]" : "text-white")} />
                Vendas
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className={cn(
                navBtnBase,
                isIoT ? "bg-white text-black hover:bg-white/90" : "text-white hover:bg-white/10",
              )}
            >
              <Link href="/iot">
                <Activity className={cn("w-4 h-4 mr-2", isIoT ? "text-[#ff5722]" : "text-white")} />
                IoT Monitor
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className={cn(
                navBtnBase,
                isFuncionarios ? "bg-white text-black hover:bg-white/90" : "text-white hover:bg-white/10",
              )}
            >
              <Link href="/funcionarios">
                <Users className={cn("w-4 h-4 mr-2", isFuncionarios ? "text-[#ff5722]" : "text-white")} />
                Funcionários
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                navBtnBase,
                isConfiguracoes ? "bg-white text-black hover:bg-white/90" : "text-white hover:bg-white/10",
              )}
            >
              <Link href="/configuracoes">
                <Settings className={cn("w-4 h-4 mr-2", isConfiguracoes ? "text-[#ff5722]" : "text-white")} />
                Configurações
              </Link>
            </Button>
          </div>
        </nav>

        {/* Bottom icon */}
        <div className="p-4">
          <Button size="icon" className="w-10 h-10 rounded-full bg-[#ff5722] hover:bg-[#ff5722]/90">
            <Activity className="w-5 h-5 text-white" />
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#cdb8a5] border-b border-[#b5a394] px-6 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-semibold text-[#1a1a1a]">{title}</h1>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar veículos, vendas..."
                className="pl-9 w-[300px] bg-white border-none h-9 text-sm"
              />
            </div>

            {/* Notifications */}
            <Button size="icon" variant="ghost" className="relative h-9 w-9">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff5722] rounded-full" />
            </Button>

            {/* User profile */}
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-medium">Admin</span>
                <span className="text-[10px] text-gray-600">Gerente de vendas</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 space-y-3 overflow-auto flex flex-col">{children}</div>
      </main>
    </div>
  )
}

// Local lucide wrappers for icons not imported above to avoid changing other files
//
