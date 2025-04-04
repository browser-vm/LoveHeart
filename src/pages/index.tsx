import { useState } from "react";
import { SecureLink } from "@/components/ui/secure-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ExternalLink, Heart } from "lucide-react";
import { useEncryption } from "@/contexts/encryption-context";
import { EncryptionStats } from "@/components/encryption-stats";
import { HowItWorks } from "@/components/how-it-works";

const Index = () => {
  const [customUrl, setCustomUrl] = useState("");
  const [encryptedResult, setEncryptedResult] = useState("");
  const { encryptUrl, settings } = useEncryption();

  const handleEncrypt = () => {
    if (!customUrl) return;
    const encrypted = encryptUrl(customUrl);
    setEncryptedResult(encrypted);
  };

  const exampleLinks = [
    { name: "Google", url: "https://www.google.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Reddit", url: "https://www.reddit.com" },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold">LoveHeart</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Enhanced Link Protection
          </p>
        </div>

        <EncryptionStats />
        
        <HowItWorks />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Link Protection
            </CardTitle>
            <CardDescription>
              Our service encrypts your outgoing links to protect your privacy from trackers and surveillance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Try it yourself</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter a URL to encrypt" 
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                <Button onClick={handleEncrypt}>Encrypt</Button>
              </div>
              
              {encryptedResult && (
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm font-mono break-all">
                    Encrypted: {encryptedResult}
                  </p>
                  <div className="mt-2">
                    <SecureLink href={customUrl} external showIcon className="text-primary">
                      Click to visit through secure redirect
                    </SecureLink>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Example Protected Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exampleLinks.map((link) => (
                  <Card key={link.name} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{link.name}</div>
                        <div className="flex gap-2">
                          <SecureLink 
                            href={link.url} 
                            external 
                            showIcon
                            className="text-primary hover:underline"
                          >
                            Visit Securely
                          </SecureLink>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:underline flex items-center gap-1"
                          >
                            Direct <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {settings.advancedEncryption ? (
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-green-600" />
                  Advanced encryption is enabled
                </span>
              ) : (
                "Standard encryption is active"
              )}
            </p>
            <Button variant="outline" asChild>
              <SecureLink href="https://github.com/your-username/love-heart" external>
                View Source
              </SecureLink>
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            LoveHeart Link Protection - Making the web a more private place
          </p>
        </div>
      </div>
    </main>
  );
};

export default Index;