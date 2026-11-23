import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] items-center justify-center pt-32">
      <div className="text-center">
        <p className="text-7xl font-bold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold text-text-primary">
          Page Not Found
        </h1>
        <p className="mt-2 text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </Section>
  );
}
