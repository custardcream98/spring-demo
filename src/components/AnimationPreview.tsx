import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
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

  const renderAnimationDemo = () => {
    switch (animationType) {
      case 'translate':
        return (
          <TranslateDemo
            springConfig={springConfig}
            isAnimating={isAnimating}
          />
        )
      case 'scale':
        return (
          <ScaleDemo springConfig={springConfig} isAnimating={isAnimating} />
        )
      case 'rotate':
        return (
          <RotateDemo springConfig={springConfig} isAnimating={isAnimating} />
        )
      default:
        return null
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
        <div className="relative h-80 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
          {renderAnimationDemo()}

          {/* 애니메이션 타입 표시 */}
          <div className="absolute top-4 right-4 rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm">
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

// Translate 애니메이션 데모 - 리스트 스태거 애니메이션
function TranslateDemo({
  springConfig,
  isAnimating,
}: {
  springConfig: SpringConfig
  isAnimating: boolean
}) {
  const { t } = useTranslation()

  const items = [
    {
      id: 1,
      icon: '📧',
      titleKey: 'demos.translate.notifications.newMessage.title',
      descKey: 'demos.translate.notifications.newMessage.description',
    },
    {
      id: 2,
      icon: '🎉',
      titleKey: 'demos.translate.notifications.achievement.title',
      descKey: 'demos.translate.notifications.achievement.description',
    },
    {
      id: 3,
      icon: '📅',
      titleKey: 'demos.translate.notifications.reminder.title',
      descKey: 'demos.translate.notifications.reminder.description',
    },
    {
      id: 4,
      icon: '💝',
      titleKey: 'demos.translate.notifications.specialOffer.title',
      descKey: 'demos.translate.notifications.specialOffer.description',
    },
  ]

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <h3 className="mb-4 text-sm font-medium text-gray-600">
        {t('demos.translate.title')}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="cursor-pointer rounded-lg border bg-white p-3 shadow-sm hover:shadow-md"
            initial={{ x: -100, opacity: 0 }}
            animate={
              isAnimating ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: springConfig.stiffness,
              damping: springConfig.damping,
              mass: springConfig.mass,
              velocity: springConfig.velocity,
              delay: index * 0.1, // 스태거 효과
            }}
            whileHover={{ x: 8 }}
          >
            <div className="flex items-center space-x-3">
              <div className="text-lg">{item.icon}</div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {t(item.titleKey)}
                </div>
                <div className="text-xs text-gray-500">{t(item.descKey)}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Scale 애니메이션 데모 - 인터랙티브 버튼들
function ScaleDemo({
  springConfig,
  isAnimating,
}: {
  springConfig: SpringConfig
  isAnimating: boolean
}) {
  const { t } = useTranslation()

  const buttons = [
    {
      id: 1,
      labelKey: 'demos.scale.buttons.like',
      icon: '❤️',
      color: 'bg-red-500',
    },
    {
      id: 2,
      labelKey: 'demos.scale.buttons.share',
      icon: '📤',
      color: 'bg-blue-500',
    },
    {
      id: 3,
      labelKey: 'demos.scale.buttons.save',
      icon: '🔖',
      color: 'bg-green-500',
    },
    {
      id: 4,
      labelKey: 'demos.scale.buttons.more',
      icon: '⚡',
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <h3 className="mb-6 text-sm font-medium text-gray-600">
        {t('demos.scale.title')}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {buttons.map((button) => (
          <motion.button
            key={button.id}
            className={`${button.color} flex flex-col items-center space-y-2 rounded-xl p-4 text-white shadow-lg`}
            initial={{ scale: 0.8 }}
            animate={isAnimating ? { scale: 1 } : { scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: springConfig.stiffness,
              damping: springConfig.damping,
              mass: springConfig.mass,
              velocity: springConfig.velocity,
            }}
            whileHover={{
              scale: 1.1,
              transition: {
                type: 'spring',
                stiffness: springConfig.stiffness * 1.5,
                damping: springConfig.damping * 0.8,
              },
            }}
            whileTap={{
              scale: 0.95,
              transition: {
                type: 'spring',
                stiffness: springConfig.stiffness * 2,
                damping: springConfig.damping * 0.5,
              },
            }}
          >
            <div className="text-2xl">{button.icon}</div>
            <span className="text-xs font-medium">{t(button.labelKey)}</span>
          </motion.button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">
        {t('demos.scale.guide')}
      </p>
    </div>
  )
}

// Rotate 애니메이션 데모 - 다양한 회전 패턴
function RotateDemo({
  springConfig,
  isAnimating,
}: {
  springConfig: SpringConfig
  isAnimating: boolean
}) {
  const { t } = useTranslation()
  const [cardFlipped, setCardFlipped] = useState(false)

  return (
    <div className="flex h-full items-center justify-center p-6">
      {/* 카드 플립 */}
      <div className="flex flex-col items-center space-y-2">
        <motion.div
          className="h-25 w-20 cursor-pointer"
          style={{ perspective: 1000 }}
          onClick={() => setCardFlipped(!cardFlipped)}
        >
          <motion.div
            className="preserve-3d relative h-full w-full"
            animate={
              isAnimating || cardFlipped ? { rotateY: 180 } : { rotateY: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: springConfig.stiffness,
              damping: springConfig.damping,
              mass: springConfig.mass,
              velocity: springConfig.velocity,
            }}
          >
            {/* 앞면 */}
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-2xl text-white backface-hidden">
              🎴
            </div>
            {/* 뒷면 */}
            <div className="absolute inset-0 flex h-full w-full rotate-y-180 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-500 text-2xl text-white backface-hidden">
              ✨
            </div>
          </motion.div>
        </motion.div>
        <span className="text-xs text-gray-600">
          {t('demos.rotate.elements.cardFlip')}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        {t('demos.rotate.guide')}
      </div>
    </div>
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
