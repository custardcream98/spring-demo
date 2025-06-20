import { useState } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Label } from './components/ui/label'

// Spring 설정 타입 정의
interface SpringConfig {
  stiffness: number
  damping: number
  mass: number
  velocity: number
}

// 프리셋 설정들
const SPRING_PRESETS: Record<string, SpringConfig> = {
  default: { stiffness: 100, damping: 10, mass: 1, velocity: 0 },
  bouncy: { stiffness: 400, damping: 17, mass: 1, velocity: 0 },
  gentle: { stiffness: 120, damping: 14, mass: 1, velocity: 0 },
  wobbly: { stiffness: 180, damping: 12, mass: 1, velocity: 0 },
  stiff: { stiffness: 210, damping: 20, mass: 1, velocity: 0 },
  slow: { stiffness: 280, damping: 60, mass: 10, velocity: 0 },
}

function App() {
  const { t, i18n } = useTranslation()
  const [springConfig, setSpringConfig] = useState<SpringConfig>(
    SPRING_PRESETS.default
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState<
    'translate' | 'scale' | 'rotate'
  >('translate')

  // 언어 변경 함수
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  // 애니메이션 트리거
  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 100)
  }

  // Spring 값 업데이트 함수
  const updateSpringValue = (key: keyof SpringConfig, value: number) => {
    setSpringConfig((prev) => ({ ...prev, [key]: value }))
  }

  // 프리셋 적용
  const applyPreset = (presetName: string) => {
    setSpringConfig(SPRING_PRESETS[presetName])
  }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-7xl">
        {/* 언어 선택 버튼 */}
        <div className="mb-6 flex justify-end">
          <div className="flex gap-2">
            <Button
              variant={i18n.language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeLanguage('en')}
            >
              {t('language.english')}
            </Button>
            <Button
              variant={i18n.language === 'ko' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeLanguage('ko')}
            >
              {t('language.korean')}
            </Button>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 컨트롤 패널 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('springConfiguration.title')}</CardTitle>
                <CardDescription>
                  {t('springConfiguration.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stiffness */}
                <div className="space-y-2">
                  <Label>
                    {t('springConfiguration.stiffness.label')}:{' '}
                    {springConfig.stiffness}
                  </Label>
                  <Slider
                    value={[springConfig.stiffness]}
                    onValueChange={([value]) =>
                      updateSpringValue('stiffness', value)
                    }
                    max={500}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500">
                    {t('springConfiguration.stiffness.description')}
                  </p>
                </div>

                {/* Damping */}
                <div className="space-y-2">
                  <Label>
                    {t('springConfiguration.damping.label')}:{' '}
                    {springConfig.damping}
                  </Label>
                  <Slider
                    value={[springConfig.damping]}
                    onValueChange={([value]) =>
                      updateSpringValue('damping', value)
                    }
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500">
                    {t('springConfiguration.damping.description')}
                  </p>
                </div>

                {/* Mass */}
                <div className="space-y-2">
                  <Label>
                    {t('springConfiguration.mass.label')}: {springConfig.mass}
                  </Label>
                  <Slider
                    value={[springConfig.mass]}
                    onValueChange={([value]) =>
                      updateSpringValue('mass', value)
                    }
                    max={20}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500">
                    {t('springConfiguration.mass.description')}
                  </p>
                </div>

                {/* Velocity */}
                <div className="space-y-2">
                  <Label>
                    {t('springConfiguration.velocity.label')}:{' '}
                    {springConfig.velocity}
                  </Label>
                  <Slider
                    value={[springConfig.velocity]}
                    onValueChange={([value]) =>
                      updateSpringValue('velocity', value)
                    }
                    max={100}
                    min={-100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500">
                    {t('springConfiguration.velocity.description')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 프리셋 버튼들 */}
            <Card>
              <CardHeader>
                <CardTitle>{t('presets.title')}</CardTitle>
                <CardDescription>{t('presets.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(SPRING_PRESETS).map((presetName) => (
                    <Button
                      key={presetName}
                      variant="outline"
                      onClick={() => applyPreset(presetName)}
                    >
                      {t(`presets.${presetName}`)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 애니메이션 타입 선택 */}
            <Card>
              <CardHeader>
                <CardTitle>{t('animationType.title')}</CardTitle>
                <CardDescription>
                  {t('animationType.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {(['translate', 'scale', 'rotate'] as const).map((type) => (
                    <Button
                      key={type}
                      variant={animationType === type ? 'default' : 'outline'}
                      onClick={() => setAnimationType(type)}
                    >
                      {t(`animationType.${type}`)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 애니메이션 데모 영역 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('preview.title')}</CardTitle>
                <CardDescription>{t('preview.description')}</CardDescription>
              </CardHeader>
              <CardContent>
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
                    onClick={triggerAnimation}
                  >
                    📦
                  </motion.div>

                  {/* 가이드 텍스트 */}
                  <div className="absolute bottom-4 left-4 text-sm text-gray-500">
                    {t('preview.guide')}
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <Button
                    onClick={triggerAnimation}
                    className="w-full"
                    size="lg"
                  >
                    {t('preview.triggerButton')}
                  </Button>

                  {/* 현재 설정값 표시 */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">
                      {t('preview.currentConfig')}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        {t('springConfiguration.stiffness.label')}:{' '}
                        <span className="font-mono">
                          {springConfig.stiffness}
                        </span>
                      </div>
                      <div>
                        {t('springConfiguration.damping.label')}:{' '}
                        <span className="font-mono">
                          {springConfig.damping}
                        </span>
                      </div>
                      <div>
                        {t('springConfiguration.mass.label')}:{' '}
                        <span className="font-mono">{springConfig.mass}</span>
                      </div>
                      <div>
                        {t('springConfiguration.velocity.label')}:{' '}
                        <span className="font-mono">
                          {springConfig.velocity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 설명 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>{t('understanding.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>{t('springConfiguration.stiffness.label')}:</strong>{' '}
                  {t('understanding.stiffness')}
                </div>
                <div>
                  <strong>{t('springConfiguration.damping.label')}:</strong>{' '}
                  {t('understanding.damping')}
                </div>
                <div>
                  <strong>{t('springConfiguration.mass.label')}:</strong>{' '}
                  {t('understanding.mass')}
                </div>
                <div>
                  <strong>{t('springConfiguration.velocity.label')}:</strong>{' '}
                  {t('understanding.velocity')}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
