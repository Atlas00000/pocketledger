'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const auth = {
  // Sign in with magic link
  async signIn(email: string) {
    const supabase = createClientComponentClient()
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  },

  // Sign out
  async signOut() {
    const supabase = createClientComponentClient()
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  },

  // Get current session
  async getSession() {
    const supabase = createClientComponentClient()
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Error getting session:', error)
      throw error
    }
  },

  // Refresh session
  async refreshSession() {
    const supabase = createClientComponentClient()
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Error refreshing session:', error)
      throw error
    }
  }
} 