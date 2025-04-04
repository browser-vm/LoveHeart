import React, { createContext, useContext, useState, useEffect } from "react";
import { encryptUrl, decryptUrl } from"@/lib/encryption";
import { advancedEncryptUrl, advancedDecryptUrl, shouldEncryptUrl } from "@/lib/advanced-encryption";

interface EncryptionSettings {
  encryptAllLinks: boolean;
  showEncryptionStatus: boolean;
  redirectDelay: string;
  advancedEncryption: boolean;
}

interface EncryptionContextType {
  settings: EncryptionSettings;
  updateSettings: (settings: Partial<EncryptionSettings>) => void;
  encryptUrl: (url: string) => string;
  decryptUrl: (encryptedUrl: string) => string;
  shouldEncrypt: (url: string) => boolean;
}

const defaultSettings: EncryptionSettings = {
  encryptAllLinks: true,
  showEncryptionStatus: true,
  redirectDelay: "3",
  advancedEncryption: false,
};

const EncryptionContext = createContext<EncryptionContextType | undefined>(undefined);

export function EncryptionProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<EncryptionSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("linkEncryptionSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (e) {
        console.error("Failed to parse encryption settings:", e);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<EncryptionSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("linkEncryptionSettings", JSON.stringify(updated));
      return updated;
    });
  };

  const encrypt = (url: string) => {
    if (!url) return "";
    return settings.advancedEncryption ? advancedEncryptUrl(url) : encryptUrl(url);
  };

  const decrypt = (encryptedUrl: string) => {
    if (!encryptedUrl) return "";
    try {
      // Try advanced decryption first
      const advancedDecrypted = advancedDecryptUrl(encryptedUrl);
      if (advancedDecrypted) return advancedDecrypted;
      
      // Fall back to basic decryption
      return decryptUrl(encryptedUrl);
    } catch (e) {
      console.error("Decryption failed:", e);
      return "";
    }
  };

  const shouldEncrypt = (url: string) => {
    if (!settings.encryptAllLinks) return false;
    return shouldEncryptUrl(url);
  };

  return (
    <EncryptionContext.Provider
      value={{
        settings,
        updateSettings,
        encryptUrl: encrypt,
        decryptUrl: decrypt,
        shouldEncrypt,
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
}

export function useEncryption() {
  const context = useContext(EncryptionContext);
  if (context === undefined) {
    throw new Error("useEncryption must be used within an EncryptionProvider");
  }
  return context;
}