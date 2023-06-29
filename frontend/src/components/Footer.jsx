import "../styles/Footer.css";
import { useMediaQuery } from "react-responsive";
import ecarlogo from "../assets/e-car-logo.jpeg";

function Footer() {
  const year = new Date().getFullYear();
  const isDesktop = useMediaQuery({ query: "(min-width: 481px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <>
      {isMobile && (
        <footer className="footer">
          <div className="containerGridForFooter_mobile">
            <div className="addressColumn">
              <p className="footerHeader"> Kapcsolat</p>
              <address className="contacts">
                <p>
                  1000 Budapest, <br />
                  Nulla utca 0.
                  <br /> Földszint
                </p>
                <p>0630 123 4567</p>
                <p>peldaemail@pelda.hu</p>
              </address>
            </div>
            <nav className="navCol">
              <p className="footerHeader">Fiók</p>
              <ul className="footerNav">
                <li>Regisztráció</li>
                <li>Bejelentkezés </li>
              </ul>
            </nav>
            <nav className="navCol">
              <p className="footerHeader">Cég</p>
              <ul className="footerNav">
                <li>Rólunk</li>
                <li>Karrier</li>
              </ul>
            </nav>
            <nav className="navCol">
              <p className="footerHeader">Jogi és egyéb anyagok</p>
              <ul className="footerNav">
                <li>GY.I.K.</li>
                <li>Adatvédelem</li>
                <li>Impresszum</li>
                <li>Cookie-k</li>
              </ul>
            </nav>
          </div>
        </footer>
      )}
      {isDesktop && (
        <footer className="footer">
          <div className="containerGridForFooter">
            <div className="logoColumn">
              <a href="/">
                <img
                  src={ecarlogo}
                  alt="logo"
                  style={{ width: "100px", height: "auto" }}
                  className="footerLogo"
                />
              </a>
              <p className="copyright">
                Copyright © {year} by Andras Nemeth. <br />
                Minden jog fenntartva.
              </p>
            </div>
            <div className="addressColumn">
              <p className="footerHeader"> Kapcsolat</p>
              <address className="contacts">
                <p>
                  1000 Budapest, <br />
                  Nulla utca 0.
                  <br /> Földszint
                </p>
                <p>0630 123 4567</p>
                <p>peldaemail@pelda.hu</p>
              </address>
            </div>
            <nav className="navCol">
              <p className="footerHeader">Fiók</p>
              <ul className="footerNav">
                <li>Regisztráció</li>
                <li>Bejelentkezés </li>
              </ul>
            </nav>
            <nav className="navCol">
              <p className="footerHeader">Cég</p>
              <ul className="footerNav">
                <li>Rólunk</li>
                <li>Karrier</li>
              </ul>
            </nav>
            <nav className="navCol">
              <p className="footerHeader">Jogi és egyéb anyagok</p>
              <ul className="footerNav">
                <li>GY.I.K.</li>
                <li>Adatvédelem</li>
                <li>Impresszum</li>
                <li>Cookie-k</li>
              </ul>
            </nav>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
