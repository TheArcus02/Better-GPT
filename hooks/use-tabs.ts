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
  updateChatTab: (tab: ChatTab) => void
}

export const useTabsStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      chatTabs: [],
      activeChatTab: null,
      setActiveChatTab: (tab) => set({ activeChatTab: tab }),
      setChatTabs: (tabs) => set({ chatTabs: tabs }),
      addChatTab: (tab) =>
        set({
          chatTabs: get().chatTabs.find((t) => t.id === tab.id)
            ? get().chatTabs
            : [...get().chatTabs, tab],
        }),
      removeChatTab: (id) =>
        set({
          chatTabs: get().chatTabs.filter((t) => t.id !== id),
          activeChatTab:
            get().activeChatTab?.id === id
              ? null
              : get().activeChatTab,
        }),
      updateChatTab: (tab) =>
        set({
          chatTabs: get().chatTabs.map((t) =>
            t.id === tab.id ? tab : t,
          ),
        }),
    }),
    {
      name: 'tabs-storage',
    },
  ),
)
