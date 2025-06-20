import { useState } from 'react'
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
import { AnimationPreview } from './components/AnimationPreview'
import type { SpringConfig, AnimationType } from './types/spring'
import { SPRING_PRESETS } from './types/spring'

function App() {
  const { t, i18n } = useTranslation()
  const [springConfig, setSpringConfig] = useState<SpringConfig>(
    SPRING_PRESETS.default
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState<AnimationType>('translate')

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
            <AnimationPreview
              springConfig={springConfig}
              isAnimating={isAnimating}
              animationType={animationType}
              onTriggerAnimation={triggerAnimation}
            />

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
