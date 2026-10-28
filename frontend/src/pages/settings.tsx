import { useTheme } from 'next-themes'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { revealIn } from '@/lib/motion'

const themes = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: MonitorIcon },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={`mx-auto max-w-3xl p-6 ${revealIn}`}>
      <header className="pb-5">
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="text-xs text-muted-foreground">
          Adjust how Openbook looks on your device.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Choose a colour scheme. System follows your OS setting.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {themes.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={theme === value ? 'default' : 'outline'}
              size="sm"
              className="w-24 justify-start text-xs"
              onClick={() => setTheme(value)}
            >
              <Icon />
              {label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
