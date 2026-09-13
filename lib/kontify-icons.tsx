import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, ArrowDown, ArrowRight, ArrowUp, BarChart3, Banknote, Ban, BookOpen, Brain, Building2, Calculator, CalendarDays, Check, CircleHelp, CircleX, ClipboardCheck, Clock3, Coins, Crosshair, FileText, Flag, Focus, GitBranch, Goal, HandCoins, Handshake, Landmark, Lightbulb, ListChecks, Microscope, Package, PiggyBank, Puzzle, RefreshCw, Search, ShieldCheck, ShoppingCart, Sparkles, Target, TrendingDown, TrendingUp, Users, WalletCards, X } from 'lucide-react'

export type KontifyIconKey = 'money' | 'cashflow' | 'profit' | 'bank' | 'wallet' | 'savings' | 'loss' | 'growth' | 'investment' | 'debt' | 'authority' | 'tax' | 'iva' | 'invoice' | 'document' | 'filing' | 'fiscal_calendar' | 'review' | 'compliance' | 'fiscal_alert' | 'alert' | 'shield' | 'danger' | 'error' | 'block' | 'traffic_light' | 'search' | 'audit' | 'objective' | 'branch' | 'choice' | 'check' | 'x' | 'question' | 'focus' | 'strategy' | 'company' | 'client' | 'supplier' | 'inventory' | 'sales' | 'process' | 'team' | 'productivity' | 'time' | 'idea' | 'brain' | 'discover' | 'example' | 'practice' | 'conclusion' | 'next_step' | 'advance' | 'stop' | 'correct' | 'compare' | 'calculate' | 'decide' | 'implement'

export const kontifyIconInventory: Record<KontifyIconKey, LucideIcon> = {
  money: Coins, cashflow: ArrowRight, profit: TrendingUp, bank: Landmark, wallet: WalletCards, savings: PiggyBank, loss: TrendingDown, growth: ArrowUp, investment: BarChart3, debt: HandCoins,
  authority: Building2, tax: FileText, iva: FileText, invoice: FileText, document: FileText, filing: ClipboardCheck, fiscal_calendar: CalendarDays, review: Search, compliance: ShieldCheck, fiscal_alert: AlertTriangle,
  alert: AlertTriangle, shield: ShieldCheck, danger: AlertTriangle, error: CircleX, block: Ban, traffic_light: BarChart3, search: Search, audit: Microscope,
  objective: Target, branch: GitBranch, choice: ListChecks, check: Check, x: X, question: CircleHelp, focus: Focus, strategy: Goal,
  company: Building2, client: Users, supplier: Handshake, inventory: Package, sales: ShoppingCart, process: RefreshCw, team: Users, productivity: Sparkles, time: Clock3,
  idea: Lightbulb, brain: Brain, discover: Microscope, example: BookOpen, practice: Puzzle, conclusion: Flag, next_step: ArrowRight,
  advance: ArrowUp, stop: Ban, correct: Check, compare: GitBranch, calculate: Calculator, decide: Crosshair, implement: Check,
}

export function getKontifyIcon(key: KontifyIconKey): LucideIcon { return kontifyIconInventory[key] }
