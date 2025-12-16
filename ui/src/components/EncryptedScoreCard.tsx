import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface EncryptedScoreCardProps {
  entryId: bigint;
  subject: string;
  encryptedScore: string;
  progress: number;
  isDecrypted?: boolean;
  isDecrypting?: boolean;
  onDecrypt: (entryId: bigint) => Promise<void>;
}

export const EncryptedScoreCard = ({ 
  entryId, 
  subject, 
  encryptedScore, 
  progress, 
  isDecrypted = false,
  isDecrypting = false,
  onDecrypt
}: EncryptedScoreCardProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showSparkle, setShowSparkle] = useState(false);

  // Animate progress when decrypted
  useEffect(() => {
    if (isDecrypted) {
      setShowSparkle(true);
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      const sparkleTimer = setTimeout(() => {
        setShowSparkle(false);
      }, 1500);
      return () => {
        clearTimeout(timer);
        clearTimeout(sparkleTimer);
      };
    } else {
      setAnimatedProgress(0);
    }
  }, [isDecrypted, progress]);

  // Debug: Log props changes
  console.log("[EncryptedScoreCard] Render:", JSON.stringify({
    entryId: entryId.toString(),
    subject,
    progress,
    isDecrypted,
    isDecrypting,
    encryptedScore: encryptedScore?.substring(0, 20),
  }, null, 2));

  const handleDecrypt = async () => {
    try {
      console.log("[EncryptedScoreCard] Starting decryption for entryId:", entryId.toString());
      await onDecrypt(entryId);
    } catch (error) {
      console.error("[EncryptedScoreCard] Failed to decrypt:", error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-achievement";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <Card 
      className={`
        border-l-4 decrypt-transition card-hover gradient-border relative overflow-hidden
        ${isDecrypted ? 'border-l-achievement' : 'border-l-accent'}
        ${isDecrypting ? 'animate-pulse-glow' : ''}
      `}
    >
      {/* Shimmer effect during decryption */}
      {isDecrypting && (
        <div className="absolute inset-0 shimmer-bg animate-shimmer opacity-50" />
      )}
      
      {/* Sparkle effect on decrypt */}
      {showSparkle && (
        <div className="absolute top-2 right-2 animate-bounce-subtle">
          <Sparkles className="h-5 w-5 text-achievement animate-pulse" />
        </div>
      )}

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg transition-all duration-300 ${isDecrypted ? 'text-foreground' : ''}`}>
            {subject}
          </CardTitle>
          <Badge 
            variant={isDecrypted ? "verified" : "locked"}
            className={`transition-all duration-500 ${isDecrypted ? 'animate-scale-in' : ''}`}
          >
            <span className="flex items-center">
              {isDecrypted ? (
                <Eye className="h-3 w-3 mr-1" />
              ) : (
                <Lock className={`h-3 w-3 mr-1 ${isDecrypting ? 'animate-spin' : ''}`} />
              )}
              <span>{isDecrypted ? "Decrypted" : isDecrypting ? "Decrypting..." : "Encrypted"}</span>
            </span>
          </Badge>
        </div>
        <CardDescription className="font-mono text-xs break-all transition-all duration-300">
          <span className={isDecrypted ? getScoreColor(progress) : ''}>
            {isDecrypted ? `Score: ${progress}/100` : `${encryptedScore.substring(0, 20)}...`}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 relative z-10">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Score</span>
            <span className={`font-semibold transition-all duration-500 ${isDecrypted ? getScoreColor(progress) : 'text-foreground'}`}>
              {isDecrypted ? `${progress}/100` : "Encrypted"}
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={animatedProgress} 
              className="h-2 progress-animated" 
            />
            {isDecrypted && animatedProgress >= 90 && (
              <div className="absolute -right-1 -top-1">
                <span className="text-xs">🏆</span>
              </div>
            )}
          </div>
        </div>
        {!isDecrypted && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs group hover:bg-accent/10 transition-all duration-300"
            onClick={handleDecrypt}
            disabled={isDecrypting}
          >
            {isDecrypting ? (
              <span className="flex items-center">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                <span className="animate-pulse">Decrypting...</span>
              </span>
            ) : (
              <span className="flex items-center">
                <span className="relative w-3 h-3 mr-1">
                  <Lock className="h-3 w-3 absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
                  <Eye className="h-3 w-3 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </span>
                <span>Decrypt Score</span>
              </span>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
