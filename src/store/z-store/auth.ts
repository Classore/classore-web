import { create } from 'zustand'

interface AuthStore {
	tempToken: string | null
	setTempToken: (token: string | null) => void
}

// Store for temporary token during
export const useTempAuthStore = create<AuthStore>(set => ({
	tempToken: null,
	setTempToken: (token: string | null) => set({ tempToken: token }),
}))
