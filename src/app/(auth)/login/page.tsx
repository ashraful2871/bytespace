import type { Metadata } from "next";
import Placeholder from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="container-page flex flex-col gap-6 pt-10 pb-16 text-white md:pt-[52px]">
      <h1 className="type-title max-md:text-[30px]/[1.25]">Welcome Back</h1>
      <Placeholder phase="13" className="bg-white">
        Sign-in form and collage.
      </Placeholder>
    </div>
  );
}
