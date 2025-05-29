'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    let score = 0
    let feedback = []

    // Length check
    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push('At least 8 characters')
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push('One uppercase letter')
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push('One lowercase letter')
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push('One number')
    }

    // Special character check
    if (/[@$!%*?&]/.test(password)) {
      score += 1
    } else {
      feedback.push('One special character')
    }

    setStrength(score)
    setFeedback(feedback.join(', '))
  }, [password])

  const strengthColors = {
    0: 'bg-red-500',
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-blue-500',
    5: 'bg-green-500',
  }

  const strengthLabels = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Fair',
    3: 'Good',
    4: 'Strong',
    5: 'Very Strong',
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex gap-1 h-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 rounded-full transition-colors duration-300',
              i < strength ? strengthColors[strength as keyof typeof strengthColors] : 'bg-gray-200'
            )}
          />
        ))}
      </div>
      {password && (
        <div className="flex justify-between text-sm">
          <span className={cn(
            'font-medium',
            strength <= 2 ? 'text-red-500' :
            strength === 3 ? 'text-yellow-500' :
            'text-green-500'
          )}>
            {strengthLabels[strength as keyof typeof strengthLabels]}
          </span>
          {feedback && (
            <span className="text-gray-500">
              Needs: {feedback}
            </span>
          )}
        </div>
      )}
    </div>
  )
} 