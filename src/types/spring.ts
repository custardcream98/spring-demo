// Spring 설정 타입 정의
export interface SpringConfig {
  stiffness: number
  damping: number
  mass: number
  velocity: number
}

// 애니메이션 타입 정의
export type AnimationType = 'translate' | 'scale' | 'rotate'

// 프리셋 설정들
export const SPRING_PRESETS: Record<string, SpringConfig> = {
  default: { stiffness: 100, damping: 10, mass: 1, velocity: 0 },
  bouncy: { stiffness: 400, damping: 17, mass: 1, velocity: 0 },
  gentle: { stiffness: 120, damping: 14, mass: 1, velocity: 0 },
  wobbly: { stiffness: 180, damping: 12, mass: 1, velocity: 0 },
  stiff: { stiffness: 210, damping: 20, mass: 1, velocity: 0 },
  slow: { stiffness: 280, damping: 60, mass: 10, velocity: 0 },
}
