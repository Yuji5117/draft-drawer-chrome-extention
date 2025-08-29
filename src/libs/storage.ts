export const storage = {
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const result = await chrome.storage.local.get(key);
      return result[key];
    } catch {
      return undefined;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await chrome.storage.local.set({ [key]: value });
    } catch (error) {
      console.warn('Storage set failed:', key, error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await chrome.storage.local.remove(key);
    } catch (error) {
      console.warn('Storage remove failed:', key, error);
    }
  }
};