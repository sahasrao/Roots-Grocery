import type { Diet } from '../data/diets'

export interface ProfilePreferences {
  diets: Diet[]
  address: string
}

const DEFAULT_PREFS: ProfilePreferences = {
  diets: [],
  address: '',
}

function storageKey(userId: string) {
  return `roots-profile-${userId}`
}

export function readProfilePreferences(userId: string): ProfilePreferences {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) return DEFAULT_PREFS
    const parsed = JSON.parse(raw) as Partial<ProfilePreferences>
    return {
      diets: Array.isArray(parsed.diets) ? parsed.diets : [],
      address: typeof parsed.address === 'string' ? parsed.address : '',
    }
  } catch {
    return DEFAULT_PREFS
  }
}

export function writeProfilePreferences(
  userId: string,
  preferences: ProfilePreferences,
) {
  localStorage.setItem(storageKey(userId), JSON.stringify(preferences))
}
