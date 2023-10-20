import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  chatTabs: ChatTab[]
  activeChatTab: ChatTab | null
}

type Actions = {
  setActiveChatTab: (tab: ChatTab) => void
  setChatTabs: (tabs: ChatTab[]) => void
  addChatTab: (tab: ChatTab) => void
  removeChatTab: (id: string) => void
}

export const useTabsStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      chatTabs: [],
      activeChatTab: null,
      setActiveChatTab: (tab) => set({ activeChatTab: tab }),
      setChatTabs: (tabs) => set({ chatTabs: tabs }),
      addChatTab: (tab) =>
        set((state) => ({
          chatTabs: state.chatTabs.find((t) => t.id === tab.id)
            ? state.chatTabs
            : [...state.chatTabs, tab],
        })),
      removeChatTab: (id) =>
        set((state) => ({
          chatTabs: state.chatTabs.filter((t) => t.id !== id),
          activeChatTab:
            state.activeChatTab?.id === id
              ? null
              : state.activeChatTab,
        })),
    }),
    {
      name: 'tabs-storage',
    },
  ),
)
