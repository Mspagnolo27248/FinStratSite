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
      <Link href="/">
      <div className={styles[`navbar-logo`]}>
          <BsFillBarChartFill /> Finstrat Trader
        </div>
      </Link>
        
        <div className={styles["navbar-links"]}>
          <ul>
            <li>Dashboard</li>          
            <li className={styles["dropdown"]}>
            Markets
            <div className={styles["dropdown-content"]}>
                <Link href="/Markets">Indexes</Link>
                <Link href="/Markets/Search">Search</Link>
                <Link href="/Markets/History">Stock History</Link>
                <Link href="/Markets/Backtest">Backtest</Link>
                <Link href="/Markets/OptionsPrice">Options Price</Link>
              </div>
            </li>
            <li className={styles["dropdown"]}>
              Economy
              <div className={styles["dropdown-content"]}>
                <Link href="/Economy/FREDSeries">FRED API</Link>
                <Link href="/Economy/Series">Series</Link>
                <Link href="/Economy/Employment">Employment</Link>
                <Link href="/Economy/GDP">GDP</Link>
                <Link href="/Economy/InterestRates">Interest Rates</Link>
                <Link href="/Economy/Inflation">Inflation</Link>
              </div>
            </li>
            <li className={styles["dropdown"]}>
              Finance
              <div className={styles["dropdown-content"]}>
                <Link href="/Academy">Overview</Link>
                <Link href="/Academy/FutureValue">Future Value</Link>
                <Link href="/Academy/PresentValue">Present Value</Link>
                <Link href="/Academy/FVAnnuityPmt">Annuity Payments</Link>
                <Link href="/Academy/LoanPmt">Loan Payments</Link>
          
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
         <Link href={"/"}><BsFillBarChartFill /> Finstrat Trader{" "}</Link> 
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
                  <div>Indexes</div>
                </Link>
                <Link href="/Markets/Search" onClick={marketClickHandler}>
                  <div>Search</div>
                </Link>
                <Link href="/Markets/History" onClick={marketClickHandler}>
                  <div>Stock History</div>
                </Link>
                <Link href="/Markets/Backtest" onClick={marketClickHandler}>
                  <div>Backtest</div>
                </Link>
                <Link href="/Markets/OptionsPrice" onClick={marketClickHandler}>
                  <div>Options Price</div>
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
                  <div>Overview</div>
                </Link>
                <Link href="/Economy/FREDSeries" onClick={economyClickHandler}>
                  <div>Series Search</div>
                </Link>
                <Link href="/Economy/Series" onClick={economyClickHandler}>
                  <div>Latest Releases</div>
                </Link>
                <Link href="/Economy/Employment" onClick={economyClickHandler}>
                  <div>Employment Data</div>
                </Link>
                <Link href="/Economy/GDP" onClick={economyClickHandler}>
                  <div>GDP Data</div>
                </Link>
                <Link href="/Economy/Inflation" onClick={economyClickHandler}>
               <div>Inflation Data</div>
                </Link>
                <Link
                  href="/Economy/InterestRates"
                  onClick={economyClickHandler}
                >
                 <div>Interest Rates Data</div>
                </Link>
              </div>
            )}
          </li>
          <li>
            <div onClick={academyClickHandler} className={styles["page-link"]}>
              Finance <SlArrowDown />
            </div>
            {academyIsOpen && (
              <div className={styles["sidebar-dropdown__content"]}>
                <Link href="/Academy/FutureValue" onClick={academyClickHandler}>
                 <div>Future Value</div> 
                </Link>
                <Link href="/Academy/PresentValue" onClick={academyClickHandler}>
                  <div>Present Value</div>
                </Link>
                <Link href="/Academy/LoanPmt" onClick={academyClickHandler}>
                 <div>Loan Payment</div>
                </Link>
                <Link href="/Academy/FVAnnuityPmt" onClick={academyClickHandler}>
                  <div>FV Annuity Pmt</div>
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
