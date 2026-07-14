import { Suspense } from "react";
import LoginBanner from "@/components/auth/LoginBanner";
import LoginForm from "@/components/auth/LoginForm";


export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6">

        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        
          <LoginBanner />

          <Suspense fallback={<div className="flex items-center justify-center p-10">Loading...</div>}>
            <LoginForm />
          </Suspense>

        </div>

      </div>

    </main>
  );
}