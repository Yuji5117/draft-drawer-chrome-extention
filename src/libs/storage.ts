import { Template, User } from "@/types";

type StorageSchema = {
  user: User;
  templatesCache: {
    data: Template[];
    lastUpdated: number;
  };
};

type StorageKeys = keyof StorageSchema;

export const storage = {
  async get<K extends StorageKeys>(
    key: K
  ): Promise<StorageSchema[K] | undefined> {
    try {
      const result = await chrome.storage.local.get(key);
      return result[key];
    } catch {
      return undefined;
    }
  },

  async set<K extends StorageKeys>(
    key: K,
    value: StorageSchema[K]
  ): Promise<void> {
    try {
      await chrome.storage.local.set({ [key]: value });
    } catch (error) {
      console.warn("Storage set failed:", key, error);
    }
  },

  async remove(key: StorageKeys): Promise<void> {
    try {
      await chrome.storage.local.remove(key);
    } catch (error) {
      console.warn("Storage remove failed:", key, error);
    }
  },
};
