import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Zap } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Eye,
      title: "Privacy Problem",
      description: "When you click a regular link, your ISP, trackers, and analytics can see exactly where you're going.",
      iconColor: "text-red-500",
    },
    {
      icon: Lock,
      title: "Encryption",
      description: "We encrypt the destination URL so that trackers can't see where you're actually heading.",
      iconColor: "text-amber-500",
    },
    {
      icon: Shield,
      title: "Protection",
      description: "Our secure redirect service masks the true destination, protecting your browsing habits.",
      iconColor: "text-green-600",
    },
    {
      icon: Zap,
      title: "Fast & Secure",
      description: "The redirect happens quickly, with minimal delay, while maintaining your privacy.",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>How Link Protection Works</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className={`rounded-full p-2 ${step.iconColor} bg-muted h-fit`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}