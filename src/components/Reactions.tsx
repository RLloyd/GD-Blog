// src/components/Reactions.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'
import { Heart, ThumbsUp, ThumbsDown, Star, Coffee } from 'lucide-react'

const REACTIONS = [
  { type: 'like', icon: ThumbsUp },
  { type: 'love', icon: Heart },
  { type: 'star', icon: Star },
  { type: 'coffee', icon: Coffee },
] as const

export function Reactions({ postId }: { postId: string }) {
  const { user } = useAuth()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [userReaction, setUserReaction] = useState<string | null>(null)

  useEffect(() => {
    loadReactions()
    if (user) loadUserReaction()
  }, [postId, user])

  const loadReactions = async () => {
    const { data } = await supabaseClient
      .from('reactions')
      .select('type')
      .eq('post_id', postId)

    const newCounts: Record<string, number> = {}
    data?.forEach(reaction => {
      newCounts[reaction.type] = (newCounts[reaction.type] || 0) + 1
    })
    setCounts(newCounts)
  }

  const loadUserReaction = async () => {
    if (!user) return
    const { data } = await supabaseClient
      .from('reactions')
      .select('type')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    setUserReaction(data?.type || null)
  }

  const handleReaction = async (type: string) => {
    if (!user) return

    try {
      if (userReaction === type) {
        await supabaseClient
          .from('reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
        setUserReaction(null)
      } else {
        await supabaseClient
          .from('reactions')
          .upsert({
            post_id: postId,
            user_id: user.id,
            type
          })
        setUserReaction(type)
      }
      loadReactions()
    } catch (error) {
      console.error('Error updating reaction:', error)
    }
  }

  return (
    <div className="flex gap-4 items-center">
      {REACTIONS.map(({ type, icon: Icon }) => (
        <button
          key={type}
          onClick={() => handleReaction(type)}
          className={`flex items-center gap-1 p-2 rounded-full transition-colors
            ${userReaction === type
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          <Icon size={20} />
          <span className="text-sm">{counts[type] || 0}</span>
        </button>
      ))}
    </div>
  )
}