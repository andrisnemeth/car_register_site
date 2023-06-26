import '../styles/Footer.css';
import { useMediaQuery } from "react-responsive";
import ecarlogo from '../assets/e-car-logo.jpeg'

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
               <li>Create account</li>
               <li>Sign in</li>
               <li>iOS app</li>
               <li>Android app</li>
             </ul>
             </nav>
             <nav className="navCol">
             <p className='footerHeader'>Company</p>
             <ul className="footerNav">
               <li>About us</li>
               <li>Careers</li>
             </ul>
             </nav>
             <nav className="navCol">
             <p className='footerHeader'>Resources</p>
             <ul className="footerNav">
               <li>FAQ</li>
               <li>Privacy & terms</li>
               <li>Help Center</li>
               <li>Notice about cookie management</li>
             </ul>
             </nav>
         </div>
       </footer>)}
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
              <li>Create account</li>
              <li>Sign in</li>
              <li>iOS app</li>
              <li>Android app</li>
            </ul>
            </nav>
            <nav className="navCol">
            <p className='footerHeader'>Company</p>
            <ul className="footerNav">
              <li>Rólunk</li>
              <li>Karrier</li>
            </ul>
            </nav>
            <nav className="navCol">
            <p className='footerHeader'>Resources</p>
            <ul className="footerNav">
              <li>GY.I.K.</li>
              <li>Privacy & terms</li>
              <li>Sugóközpont</li>
              <li>Cookiek</li>
            </ul>
            </nav>
        </div>
      </footer>)}
    </>
  )
}

export default Footer;