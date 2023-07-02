import "../styles/About.css";
import aboutUsPicture from "../assets/hero_img.png";
import aboutUsPictureMobile from "../assets/hero_img_mobile.png";
import { useMediaQuery } from "react-responsive";

function AboutUs() {
  const isDesktop = useMediaQuery({ query: "(min-width: 481px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className="aboutus_container">
      <div className="aboutus_header">
        <h2>
          Üdvözöljük <br />
          az E-Car weboldalán!
        </h2>
      </div>
      <div className="aboutus_content">
        <p>
          Az <strong>E-Car </strong> egy olyan weboldal, amely lehetővé teszi,
          hogy regisztráljon, bejelentkezzen, hozzáadja kedvenc autóit és
          feltöltsön képeket hozzájuk.
        </p>
        <p>
          Célunk, hogy egy modern és egyszerűen használható platformot
          biztosítsunk, ahol autókedvelők könnyedén regisztrálhatnak és
          kezelhetik az autóik adatait.
        </p>
        <p>Főbb funkcióink közé tartozik:</p>
        <ul className="aboutus_content_list_ul">
          <li className="aboutus_content_list_li">
            Regisztráció és bejelentkezés
          </li>
          <p className="aboutus_content_list_p">
            Az E-Car lehetővé teszi, hogy létrehozzon egy személyes fiókot,
            regisztráljon egyedi felhasználónévvel és jelszóval. Bejelentkezés
            után hozzáférhet az összes funkcióhoz és szolgáltatáshoz.
          </p>
          <li className="aboutus_content_list_li">Autók hozzáadása</li>
          <p className="aboutus_content_list_p">
            Miért ne tárolná autói adatait egy helyen? Az oldalon egyszerűen
            hozzáadhatja autóit, beleértve a márka, modell, évjárat és egyéb
            fontos információkat. Ezzel lehetősége van könnyedén nyomon követni
            az autók adatait és karbantartási időpontokat.
          </p>
          <li className="aboutus_content_list_li">Képek feltöltése</li>
          <p className="aboutus_content_list_p">
            Minden autóhoz képeket is feltölthet, hogy személyre szabottabbá
            tegye a profilját. Legyen az a kedvenc autójának fényképe vagy éppen
            egy látványos kép az autóról, amit szeretne megosztani másokkal,
            nálunk lehetősége van képek feltöltésére és megosztására.
          </p>
          <li className="aboutus_content_list_li">Közösség és megosztás</li>
          <p className="aboutus_content_list_p">
            Az E-Car-t nemcsak autók nyilvántartására használhatja, hanem a
            közösségünk részévé is válhat. Láthatja más felhasználók autóit,
            értékelheti és megoszthatja azokat. Kaphat inspirációt mások
            autóival kapcsolatban, és elindíthat autós témájú beszélgetéseket.
            Az oldalunk folyamatosan fejlődik és igyekszünk új funkciókkal és
            lehetőségekkel bővíteni, hogy minél jobb felhasználói élményt
            nyújtsunk Önnek.
          </p>
        </ul>

        <p>
          Ha bármilyen kérdése van, vagy segítségre van szüksége, vegye fel
          velünk a kapcsolatot az elérhetőségeinken. Köszönjük, hogy velünk
          tart, és reméljük, hogy élvezetes és hasznos időt tölt el az
          oldalunkon!
        </p>
        <div className="aboutus_img_wrapper">
          {isMobile && (
            <img
              src={aboutUsPictureMobile}
              alt="car"
              style={{ maxWidth: "100%", transform: "scaleX(-1)" }}
              className="aboutus_img"
            />
          )}

          {isDesktop && (
            <img
              src={aboutUsPicture}
              alt="car"
              style={{ transform: "scaleX(-1)" }}
              className="aboutus_img"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
