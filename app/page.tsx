import Link from "next/link";
import { useTranslation } from "./i18n";

export default async function Home() {
  const { t } = await useTranslation("en");

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">YOUR MOVIES DATABASE!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link className="btn btn-secondary" href="/search/1">
              {t("homeButton")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
