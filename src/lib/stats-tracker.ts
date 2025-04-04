/**
 * Utility to track link protection statistics
 */

interface EncryptionStats {
  linksProtected: number;
  trackersBlocked: number;
  timeSaved: number; // in seconds
}

const STATS_STORAGE_KEY = "encryptionStats";

// Initialize stats from localStorage or with defaults
function getInitialStats(): EncryptionStats {
  try {
    const savedStats = localStorage.getItem(STATS_STORAGE_KEY);
    if (savedStats) {
      return JSON.parse(savedStats);
    }
  } catch (e) {
    console.error("Failed to parse encryption stats:", e);
  }
  
  return {
    linksProtected: 0,
    trackersBlocked: 0,
    timeSaved: 0,
  };
}

// Save stats to localStorage
function saveStats(stats: EncryptionStats): void {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
}

// Get current stats
export function getStats(): EncryptionStats {
  return getInitialStats();
}

// Record a protected link visit
export function recordProtectedLink(): void {
  const stats = getInitialStats();
  stats.linksProtected += 1;
  
  // Estimate trackers blocked (between 1-5 per link)
  const trackersBlocked = Math.floor(Math.random() * 5) + 1;
  stats.trackersBlocked += trackersBlocked;
  
  // Estimate time saved (between 0.1-0.5 seconds per link)
  const timeSaved = (Math.random() * 0.4 + 0.1);
  stats.timeSaved += timeSaved;
  
  saveStats(stats);
}

// Reset stats
export function resetStats(): void {
  saveStats({
    linksProtected: 0,
    trackersBlocked: 0,
    timeSaved: 0,
  });
}