import { Shield, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-card/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">
              Powered by Fully Homomorphic Encryption
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 Crypto Grade Proof. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
