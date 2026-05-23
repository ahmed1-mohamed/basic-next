import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-20 gap-8">
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          {dict.common.welcome}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          A modern, production-ready scalable Next.js architecture.
        </p>
      </div>

      <div className="flex gap-4 mt-8">
        <a 
          href={`/${lang === "en" ? "ar" : "en"}`}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:opacity-80 text-sm sm:text-base h-10 sm:h-12 px-8 font-medium"
        >
          {dict.common.language}: {lang === "en" ? dict.common.arabic : dict.common.english}
        </a>
      </div>
    </main>
  );
}
