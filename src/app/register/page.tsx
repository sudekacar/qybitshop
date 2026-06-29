import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getServerTranslations } from "@/lib/locale-server";

export default async function RegisterPage() {
  const { t } = await getServerTranslations();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {t("auth.registerTitle")}
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {t("auth.registerSubtitle")}
        </p>

        <div className="mt-6">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t("auth.hasAccount")}{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("auth.loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
