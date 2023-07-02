import { Navbar, Link} from "@nextui-org/react";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { removeToken } from "../helpers/auth";
import ecarlogo from "../assets/e-car-logo.jpeg";
import "../styles/Navbar.css";

function Navigationbar() {
  const { currentUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
  }

  const collapseItems = [
    { label: "Főoldal", link: "/" },
    { label: "Rólunk", link: "/about" },
    { label: "Autónyilvántartás", link: "/car-page" },
    { label: "Regisztráció", link: "/registration" },
    { label: "Bejelentkezés", link: "/login" },
    { label: "Bejelentkezés adminként", link: "/login-admin" },
    { label: "Admin", link: "/admin" },
    { label: "Kijelentkezés", link: "/", onClick: {handleLogout} },
  ];

  return (
    <>
      <Navbar isBordered variant="sticky" zindex={999}>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Link href="/">
            <img
              className="ecarlogo"
              src={ecarlogo}
              alt="website_logo"
              style={{ width: "100px", height: "auto" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="primary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          {isLoggedIn && (
            <>
              <Navbar.Link href="/">Főoldal</Navbar.Link>
              <Navbar.Link href="/about">Rólunk</Navbar.Link>
              <Navbar.Link href="/admin">Admin</Navbar.Link>
              <Navbar.Link href="/car-page">Autónyilvántartás</Navbar.Link>
              <Navbar.Link href="/" onClick={handleLogout}>
                Kijelentkezés
              </Navbar.Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Navbar.Link href="/">Főoldal</Navbar.Link>
              <Navbar.Link href="/about">Rólunk</Navbar.Link>
              <Navbar.Link href="/admin">Admin</Navbar.Link>
              <Navbar.Link href="/car-page">Autónyilvántartás</Navbar.Link>
              <Navbar.Link href="/registration">Regisztráció</Navbar.Link>
              <Navbar.Link href="/login">Bejelentkezés</Navbar.Link>
              <Navbar.Link href="/login-admin">
                Bejelentkezés adminként
              </Navbar.Link>
            </>
          )}
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={index}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={item.link}
              >
                {item.label}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navigationbar;
