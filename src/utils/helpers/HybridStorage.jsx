import * as Application from "expo-application";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = process.env.EXPO_PUBLIC_ASYNC_STORAGE_KEY || "MyApp$:$:";

class HybridStorage {
  // Get a unique installation ID
  async getDeviceAppInstallId() {
    try {
      if (Platform.OS === "web") {
        let webId = localStorage.getItem(`${PREFIX}installId`);
        if (!webId) {
          webId = Math.random().toString(36).substring(2, 10); // simple unique id
          localStorage.setItem(`${PREFIX}installId`, webId);
        }
        return webId;
      } else {
        const installId = await Application.getInstallationTimeAsync();
        return installId.toString();
      }
    } catch (error) {
      console.error("Failed to get installation ID:", error);
      return null;
    }
  }

  // Validate app instance
  async validateAppInstanceOrClear() {
    const currentId = await this.getDeviceAppInstallId();
    let storedId;

    if (Platform.OS === "web") {
      storedId = localStorage.getItem(`${PREFIX}appInstanceId`);
      if (!storedId) {
        localStorage.setItem(`${PREFIX}appInstanceId`, currentId);
      } else if (storedId !== currentId) {
        console.log("App instance changed. Clearing localStorage...");
        this.clearAll();
        localStorage.setItem(`${PREFIX}appInstanceId`, currentId);
      }
    } else {
      storedId = await AsyncStorage.getItem(`${PREFIX}appInstanceId`);
      if (!storedId) {
        await AsyncStorage.setItem(`${PREFIX}appInstanceId`, currentId);
      } else if (storedId !== currentId) {
        console.log("App instance changed. Clearing AsyncStorage...");
        await AsyncStorage.clear();
        await AsyncStorage.setItem(`${PREFIX}appInstanceId`, currentId);
      }
    }
  }

  // Store data
  async setItem(key, value) {
    try {
      await this.validateAppInstanceOrClear();
      const jsonValue = JSON.stringify(value);

      if (Platform.OS === "web") {
        localStorage.setItem(PREFIX + key, jsonValue);
      } else {
        await AsyncStorage.setItem(PREFIX + key, jsonValue);
      }
      return { success: true };
    } catch (error) {
      console.error("@storage || Error setting item:", error);
      return { success: false, error };
    }
  }

  // Get data
  async getItem(key) {
    try {
      await this.validateAppInstanceOrClear();
      let result;

      if (Platform.OS === "web") {
        result = localStorage.getItem(PREFIX + key);
        return result ? JSON.parse(result) : null;
      } else {
        result = await AsyncStorage.getItem(PREFIX + key);
        return result ? JSON.parse(result) : null;
      }
    } catch (error) {
      console.error("@storage || Error getting item:", error);
      return null;
    }
  }

  // Remove a key
  async removeItem(key) {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem(PREFIX + key);
      } else {
        await AsyncStorage.removeItem(PREFIX + key);
      }
      return { success: true };
    } catch (error) {
      console.error("@storage || Error removing item:", error);
      return { success: false, error };
    }
  }

  // Clear all keys with prefix
  async clearAll() {
    try {
      if (Platform.OS === "web") {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith(PREFIX)) localStorage.removeItem(key);
        });
      } else {
        await AsyncStorage.clear();
      }
      return { success: true };
    } catch (error) {
      console.error("@storage || Error clearing storage:", error);
      return { success: false, error };
    }
  }
}

export default new HybridStorage();
