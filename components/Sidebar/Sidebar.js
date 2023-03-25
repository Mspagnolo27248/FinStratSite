import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { BsFillBarChartFill } from "react-icons/bs";
import { MdClear, MdArrowForwardIos, MdOutlineSearch } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { useRouter } from "next/router";
//<MdOutlineSearch size={20}  style={{ height:'21px', width:'21px'}}/>
export default function Sidebar(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [marketsIsOpen, setMarketsIsOpen] = useState(false);
  const marketClickHandler = () => {
    setMarketsIsOpen(!marketsIsOpen);
  };

  const [economyIsOpen, setEconomyIsOpen] = useState(false);
  const economyClickHandler = () => {
    setEconomyIsOpen(!economyIsOpen);
  };

  const [academyIsOpen, setAcademyIsOpen] = useState(false);
  const academyClickHandler = () => {
    setAcademyIsOpen(!academyIsOpen);
  };

  const logoUrl = props.logoUrl;
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setAcademyIsOpen(false);
      setEconomyIsOpen(false);
      setMarketsIsOpen(false);
      setIsOpen(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles[`navbar-logo`]}>
          <BsFillBarChartFill /> Finstrat Trader
        </div>
        <div className={styles["navbar-links"]}>
          <ul>
            <li>Home</li>
            <li>Academy</li>
            <li className={styles["dropdown"]}>
            Markets
            <div className={styles["dropdown-content"]}>
                <Link href="/Markets">Overview</Link>
                <Link href="/Markets/Search">Search</Link>
                <Link href="/Markets/History">History</Link>
               
              </div>
            </li>
            <li className={styles["dropdown"]}>
              Economy
              <div className={styles["dropdown-content"]}>
                <Link href="/Economy/FREDSeries">FRED API</Link>
                <Link href="/Economy/Employment">Employment</Link>
                <Link href="/Economy/GDP">GDP</Link>
                <Link href="/Economy/InterestRates">Interest Rates</Link>
                <Link href="/Economy/Inflation">Inflation</Link>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles["navbar-toggle"]} onClick={toggleHandler}>
          <span className={styles["line"]}></span>
          <span className={styles["line"]}></span>
          <span className={styles["line"]}></span>
        </div>
      </nav>
      <div className={styles['nav-content-spacer']}></div>
      <nav
        className={`${styles["nav-sidebar"]} ${isOpen ? styles["open"] : ""}`}
      >
        <div className={styles["sidebar-header"]}>
          <BsFillBarChartFill /> Finstrat Trader{" "}
        </div>
        <ul>
          <li>
            <Link href="#" className={styles["page-link"]}>
              Dashboard <SlArrowDown />
            </Link>
          </li>
          <li>
            <div onClick={marketClickHandler} className={styles["page-link"]}>
              Markets <SlArrowDown />
            </div>
            {marketsIsOpen && (
              <div className={styles["sidebar-dropdown__content"]}>
                <Link href="/Markets" onClick={marketClickHandler}>
                  Overview
                </Link>
                <Link href="/Markets/Search" onClick={marketClickHandler}>
                  <span>Search</span>{" "}
                </Link>
                <Link href="/Markets/History" onClick={marketClickHandler}>
                  History
                </Link>
              </div>
            )}
          </li>
          <li>
            <div onClick={economyClickHandler} className={styles["page-link"]}>
              Economy <SlArrowDown />
            </div>
            {economyIsOpen && (
              <div className={styles["sidebar-dropdown__content"]}>
                <Link href="/Economy" onClick={economyClickHandler}>
                  Overview
                </Link>
                <Link href="/Economy/FREDSeries" onClick={economyClickHandler}>
                  Series St. Louis FRED API
                </Link>
                <Link href="/Economy/Employment" onClick={economyClickHandler}>
                  Employment Data
                </Link>
                <Link href="/Economy/GDP" onClick={economyClickHandler}>
                  GDP Data
                </Link>
                <Link href="/Economy/Inflation" onClick={economyClickHandler}>
                  Inflation Data
                </Link>
                <Link
                  href="/Economy/InterestRates"
                  onClick={economyClickHandler}
                >
                  Interest Rates Data
                </Link>
              </div>
            )}
          </li>
          <li>
            <div onClick={academyClickHandler} className={styles["page-link"]}>
              Academy <SlArrowDown />
            </div>
            {academyIsOpen && (
              <div className={styles["sidebar-dropdown__content"]}>
                <Link href="/Academy" onClick={academyClickHandler}>
                  Future Value
                </Link>
                <Link href="/Academy/FREDSeries" onClick={academyClickHandler}>
                  Present Value
                </Link>
              </div>
            )}
          </li>
        </ul>
        <div className={styles["toggler"]} onClick={toggleHandler}>
          <MdClear
            size={30}
            className="pdf-icon"
            style={{ marginTop: ".8rem" }}
          />
        </div>
      </nav>
    </>
  );
}
