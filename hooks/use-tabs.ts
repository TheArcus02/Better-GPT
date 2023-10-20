import { create } from 'zustand'

type State = {
  chatTabs: ChatTab[]
  activeChatTab: ChatTab | null
}

type Actions = {
  setActiveChatTab: (tab: ChatTab) => void
  setChatTabs: (tabs: ChatTab[]) => void
  addChatTab: (tab: ChatTab) => void
  removeChatTab: (id: string) => void
  removeActiveChatTab: () => void
}

const useTabs = create<State & Actions>((set) => ({
  chatTabs: [],
  activeChatTab: null,
  setActiveChatTab: (tab) => set({ activeChatTab: tab }),
  setChatTabs: (tabs) => set({ chatTabs: tabs }),
  addChatTab: (tab) =>
    set((state) => ({ chatTabs: [...state.chatTabs, tab] })),
  removeChatTab: (id) =>
    set((state) => ({
      chatTabs: state.chatTabs.filter((t) => t.id !== id),
    })),
  removeActiveChatTab: () => {
    set((state) => ({
      chatTabs: state.chatTabs.filter(
        (t) => t.id !== state.activeChatTab?.id,
      ),
    }))
    set((state) => ({
      activeChatTab:
        state.chatTabs[state.chatTabs.length - 1] || null,
    }))
  },
}))

export default useTabs
