import { FC } from "react";
import { Link } from "@tanstack/react-router";
import useTranslation from "@/hooks/useTranslation";

const Footer: FC = () => {
  const { t } = useTranslation(["common", "demo"]);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-900 border-t border-gray-800"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="text-xl font-bold text-white">
              {t("app.name", { ns: "common" })}
            </div>
            <p className="text-gray-400 max-w-xs">
              {t("app.tagline", { ns: "common" })}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/vaultic-org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://twitter.com/vaultic-org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://discord.gg/aeBjmbtt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </div>

          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              {t("nav.documentation", { ns: "common" })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/documentation"
                  search={{ section: "getting-started" }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("documentation.gettingStarted", { ns: "common" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  search={{ section: "installation" }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("documentation.installation.title", { ns: "common" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  search={{ section: "api" }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("documentation.api.title", { ns: "common" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  search={{ section: "usage" }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("documentation.usageExamples.title", { ns: "common" })}
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              {t("footer.resources", { ns: "common" })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/demo"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("title", { ns: "demo" })}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/vaultic-org/vaultic-crypto-engine"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.githubRepo", { ns: "common" })}
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/org/vaultic"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.npmPackage", { ns: "common" })}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.releaseNotes", { ns: "common" })}
                </a>
              </li>
            </ul>
          </nav>

          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              {t("footer.legal", { ns: "common" })}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.privacy", { ns: "common" })}
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.terms", { ns: "common" })}
                </a>
              </li>
              <li>
                <a
                  href="/license"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.license", { ns: "common" })}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          {" "}
          <p>
            {t("footer.copyright", { ns: "common", year: currentYear })}
          </p>{" "}
          <p className="mt-2">
            {" "}
            <span className="inline-flex items-center">
              {" "}
              <i className="fas fa-shield-alt mr-2 text-blue-400"></i>{" "}
              {t("footer.slogan", { ns: "common" })}{" "}
            </span>{" "}
          </p>{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
