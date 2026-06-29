import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { getServerTranslations } from "@/lib/locale-server";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { t } = await getServerTranslations();
  const params = await searchParams;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {t("auth.loginTitle")}
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {t("auth.loginSubtitle")}
        </p>

        <div className="mt-6">
          <LoginForm redirectTo={params.redirect} />
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t("auth.noAccount")}{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("auth.registerLink")}
          </Link>
        </p>

        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <p className="font-medium">{t("auth.demoAccount")}</p>
          <p className="mt-1">E-posta: demo@qybitlabs.com</p>
          <p>{t("auth.demoPassword")}</p>
        </div>
      </div>
    </div>
  );
}
