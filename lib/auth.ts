'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const auth = {
  // Sign in with magic link
  async signIn(email: string) {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) throw error
  },

  // Sign out
  async signOut() {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
} 