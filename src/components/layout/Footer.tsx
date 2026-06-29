import { getServerTranslations } from "@/lib/locale-server";

export async function Footer() {
  const { t } = await getServerTranslations();

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-base font-semibold text-white">{t("footer.brand")}</p>
            <p className="mt-1 text-sm text-slate-400">{t("footer.subtitle")}</p>
          </div>
          <p className="text-center text-sm text-slate-500 sm:text-right">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
