"use client";
import AppLayout from "@/components/ui/app-layout";
import DefaultError from "@/components/ui/error";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <AppLayout>
      <DefaultError error={error} reset={reset} />
    </AppLayout>
  );
};

export default ErrorPage;
