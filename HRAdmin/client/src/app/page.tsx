import LoginSection from "@/components/login/LoginSection";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <LoginSection />
      <Toaster position="top-right" />
    </div>
  );
}
