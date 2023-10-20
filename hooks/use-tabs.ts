import { create } from 'zustand'

type State = {
  chatTabs: ChatTab[]
  activeChatTab: ChatTab | null
}

type Actions = {
  setActiveChatTab: (tab: ChatTab) => void
  setChatTabs: (tabs: ChatTab[]) => void
}

const useTabs = create<State & Actions>((set) => ({
  chatTabs: [],
  activeChatTab: null,
  setActiveChatTab: (tab) => set({ activeChatTab: tab }),
  setChatTabs: (tabs) => set({ chatTabs: tabs }),
}))

export default useTabs
