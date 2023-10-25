import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

export const usePremiumModal = create<State>()(
  persist(
    (set, get) => ({
      isOpen: false,
      setOpen: (open) => set({ isOpen: open }),
    }),
    {
      name: 'premium-modal-storage',
    },
  ),
)
