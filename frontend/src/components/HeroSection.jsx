import "../styles/HeroSection.css";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import heroPicture from "../assets/hero_img.png";
import heroPictureMobile from "../assets/hero_img_mobile.png";
import TextTransition, { presets } from "react-text-transition";
import { useMediaQuery } from "react-responsive";

const texts = ["legmodernebb", "legjobb", "legmenőbb"];

function HeroSection() {
  const isDesktop = useMediaQuery({ query: "(min-width: 481px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 2 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <>
      <div className="hero_content">
        <div className="hero_img_wrapper">
          <div className="hero_img">
            {isMobile && (
              <img
                src={heroPictureMobile}
                alt="car"
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
          {isDesktop && (
            <img src={heroPicture} alt="car" style={{ maxWidth: "100%" }} />
          )}
          <div className="text_on_hero">
            <h1 id="text_on_hero_main">
              Legyél TE a
              <TextTransition springConfig={presets.stiff}>
                {texts[index % texts.length]}
              </TextTransition>
              autós!
            </h1>
            <h4>Regisztrálj vagy ha már van fiókod, jelentkezz be!</h4>
          </div>
        </div>
        <div className="hero_registration">
          <p>Regisztráció</p>
          <Button auto rounded>Regisztráció</Button>
        </div>
        <div className="hero_login">
          <p>Bejelentkezés</p>
          <Button auto rounded style={{ marginBottom: "1rem" }}>
            Bejelentkezés adminként
          </Button>
          <Button auto rounded>Bejelentkezés felhasználóként</Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;