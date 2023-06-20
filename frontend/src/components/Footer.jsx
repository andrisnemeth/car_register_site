import '../styles/Footer.css';
import { useMediaQuery } from "react-responsive";
import ecarlogo from '../assets/e-car-logo.jpeg'

function Footer() {
  const year = new Date().getFullYear();
  const isDesktop = useMediaQuery({ query: "(min-width: 481px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
      <>
        {isDesktop && (
      <footer className="footer">
        <div className="containerGridForFooter">
          <div className="logoColumn">
          <a href="/"><img src={ecarlogo} alt="logo" style={{ width: '100px', height: 'auto' }} className="footerLogo" /></a>
            <p className='copyright'>Copyright ©  {year} by Andras Nemeth. <br/>All rights reserved.</p>
          </div>
          <div className="addressColumn">
            <p className='footerHeader'> Contact us</p>
            <address className='contacts'>
              <p>1000 Budapest, <br/>Nulla Street 0.<br/> Ground Floor
              </p>
              <p>0630 123 4567</p>
              <p>peldaemail@pelda.com</p>
            </address>  
            </div>
          <nav className="navCol">
            <p className='footerHeader'>Account</p>
            <ul className="footerNav">
              <li><a className="footerLink" href="">Create account</a></li>
              <li><a className="footerLink" href="">Sign in</a></li>
              <li><a className="footerLink" href="">iOS app</a></li>
              <li><a className="footerLink" href="">Android app</a></li>
            </ul>
            </nav>
            <nav className="navCol">
            <p className='footerHeader'>Company</p>
            <ul className="footerNav">
              <li><a className="footerLink" href="">About us</a></li>
              <li><a className="footerLink" href="">Careers</a></li>
            </ul>
            </nav>
            <nav className="navCol">
            <p className='footerHeader'>Resources</p>
            <ul className="footerNav">
              <li><a className="footerLink" href="">FAQ</a></li>
              <li><a className="footerLink" href="">Privacy & terms</a></li>
              <li><a className="footerLink" href="">Help Center</a></li>
              <li><a className="footerLink" href="">Notice about cookie management</a></li>
            </ul>
            </nav>
        </div>
      </footer>)}
      {isMobile && (
         <footer className="footer">
         <div className="containerGridForFooter_mobile">
           <div className="addressColumn">
             <p className='footerHeader'> Contact us</p>
             <address className='contacts'>
             <p>1000 Budapest, <br/>Nulla Street 0.<br/> Ground Floor
              </p>
               <p>0630 123 4567</p>
               <p>peldaemail@pelda.com</p>
             </address>  
             </div>
           <nav className="navCol">
             <p className='footerHeader'>Account</p>
             <ul className="footerNav">
               <li><a className="footerLink" href="">Create account</a></li>
               <li><a className="footerLink" href="">Sign in</a></li>
               <li><a className="footerLink" href="">iOS app</a></li>
               <li><a className="footerLink" href="">Android app</a></li>
             </ul>
             </nav>
             <nav className="navCol">
             <p className='footerHeader'>Company</p>
             <ul className="footerNav">
               <li><a className="footerLink" href="">About us</a></li>
               <li><a className="footerLink" href="">Careers</a></li>
             </ul>
             </nav>
             <nav className="navCol">
             <p className='footerHeader'>Resources</p>
             <ul className="footerNav">
               <li><a className="footerLink" href="">FAQ</a></li>
               <li><a className="footerLink" href="">Privacy & terms</a></li>
               <li><a className="footerLink" href="">Help Center</a></li>
               <li><a className="footerLink" href="">Notice about cookie management</a></li>
             </ul>
             </nav>
         </div>
       </footer>)}
    </>
  )
}

export default Footer;