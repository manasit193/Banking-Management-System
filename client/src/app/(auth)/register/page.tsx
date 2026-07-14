import RegisterForm from "@/components/auth/RegisterForm";


export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6">

        <RegisterForm />

      </div>

    </main>
  );
}