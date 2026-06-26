import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="font-metric text-6xl font-medium text-primary mb-4">404</p>
      <h2 className="text-2xl font-heading font-bold text-wordmark mb-3">
        Page not found
      </h2>
      <p className="text-slate mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" variant="primary" size="md">
        Back to Home
      </Button>
    </div>
  );
}
