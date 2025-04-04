import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ExternalLink, Clock } from "lucide-react";
import { getStats } from "@/lib/stats-tracker";

interface EncryptionStats {
  linksProtected: number;
  trackersBlocked: number;
  timeSaved: number; // in seconds
}

export function EncryptionStats() {
  const [stats, setStats] = useState<EncryptionStats>({
    linksProtected: 0,
    trackersBlocked: 0,
    timeSaved: 0,
  });

  useEffect(() => {
    // Initial load
    setStats(getStats());
    
    // Update stats periodically
    const interval = setInterval(() => {
      setStats(getStats());
    }, 5000); // Check for updates every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Links Protected</CardTitle>
          <Shield className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.linksProtected}</div>
          <p className="text-xs text-muted-foreground">
            Secure redirects processed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Trackers Blocked</CardTitle>
          <ExternalLink className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.trackersBlocked}</div>
          <p className="text-xs text-muted-foreground">
            Tracking attempts prevented
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.timeSaved.toFixed(1)}s</div>
          <p className="text-xs text-muted-foreground">
            Loading time optimization
          </p>
        </CardContent>
      </Card>
    </div>
  );
}