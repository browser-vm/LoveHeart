import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useEncryption } from "@/contexts/encryption-context";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { recordProtectedLink } from "@/lib/stats-tracker";

export default function RedirectPage() {
  const { encryptedUrl } = useParams<{ encryptedUrl: string }>();
  const navigate = useNavigate();
  const { decryptUrl, settings } = useEncryption();
  const [url, setUrl] = useState<string>("");
  const [countdown, setCountdown] = useState(parseInt(settings.redirectDelay) || 3);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [statsRecorded, setStatsRecorded] = useState(false);

  useEffect(() => {
    if (!encryptedUrl) {
      setError("No URL provided");
      return;
    }

    try {
      const decrypted = decryptUrl(encryptedUrl);
      if (!decrypted) {
        setError("Invalid URL");
        return;
      }
      setUrl(decrypted);
      
      // Record statistics only once
      if (!statsRecorded) {
        recordProtectedLink();
        setStatsRecorded(true);
      }
      
      // If delay is set to 0, redirect immediately
      if (parseInt(settings.redirectDelay) === 0) {
        window.location.href = decrypted;
        return;
      }
      
      // Start countdown
      const totalTime = parseInt(settings.redirectDelay) * 1000;
      const interval = 50; // Update progress every 50ms for smooth animation
      const timer = setInterval(() => {
        setCountdown((prev) => {
          const newValue = prev - (interval / 1000);
          if (newValue <= 0) {
            clearInterval(timer);
            window.location.href = decrypted;
            return 0;
          }
          return newValue;
        });
        
        setProgress((prev) => {
          const newProgress = prev + (interval / totalTime) * 100;
          return Math.min(newProgress, 100);
        });
      }, interval);
      
      return () => clearInterval(timer);
    } catch (e) {
      setError("Failed to decrypt URL");
    }
  }, [encryptedUrl, navigate, decryptUrl, settings.redirectDelay, statsRecorded]);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg text-center space-y-4">
        <div className="flex justify-center">
          <Shield className="h-16 w-16 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-2xl font-bold">Secure Redirect</h1>
        
        {error ? (
          <div className="text-destructive">
            <p>{error}</p>
            <Button 
              onClick={() => navigate("/")}
              className="mt-4"
            >
              Return Home
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground">
              You are being redirected through our secure link service.
            </p>
            
            <div className="bg-muted p-3 rounded-md break-all">
              <p className="text-sm font-mono">{url}</p>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div className="text-lg font-medium">
              Redirecting in <span className="text-primary">{Math.ceil(countdown)}</span> seconds...
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => window.location.href = url}
                className="px-4 py-2"
              >
                Continue Now
              </Button>
              <Button 
                onClick={() => navigate("/")}
                variant="outline"
                className="px-4 py-2"
              >
                Cancel
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              This link is encrypted to protect your privacy from trackers and surveillance.
            </p>
          </>
        )}
      </div>
    </main>
  );
}