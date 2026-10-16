import type { IconType } from 'react-icons'
import {
  FiBarChart2,
  FiBookOpen,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiShield,
  FiSmartphone,
  FiTool,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'

/** `icon` keys used by the Internships nav tiles and data/internships.ts. */
export const TRACK_ICONS: Record<string, IconType> = {
  cloud: FiCloud,
  mobile: FiSmartphone,
  code: FiCode,
  zap: FiZap,
  trending: FiTrendingUp,
  chart: FiBarChart2,
  database: FiDatabase,
  shield: FiShield,
  cpu: FiCpu,
  layers: FiLayers,
  book: FiBookOpen,
  tool: FiTool,
}

export const trackIcon = (key: string): IconType => TRACK_ICONS[key] ?? FiCode
