import { Shield, Lock, Key, Fingerprint, Database, Server } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "Your grades are encrypted using FHE technology",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Only you control who sees your records",
  },
  {
    icon: Key,
    title: "Selective Disclosure",
    description: "Reveal specific grades without exposing all",
  },
  {
    icon: Fingerprint,
    title: "Verifiable Proofs",
    description: "Cryptographic proof of authenticity",
  },
  {
    icon: Database,
    title: "On-Chain Storage",
    description: "Immutable and tamper-proof records",
  },
  {
    icon: Server,
    title: "Decentralized",
    description: "No single point of failure",
  },
];

export const DecorativeSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-achievement rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Why <span className="text-gradient">Crypto Grade Proof</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built on cutting-edge Fully Homomorphic Encryption technology to protect your academic achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-6 rounded-xl bg-card border border-border card-hover gradient-border animate-fade-in stagger-${(index % 5) + 1}`}
              style={{ animationFillMode: "both" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent group-hover:animate-bounce-subtle" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
