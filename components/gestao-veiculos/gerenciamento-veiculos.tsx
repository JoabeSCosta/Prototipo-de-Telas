"use client"

import type React from "react"

import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function VehiclesManagement() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Toyota Corolla 2024",
      brand: "Toyota",
      model: "Corolla",
      year: 2024,
      category: "Sedan",
      price: 125000,
      status: "Disponível",
      color: "Prata",
      km: 0,
      description: "Veículo zero km, completo com todos os opcionais",
    },
    {
      id: 2,
      name: "Honda Civic 2023",
      brand: "Honda",
      model: "Civic",
      year: 2023,
      category: "Sedan",
      price: 145000,
      status: "Reservado",
      color: "Preto",
      km: 15000,
      description: "Seminovo em excelente estado",
    },
    {
      id: 3,
      name: "Ford Ranger 2024",
      brand: "Ford",
      model: "Ranger",
      year: 2024,
      category: "Pickup",
      price: 235000,
      status: "Em negociação",
      color: "Branco",
      km: 0,
      description: "Pickup 4x4 diesel, zero km",
    },
    {
      id: 4,
      name: "Jeep Compass 2023",
      brand: "Jeep",
      model: "Compass",
      year: 2023,
      category: "SUV",
      price: 185000,
      status: "Disponível",
      color: "Vermelho",
      km: 8000,
      description: "SUV completo com teto solar",
    },
    {
      id: 5,
      name: "Chevrolet Onix 2024",
      brand: "Chevrolet",
      model: "Onix",
      year: 2024,
      category: "Hatch",
      price: 85000,
      status: "Disponível",
      color: "Branco",
      km: 0,
      description: "Hatch econômico, zero km",
    },
    {
      id: 6,
      name: "Volkswagen T-Cross 2023",
      brand: "Volkswagen",
      model: "T-Cross",
      year: 2023,
      category: "SUV",
      price: 135000,
      status: "Vendido",
      color: "Azul",
      km: 12000,
      description: "SUV compacto em ótimo estado",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-100 text-green-700"
      case "Reservado":
        return "bg-orange-100 text-orange-700"
      case "Em negociação":
        return "bg-red-100 text-red-700"
      case "Vendido":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
      setVehicles(vehicles.filter((v) => v.id !== id))
    }
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const categoryMatch = filterCategory === "all" || vehicle.category.toLowerCase() === filterCategory
    const statusMatch = filterStatus === "all" || vehicle.status.toLowerCase() === filterStatus
    return categoryMatch && statusMatch
  })

  return (
    <>
      {/* Add Vehicle Button */}
      <div className="flex items-center justify-between shrink-0 mb-6">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-gray-100 rounded-full text-xs h-8 flex items-center justify-center gap-1">
              <Plus className="w-3 h-3 text-[#ff5722]" />
              Adicionar veículo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Veículo</DialogTitle>
            </DialogHeader>
            <VehicleForm onClose={() => setIsAddDialogOpen(false)} vehicles={vehicles} setVehicles={setVehicles} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border-none shadow-sm flex-1 min-h-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Catálogo de Veículos</CardTitle>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="hatch">Hatch</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="disponível">Disponível</SelectItem>
                  <SelectItem value="reservado">Reservado</SelectItem>
                  <SelectItem value="em negociação">Em negociação</SelectItem>
                  <SelectItem value="vendido">Vendido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modelo</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead>KM</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.model}</TableCell>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.km.toLocaleString()} km</TableCell>
                  <TableCell className="font-semibold text-[#ff5722]">
                    R$ {vehicle.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(vehicle.status)} text-xs border-none`}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Dialog
                        open={isEditDialogOpen && selectedVehicle?.id === vehicle.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (!open) setSelectedVehicle(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedVehicle(vehicle)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Editar Veículo</DialogTitle>
                          </DialogHeader>
                          <VehicleForm
                            onClose={() => {
                              setIsEditDialogOpen(false)
                              setSelectedVehicle(null)
                            }}
                            vehicle={vehicle}
                            vehicles={vehicles}
                            setVehicles={setVehicles}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

function VehicleForm({
  vehicle,
  onClose,
  vehicles,
  setVehicles,
}: {
  vehicle?: any
  onClose: () => void
  vehicles: any[]
  setVehicles: (vehicles: any[]) => void
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newVehicle = {
      id: vehicle?.id || Date.now(),
      name: `${formData.get("brand")} ${formData.get("model")} ${formData.get("year")}`,
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      year: Number(formData.get("year")),
      category: formData.get("category") as string,
      price: Number(formData.get("price")),
      status: formData.get("status") as string,
      color: formData.get("color") as string,
      km: Number(formData.get("km")),
      description: formData.get("description") as string,
    }

    if (vehicle) {
      setVehicles(vehicles.map((v) => (v.id === vehicle.id ? newVehicle : v)))
    } else {
      setVehicles([...vehicles, newVehicle])
    }

    onClose()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Marca</Label>
          <Input id="brand" name="brand" defaultValue={vehicle?.brand} placeholder="Ex: Toyota" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Modelo</Label>
          <Input id="model" name="model" defaultValue={vehicle?.model} placeholder="Ex: Corolla" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Ano</Label>
          <Input id="year" name="year" type="number" defaultValue={vehicle?.year} placeholder="2024" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select name="category" defaultValue={vehicle?.category}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Pickup">Pickup</SelectItem>
              <SelectItem value="Hatch">Hatch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="color">Cor</Label>
          <Input id="color" name="color" defaultValue={vehicle?.color} placeholder="Ex: Prata" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="km">Quilometragem</Label>
          <Input id="km" name="km" type="number" defaultValue={vehicle?.km} placeholder="0" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input id="price" name="price" type="number" defaultValue={vehicle?.price} placeholder="125000" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={vehicle?.status}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Disponível">Disponível</SelectItem>
              <SelectItem value="Reservado">Reservado</SelectItem>
              <SelectItem value="Em negociação">Em negociação</SelectItem>
              <SelectItem value="Vendido">Vendido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={vehicle?.description}
          placeholder="Descrição detalhada do veículo..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#ff5722] hover:bg-[#ff5722]/90">
          {vehicle ? "Salvar Alterações" : "Adicionar Veículo"}
        </Button>
      </div>
    </form>
  )
}
