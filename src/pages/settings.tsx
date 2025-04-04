import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Settings as SettingsIcon, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEncryption } from "@/contexts/encryption-context";
import { resetStats } from "@/lib/stats-tracker";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const { toast } = useToast();
  const { settings, updateSettings } = useEncryption();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your link protection preferences have been updated.",
    });
  };

  const handleResetStats = () => {
    resetStats();
    toast({
      title: "Statistics reset",
      description: "Your link protection statistics have been reset to zero.",
    });
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Link Protection Settings
          </CardTitle>
          <CardDescription>
            Configure how your links are protected from tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="encrypt-all">Encrypt all external links</Label>
              <p className="text-sm text-muted-foreground">
                Automatically encrypt all links to external websites
              </p>
            </div>
            <Switch
              id="encrypt-all"
              checked={settings.encryptAllLinks}
              onCheckedChange={(checked) => 
                updateSettings({ encryptAllLinks: checked })
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-status">Show encryption status</Label>
              <p className="text-sm text-muted-foreground">
                Display an icon next to links to indicate protection status
              </p>
            </div>
            <Switch
              id="show-status"
              checked={settings.showEncryptionStatus}
              onCheckedChange={(checked) => 
                updateSettings({ showEncryptionStatus: checked })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="redirect-delay">Redirect delay (seconds)</Label>
            <Select
              value={settings.redirectDelay}
              onValueChange={(value) => 
                updateSettings({ redirectDelay: value })
              }
            >
              <SelectTrigger id="redirect-delay">
                <SelectValue placeholder="Select delay" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No delay</SelectItem>
                <SelectItem value="1">1 second</SelectItem>
                <SelectItem value="3">3 seconds</SelectItem>
                <SelectItem value="5">5 seconds</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              How long to wait on the redirect page before continuing
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="advanced-encryption" className="flex items-center gap-1">
                Advanced encryption
                <Shield className="h-3.5 w-3.5 text-green-600" />
              </Label>
              <p className="text-sm text-muted-foreground">
                Use more complex encryption for better protection
              </p>
            </div>
            <Switch
              id="advanced-encryption"
              checked={settings.advancedEncryption}
              onCheckedChange={(checked) => 
                updateSettings({ advancedEncryption: checked })
              }
            />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label>Statistics</Label>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Reset your link protection statistics
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleResetStats}
                className="flex items-center gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Stats
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings} className="w-full">
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}