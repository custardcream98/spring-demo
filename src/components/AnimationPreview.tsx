import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import type { SpringConfig, AnimationType } from '../types/spring'

// Props 인터페이스 정의
interface AnimationPreviewProps {
  springConfig: SpringConfig
  isAnimating: boolean
  animationType: AnimationType
  onTriggerAnimation: () => void
}

export function AnimationPreview({
  springConfig,
  isAnimating,
  animationType,
  onTriggerAnimation,
}: AnimationPreviewProps) {
  const { t } = useTranslation()

  // 애니메이션 스타일 계산
  const getAnimationStyle = () => {
    if (!isAnimating) return {}

    switch (animationType) {
      case 'translate':
        return { x: 200, y: 100 }
      case 'scale':
        return { scale: 1.5 }
      case 'rotate':
        return { rotate: 180 }
      default:
        return {}
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preview.title')}</CardTitle>
        <CardDescription>{t('preview.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 애니메이션 미리보기 영역 */}
        <div className="relative h-80 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          {/* 애니메이션 요소 */}
          <motion.div
            className="absolute top-8 left-8 flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white shadow-lg"
            animate={getAnimationStyle()}
            transition={{
              type: 'spring',
              stiffness: springConfig.stiffness,
              damping: springConfig.damping,
              mass: springConfig.mass,
              velocity: springConfig.velocity,
            }}
            onClick={onTriggerAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📦
          </motion.div>

          {/* 가이드 텍스트 */}
          <div className="absolute bottom-4 left-4 text-sm text-gray-500">
            {t('preview.guide')}
          </div>

          {/* 애니메이션 타입 표시 */}
          <div className="absolute top-4 right-4 rounded-md bg-white/80 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
            {t(`animationType.${animationType}`)}
          </div>
        </div>

        {/* 컨트롤 영역 */}
        <div className="mt-4 space-y-4">
          <Button onClick={onTriggerAnimation} className="w-full" size="lg">
            {t('preview.triggerButton')}
          </Button>

          {/* 현재 설정값 표시 */}
          <CurrentConfigDisplay springConfig={springConfig} />
        </div>
      </CardContent>
    </Card>
  )
}

// 현재 설정값 표시 컴포넌트
interface CurrentConfigDisplayProps {
  springConfig: SpringConfig
}

function CurrentConfigDisplay({ springConfig }: CurrentConfigDisplayProps) {
  const { t } = useTranslation()

  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <h4 className="mb-2 font-medium">{t('preview.currentConfig')}</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <ConfigItem
          label={t('springConfiguration.stiffness.label')}
          value={springConfig.stiffness}
        />
        <ConfigItem
          label={t('springConfiguration.damping.label')}
          value={springConfig.damping}
        />
        <ConfigItem
          label={t('springConfiguration.mass.label')}
          value={springConfig.mass}
        />
        <ConfigItem
          label={t('springConfiguration.velocity.label')}
          value={springConfig.velocity}
        />
      </div>
    </div>
  )
}

// 설정 항목 컴포넌트
interface ConfigItemProps {
  label: string
  value: number
}

function ConfigItem({ label, value }: ConfigItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className="font-mono font-medium">{value}</span>
    </div>
  )
}
