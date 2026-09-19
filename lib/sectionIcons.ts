import {
  Layers,
  Shield,
  ClipboardList,
  CreditCard,
  Search,
  ListChecks,
  FileText,
  Clock,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  shield: Shield,
  clipboard: ClipboardList,
  creditcard: CreditCard,
  search: Search,
  list: ListChecks,
  file: FileText,
  clock: Clock,
  check: CheckCircle,
};

export const HIGHLIGHT_ICON_OPTIONS = [
  { value: "layers", label: "Layers" },
  { value: "shield", label: "Shield" },
  { value: "clipboard", label: "Clipboard" },
  { value: "creditcard", label: "Credit Card" },
];

export const PROCESS_ICON_OPTIONS = [
  { value: "search", label: "Search" },
  { value: "list", label: "List" },
  { value: "file", label: "File" },
  { value: "clock", label: "Clock" },
  { value: "check", label: "Check" },
];

export function getSectionIcon(name: string): LucideIcon {
  return ICONS[name] || CheckCircle;
}
