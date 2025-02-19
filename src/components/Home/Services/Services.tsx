import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ROUTES from "../../../settings/ROUTES";
import LanguageDetector from "../../../hooks/LanguageDetector/LanguageDetector";
import { getServices } from "../../../api/public/services";
import { HtmlConverter } from "../../../hooks/HtmlConverter/HtmlConverter";
import Loader from "../../Loader/Loader";
import CustomToast from "../../CustomToast/CustomToast";
import { toast } from "react-toastify";

interface ServiceDataProps {
  title: string;
  summary: string;
}

const Services = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [servicesData, setServicesData] = useState<ServiceDataProps[]>([]);
  const [active, setActive] = useState<number>(0);
  const navigate = useNavigate();
  const [lang, setLang] = useState<string | null>("");

  LanguageDetector(setLang);

  const handleActiveItem = (v: number) => {
    setActive(v);
  };
  const getServicesData = async () => {
    setLoading(true);
    const response = await getServices();
    if (!response || response?.status !== 200) {
      setLoading(false);
      toast(<CustomToast message={t("services.error")} />);
      return;
    }
    setServicesData(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    getServicesData();
  }, []);

  return servicesData.length > 0 ? (
    <div className="flex w-full mt-[120px] lg:mt-[204px]">
      {loading ? (
        <Loader className="h-[30vh]" />
      ) : (
        <>
          <div className="flex flex-col items-center lg:items-start lg:ml-6 w-full">
            <h6 className="text-white text-[32px] mb-6">
              {t("home.services.heading")}
            </h6>
            {servicesData.map((v, idx) => (
              <Fragment key={idx}>
                <div
                  onClick={() => handleActiveItem(idx)}
                  className={`flex justify-between w-full lg:w-[450px] xl:w-[688px] h-[60px] px-[24px] py-[20px] ${
                    active === idx
                      ? "bg-primary text-white"
                      : "bg-primaryLight text-bodyText"
                  } hover:bg-primary  hover:text-white rounded cursor-pointer mb-4`}
                >
                  <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <span>{v.title}</span>
                </div>
                {active === idx && (
                  <div className="flex lg:hidden flex-col mb-4">
                    {" "}
                    <h5 className="text-white text-[20px]">{v.title}</h5>
                    <p
                      className="text-sm text-bodyText mt-2"
                      dangerouslySetInnerHTML={HtmlConverter(v.summary)}
                    />
                    <span
                      onClick={() => navigate(ROUTES.SERVICES)}
                      className="mt-6 text-primary text-base font-semibold flex items-center cursor-pointer"
                    >
                      {t("home.readMore")}{" "}
                      {lang === "ar" ? (
                        <FiChevronLeft className="text-[20px] ml-4 mt-[2px]" />
                      ) : (
                        <FiChevronRight className="text-[20px] ml-4 mt-[2px]" />
                      )}
                    </span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <div className="hidden lg:flex flex-col min-w-[160px] w-full xl:ms-8 mt-[65px]">
            {servicesData.map(
              (v, idx) =>
                active === idx && (
                  <Fragment key={idx}>
                    {" "}
                    <h5 className="text-white text-[24px] ">{v.title}</h5>
                    <p
                      dangerouslySetInnerHTML={HtmlConverter(v.summary)}
                      className="text-sm 2xl:text-base text-bodyText mt-6"
                    />
                  </Fragment>
                )
            )}
            <span
              onClick={() => navigate(ROUTES.SERVICES)}
              className="mt-6 text-primary text-base font-semibold flex cursor-pointer"
            >
              {t("home.readMore")}{" "}
              {lang === "ar" ? (
                <FiChevronLeft className="text-[20px] ml-4 mt-[2px]" />
              ) : (
                <FiChevronRight className="text-[20px] ml-4 mt-[3px]" />
              )}
            </span>
          </div>
        </>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default Services;
