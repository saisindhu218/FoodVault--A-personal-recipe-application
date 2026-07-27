import { Link } from "react-router-dom";
import { ChefHat, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,hsl(var(--accent)/0.2),transparent_45%),radial-gradient(circle_at_85%_80%,hsl(var(--primary)/0.22),transparent_40%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--secondary)/0.6))] px-4 py-8 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 rounded-3xl border border-border/60 bg-card/55 p-6 shadow-2xl backdrop-blur-md md:grid-cols-2 md:p-10 lg:p-12">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <ChefHat className="h-4 w-4" />
            FoodVault Recipe Book
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Recipes. Organized Beautifully.
          </h1>

          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Keep every recipe in one smart, searchable collection. Add, edit, categorize, and rediscover your favorite meals whenever you need them.
          </p>

          <div className="grid gap-3 text-sm text-foreground sm:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-background/70 p-3">
              <ShieldCheck className="mb-2 h-4 w-4 text-primary" />
              Private recipes
            </div>
            <div className="rounded-xl border border-border/70 bg-background/70 p-3">
              <Timer className="mb-2 h-4 w-4 text-primary" />
              Fast meal search
            </div>
            <div className="rounded-xl border border-border/70 bg-background/70 p-3">
              <Sparkles className="mb-2 h-4 w-4 text-primary" />
              Easy editing
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-border/80 bg-background/90 p-6 shadow-lg sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Get Started</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose how you want to continue.
          </p>

          <div className="mt-6 space-y-3">
            <Button asChild className="h-11 w-full text-base font-semibold">
              <Link to="/auth?mode=signup">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 w-full text-base font-semibold">
              <Link to="/auth?mode=signin">Login</Link>
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Already signed in? You can continue straight to your recipes after login.
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Index;
