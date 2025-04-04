import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEncryption } from "@/contexts/encryption-context";

interface SecureLinkProps extends Omit<LinkProps, "to"> {
  href: string;
  external?: boolean;
  showIcon?: boolean;
  className?: string;
  iconClassName?: string;
  children: React.ReactNode;
  forceEncrypt?: boolean;
}

export function SecureLink({
  href,
  external = false,
  showIcon,
  className,
  iconClassName,
  children,
  forceEncrypt = false,
  ...props
}: SecureLinkProps) {
  const { encryptUrl, shouldEncrypt, settings } = useEncryption();
  
  // Determine if we should show the icon based on settings
  const displayIcon = showIcon ?? settings.showEncryptionStatus;
  
  // Determine if this link should be encrypted
  const shouldEncryptThis = forceEncrypt || (external && shouldEncrypt(href));
  
  if (shouldEncryptThis) {
    const encryptedPath = encryptUrl(href);
    const secureUrl = `/go/${encryptedPath}`;
    
    return (
      <Link 
        to={secureUrl} 
        className={cn("inline-flex items-center gap-1", className)} 
        {...props}
      >
        {children}
        {displayIcon && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Shield className={cn("h-3.5 w-3.5 text-green-600 dark:text-green-400", iconClassName)} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Protected link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Link>
    );
  }
  
  // For internal links or links that shouldn't be encrypted, just use regular Link
  if (!external) {
    return (
      <Link to={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  
  // For external links that aren't encrypted
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {children}
    </a>
  );
}