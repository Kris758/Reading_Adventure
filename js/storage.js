/**
 * Reading Adventure - LocalStorage Persistence
 * Handles saving/loading profiles and game state.
 */

const STORAGE_KEY = 'readingAdventure_profiles';
const ACTIVE_KEY = 'readingAdventure_activeProfile';

/** Load all saved profiles from LocalStorage */
export function loadProfiles() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/** Save all profiles to LocalStorage */
export function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

/** Get the active profile ID */
export function getActiveProfileId() {
  return localStorage.getItem(ACTIVE_KEY);
}

/** Set the active profile ID */
export function setActiveProfileId(id) {
  localStorage.setItem(ACTIVE_KEY, id);
}

/** Clear active profile (for switching) */
export function clearActiveProfile() {
  localStorage.removeItem(ACTIVE_KEY);
}

/** Generate a unique profile ID from name */
export function generateProfileId(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20);
  return `${slug}_${Date.now()}`;
}

/** Save a single profile */
export function saveProfile(profile) {
  const profiles = loadProfiles();
  profiles[profile.id] = profile;
  saveProfiles(profiles);
}

/** Load a single profile by ID */
export function loadProfile(id) {
  const profiles = loadProfiles();
  return profiles[id] || null;
}

/** Delete a profile */
export function deleteProfile(id) {
  const profiles = loadProfiles();
  delete profiles[id];
  saveProfiles(profiles);
}

/** Get list of profile summaries for selection screen */
export function getProfileList() {
  const profiles = loadProfiles();
  return Object.values(profiles).map((p) => ({
    id: p.id,
    name: p.name,
    rankId: p.rankId,
    xp: p.xp,
    coins: p.coins,
    avatar: p.equipped?.avatar || '🧒',
  }));
}
