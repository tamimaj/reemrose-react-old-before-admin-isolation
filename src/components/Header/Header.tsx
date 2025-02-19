import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import siteSettings from "../../settings/siteSettings";
import LanguagesMenu from "./LanguageMenu/LanguagesMenu";
import MobileMenuDrawer from "./MobileMenuDrawer/MobileMenuDrawer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../settings/ROUTES";
import LanguageDetector from "../../hooks/LanguageDetector/LanguageDetector";
import Button from "../Button";

interface HeaderTypes {
  text: string;
  link: string;
}
const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [lang, setLang] = useState<string | null>("");

  LanguageDetector(setLang);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((v) => !v);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${
          pathname === "/admin" ? "hidden" : "flex"
        } justify-center w-full font-PlusJakartaSans`}
      >
        <nav className="max-w-[1440px]  w-[90%] h-[40px] mt-5 flex items-center justify-between">
          <Link to={ROUTES.HOME}>
            <img
              src={siteSettings.logo.url}
              alt={siteSettings.logo.alt}
              className="w-[32px] h-[32px]  lg:w-[40px] lg:h-[40px] cursor-pointer"
            />
          </Link>

          <div className="hidden lg:flex text-base w-[405px] ml-[220px] xl:ml-[256px]">
            {siteSettings.header.map((v: HeaderTypes, idx: number) => (
              <Link
                to={v.link}
                key={idx}
                className="mr-8 text-bodyText hover:text-white cursor-pointer"
              >
                {t(v.text)}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center ">
            {/* <LanguagesMenu /> */}

            <Button
              variant="tertiary"
              text={t(siteSettings.scheduleText)}
              href={ROUTES.SCHEDULE}
              withArrow
            />
          </div>
          <div className="flex lg:hidden cursor-pointer">
            <IoMdMenu
              onClick={toggleMobileMenu}
              className="text-[32px] text-primary"
            />
          </div>
        </nav>
        <MobileMenuDrawer
          handleMenuClose={closeMobileMenu}
          openMenu={mobileMenuOpen}
        />
      </header>
    </>
  );
};

export default Header;
