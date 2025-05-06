"use client";

import { useParams } from "next/navigation";

import PasswordActivateComponent from "@/components/PasswordActivateComponent";

export default function Active() {
  const params = useParams<{ token: string }>();
  return (
    <section className="flex  justify-center min-h-screen">
      <PasswordActivateComponent token={params.token} />
    </section>
  );
}
