import { Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EncryptionStatusProps {
  isEncrypted: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EncryptionStatus({ 
  isEncrypted, 
  className,
  size = "md" 
}: EncryptionStatusProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  return isEncrypted ? (
    <Shield className={cn(
      "text-green-600 dark:text-green-400", 
      sizeClasses[size],
      className
    )} />
  ) : (
    <AlertTriangle className={cn(
      "text-amber-500 dark:text-amber-400", 
      sizeClasses[size],
      className
    )} />
  );
}