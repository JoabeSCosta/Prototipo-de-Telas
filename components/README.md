# 📁 Estrutura de Componentes - SaleSight

## 📋 Organização das Pastas

### 🎨 **layout-principal/**
Componentes de estrutura e layout da aplicação
- `estrutura-app.tsx` - Layout principal com sidebar e header (anteriormente `app-shell.tsx`)
- `layout-dashboard.tsx` - Layout específico do dashboard
- `painel-configuracoes.tsx` - Painel de configurações do sistema

### 📊 **painel-controle/**
Componentes do painel de controle (Dashboard)
- `cartoes-visao-geral.tsx` - Cards com visão geral de métricas (anteriormente `overview-cards.tsx`)
- `progresso-geral.tsx` - Barra de progresso geral (anteriormente `overall-progress.tsx`)
- `tarefas-hoje.tsx` - Lista de tarefas do dia (anteriormente `today-tasks.tsx`)

### 🚗 **gestao-veiculos/**
Componentes de gerenciamento de veículos
- `gerenciamento-veiculos.tsx` - Página principal de gestão de veículos (anteriormente `vehicles-management.tsx`)
- `tabela-resumo-veiculos.tsx` - Tabela resumida de veículos (anteriormente `vehicles-summary-table.tsx`)

### 💰 **gestao-vendas/**
Componentes de gerenciamento de vendas
- `gerenciamento-vendas.tsx` - Página principal de gestão de vendas (anteriormente `sales-management.tsx`)
- `progresso-vendas.tsx` - Gráfico de progresso de vendas (anteriormente `sales-progress.tsx`)
- `vendas-recentes.tsx` - Lista de vendas recentes (anteriormente `recent-sales.tsx`)

### 🌐 **monitoramento-iot/**
Componentes de monitoramento IoT
- `painel-iot.tsx` - Dashboard de dispositivos IoT (anteriormente `iot-dashboard.tsx`)
- `monitoramento.tsx` - Componente de monitoramento em tempo real (anteriormente `iot-monitoring.tsx`)

### 📋 **tabelas/**
Componentes de tabelas reutilizáveis
- `tabela-resumo-projetos.tsx` - Tabela de resumo de projetos (anteriormente `project-summary-table.tsx`)
- `carga-trabalho-projetos.tsx` - Tabela de carga de trabalho (anteriormente `projects-workload.tsx`)
- `tabela-funcionarios.tsx` - Tabela de funcionários (anteriormente `employees-table.tsx`)

### 🎨 **tema/**
Componentes relacionados a temas e estilos
- `provedor-tema.tsx` - Provider de tema dark/light (anteriormente `theme-provider.tsx`)

### 🧩 **ui/**
Componentes de interface reutilizáveis (Shadcn/ui)
- Botões, inputs, cards, dialogs, etc.
- Componentes base da biblioteca de UI

## 🔄 Mudanças de Importação

### Antes:
```tsx
import { AppShell } from "@/components/app-shell"
import { OverviewCards } from "@/components/overview-cards"
import { VehiclesManagement } from "@/components/vehicles-management"
```

### Agora:
```tsx
import { AppShell } from "@/components/layout-principal/estrutura-app"
import { OverviewCards } from "@/components/painel-controle/cartoes-visao-geral"
import { VehiclesManagement } from "@/components/gestao-veiculos/gerenciamento-veiculos"
```

## 📝 Convenções de Nomenclatura

- **Pastas**: kebab-case em português (ex: `gestao-veiculos`, `painel-controle`)
- **Arquivos**: kebab-case em português (ex: `gerenciamento-vendas.tsx`)
- **Componentes**: PascalCase em inglês dentro dos arquivos (ex: `VehiclesManagement`)

## 🎯 Benefícios da Nova Estrutura

✅ **Organização clara** por funcionalidade
✅ **Nomes em português** para melhor compreensão
✅ **Separação lógica** de responsabilidades
✅ **Facilita manutenção** e localização de componentes
✅ **Escalável** para novos recursos
