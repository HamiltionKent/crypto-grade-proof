import { TrendingUp, Users, FileCheck, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "10K+", label: "Students Protected", color: "text-accent" },
  { icon: FileCheck, value: "50K+", label: "Records Encrypted", color: "text-achievement" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime", color: "text-accent" },
  { icon: Clock, value: "<1s", label: "Decrypt Time", color: "text-achievement" },
];

export const StatsShowcase = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-achievement/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center animate-fade-in stagger-${index + 1}`}
              style={{ animationFillMode: "both" }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border mb-3 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
