import { Header } from "@/components/Header";
import { EncryptedScoreCard } from "@/components/EncryptedScoreCard";
import { UploadRecordModal } from "@/components/UploadRecordModal";
import { FloatingParticles } from "@/components/FloatingParticles";
import { DecorativeSection } from "@/components/DecorativeSection";
import { StatsShowcase } from "@/components/StatsShowcase";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Shield, Sparkles, TrendingUp } from "lucide-react";
import { useAccount } from "wagmi";
import { useEncryptedGradeRecord } from "@/hooks/useEncryptedGradeRecord";
import heroBanner from "@/assets/hero-banner.png";
import { useEffect } from "react";

const Index = () => {
  const { isConnected } = useAccount();
  const { grades, studentAverage, globalAverage, isLoading, isDeployed, decryptGrade } = useEncryptedGradeRecord();
  
  // Debug: Log grades when they change
  useEffect(() => {
    console.log("[Index] Grades changed:", JSON.stringify(
      grades.map(g => ({
        id: g.id.toString(),
        subject: g.subject,
        decryptedScore: g.decryptedScore,
        isDecrypting: g.isDecrypting,
      })),
      null,
      2
    ));
  }, [grades]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-hero overflow-hidden">
        <FloatingParticles />
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `url(${heroBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-spin-slow" />
        <div className="absolute bottom-10 right-20 w-48 h-48 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-fade-in">
              <Sparkles className="h-4 w-4 text-achievement" />
              <span className="text-sm text-primary-foreground/90">Powered by FHE Technology</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              Learn in Privacy.<br />Prove in Public.
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Store your encrypted learning scores and progress. Only verified certificates can be decrypted—without exposing all your records.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Showcase */}
      <StatsShowcase />

      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="card-hover animate-fade-in stagger-1" style={{ animationFillMode: 'both' }}>
            <CardHeader className="pb-3">
              <CardDescription>Total Courses</CardDescription>
              <CardTitle className="text-3xl">{isConnected && isDeployed ? grades.length : 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <BookOpen className="h-8 w-8 text-accent animate-float" />
            </CardContent>
          </Card>
          
          <Card className="card-hover animate-fade-in stagger-2" style={{ animationFillMode: 'both' }}>
            <CardHeader className="pb-3">
              <CardDescription>Average Score</CardDescription>
              <CardTitle className="text-3xl">
                {isConnected && isDeployed && studentAverage !== null ? studentAverage : "-"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Award className="h-8 w-8 text-achievement animate-float" style={{ animationDelay: '0.5s' }} />
            </CardContent>
          </Card>
          
          <Card className="card-hover animate-fade-in stagger-3" style={{ animationFillMode: 'both' }}>
            <CardHeader className="pb-3">
              <CardDescription>Decrypted Records</CardDescription>
              <CardTitle className="text-3xl">
                {isConnected && isDeployed ? grades.filter(g => g.decryptedScore !== undefined).length : 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Shield className="h-8 w-8 text-accent animate-float" style={{ animationDelay: '1s' }} />
            </CardContent>
          </Card>
          
          <Card className="card-hover animate-fade-in stagger-4" style={{ animationFillMode: 'both' }}>
            <CardHeader className="pb-3">
              <CardDescription>Status</CardDescription>
              <CardTitle className="text-lg">
                {!isConnected ? "Not Connected" : !isDeployed ? "Not Deployed" : isLoading ? "Loading..." : "Ready"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GraduationCap className="h-8 w-8 text-primary animate-float" style={{ animationDelay: '1.5s' }} />
            </CardContent>
          </Card>
        </div>

        {/* Encrypted Scores Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">Encrypted Learning Records</h2>
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>
            <UploadRecordModal />
          </div>
          {!isConnected ? (
            <div className="text-center py-12 text-muted-foreground glass-effect rounded-xl border border-border">
              <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50 animate-float" />
              Please connect your wallet to view your encrypted learning records.
            </div>
          ) : !isDeployed ? (
            <div className="text-center py-12 text-muted-foreground glass-effect rounded-xl border border-border">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50 animate-float" />
              Contract not deployed. Please deploy the contract first.
            </div>
          ) : isLoading ? (
            <div className="text-center py-12 text-muted-foreground glass-effect rounded-xl border border-border">
              <div className="h-12 w-12 mx-auto mb-4 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
              Loading grades...
            </div>
          ) : grades.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground glass-effect rounded-xl border border-border">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50 animate-float" />
              No grades submitted yet. Click "Upload Learning Record" to add your first grade.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grades.map((grade, index) => {
                const isDecrypted = grade.decryptedScore !== undefined;
                const progress = isDecrypted ? grade.decryptedScore! : 0;
                
                // Debug log for all grades
                console.log("[Index] Rendering grade:", JSON.stringify({
                  id: grade.id.toString(),
                  subject: grade.subject,
                  decryptedScore: grade.decryptedScore,
                  progress,
                  isDecrypted,
                  isDecrypting: grade.isDecrypting,
                  encryptedScore: grade.encryptedScore?.substring(0, 20),
                }, null, 2));
                
                return (
                  <div 
                    key={`grade-${grade.id.toString()}-${isDecrypted ? 'decrypted' : 'encrypted'}-${progress}`}
                    className={`animate-fade-in stagger-${(index % 5) + 1}`}
                    style={{ animationFillMode: 'both' }}
                  >
                    <EncryptedScoreCard
                      entryId={grade.id}
                      subject={grade.subject}
                      encryptedScore={grade.encryptedScore || "0x..."}
                      progress={progress}
                      isDecrypted={isDecrypted}
                      isDecrypting={grade.isDecrypting || false}
                      onDecrypt={decryptGrade}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Global Statistics Section (for school view) */}
        {isConnected && isDeployed && (
          <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-accent" />
              Global Statistics
            </h2>
            <Card className="card-hover overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardHeader>
                <CardTitle>School Overview</CardTitle>
                <CardDescription>Aggregated statistics from all students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Total Entries</p>
                    <p className="text-2xl font-bold text-foreground">{grades.length}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Global Average</p>
                    <p className="text-2xl font-bold text-foreground">
                      {globalAverage !== null ? globalAverage : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>

      {/* Decorative Features Section */}
      <DecorativeSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
