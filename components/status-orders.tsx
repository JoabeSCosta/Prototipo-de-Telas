"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Zap, CheckCircle, Filter, RefreshCw } from "lucide-react"

type OrderStatus = "pending" | "production" | "completed"

interface Order {
  id: string
  color: string
  model: string
  engine: string
  transmission: string
  wheels: string
  suspension?: string
  status: OrderStatus
  progress: number
  createdAt: string
  vehicleId?: number
  vehicleName?: string
}

const mockOrders: Order[] = [
  {
    id: "#001",
    color: "Vermelho",
    model: "Sedan",
    engine: "1.6",
    transmission: "Automático",
    wheels: "Liga Leve",
    status: "completed",
    progress: 100,
    createdAt: "2024-01-15",
  },
  {
    id: "#002",
    color: "Preto",
    model: "SUV",
    engine: "2.0",
    transmission: "Automático",
    wheels: "Esportiva",
    status: "production",
    progress: 65,
    createdAt: "2024-01-18",
  },
  {
    id: "#003",
    color: "Branco",
    model: "Hatch",
    engine: "1.0",
    transmission: "Manual",
    wheels: "Aço",
    status: "pending",
    progress: 10,
    createdAt: "2024-01-19",
  },
  {
    id: "#004",
    color: "Azul",
    model: "Sedan",
    engine: "Elétrico",
    transmission: "Automático",
    wheels: "Liga Leve",
    status: "production",
    progress: 45,
    createdAt: "2024-01-19",
  },
]

export function StatusOrders() {
  const [filterStatus, setFilterStatus] = useState<"all" | OrderStatus>("all")
  const [movedOrders, setMovedOrders] = useState<{ id: string; data: Order }[]>([])
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  useEffect(() => {
    const loadOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem("productionOrders") || "[]")
      setOrders([...mockOrders, ...storedOrders])
    }

    loadOrders()

    const handleOrdersUpdate = () => {
      loadOrders()
    }

    window.addEventListener("ordersUpdated", handleOrdersUpdate)
    return () => window.removeEventListener("ordersUpdated", handleOrdersUpdate)
  }, [])

  const filteredOrders =
    filterStatus === "all"
      ? orders.filter((o) => !movedOrders.some((m) => m.id === o.id))
      : orders.filter((order) => order.status === filterStatus && !movedOrders.some((m) => m.id === order.id))

  const handleMoveToEstoque = (order: Order) => {
    setMovedOrders([...movedOrders, { id: order.id, data: order }])
  }

  const handleRefresh = () => {
    const storedOrders = JSON.parse(localStorage.getItem("productionOrders") || "[]")
    setOrders([...mockOrders, ...storedOrders])
    setMovedOrders([])
  }

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return { icon: Clock, label: "Pendente", color: "#ef4444", bgColor: "#fee2e2" }
      case "production":
        return { icon: Zap, label: "Em Produção", color: "#eab308", bgColor: "#fef3c7" }
      case "completed":
        return { icon: CheckCircle, label: "Concluído", color: "#22c55e", bgColor: "#dcfce7" }
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <Card className="bg-white p-4 border-none shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-[#ff5722]" />
          <span className="text-sm font-semibold">Filtrar:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "production", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as "all" | OrderStatus)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                filterStatus === status ? "bg-[#ff5722] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status === "all"
                ? "Todos"
                : status === "pending"
                  ? "Pendentes"
                  : status === "production"
                    ? "Em Produção"
                    : "Concluídos"}
            </button>
          ))}
        </div>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status)
          const StatusIcon = statusConfig.icon

          return (
            <Card key={order.id} className="bg-white p-4 border-none shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{order.id}</p>
                  {order.vehicleName && <p className="text-xs text-gray-600 font-medium">{order.vehicleName}</p>}
                  <p className="text-xs text-gray-500">{order.createdAt}</p>
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full"
                  style={{ backgroundColor: statusConfig.bgColor }}
                >
                  <StatusIcon className="w-3 h-3" style={{ color: statusConfig.color }} />
                  <span className="text-xs font-medium" style={{ color: statusConfig.color }}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-2 mb-4 text-xs">
                <p className="flex justify-between text-gray-600">
                  <span>Modelo:</span>
                  <span className="font-medium text-gray-900">{order.model}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span>Cor:</span>
                  <span className="font-medium text-gray-900">{order.color}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span>Motor:</span>
                  <span className="font-medium text-gray-900">{order.engine}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span>Câmbio:</span>
                  <span className="font-medium text-gray-900">{order.transmission}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span>Rodas:</span>
                  <span className="font-medium text-gray-900">{order.wheels}</span>
                </p>
                {order.suspension && (
                  <p className="flex justify-between text-gray-600">
                    <span>Suspensão:</span>
                    <span className="font-medium text-gray-900">{order.suspension}</span>
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 items-center justify-between">
                <Button onClick={handleRefresh} className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                {order.status === "completed" && (
                  <Button
                    onClick={() => handleMoveToEstoque(order)}
                    className="flex-1 bg-[#ff5722] hover:bg-[#ff5722]/90 text-white text-xs font-medium"
                  >
                    Mover para Estoque
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="bg-white p-8 border-none shadow-sm text-center">
          <p className="text-gray-500 text-sm">Nenhum pedido encontrado nesta categoria</p>
        </Card>
      )}
    </div>
  )
}
