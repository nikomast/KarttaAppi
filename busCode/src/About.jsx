/* eslint-disable react/no-unescaped-entities */
import "./About.css"
import sakuKuva from "./assets/SakuKuva.jpg"
import nikoKuva from "./assets/Donkey.jpg"
import ilonaKuva from "./assets/Kissa.jpg"

function AboutPage() {
  return (
    <>
   <p className="aboutText">
    Discover the Ultimate Bus Route App for Easy Commuting
    <br></br>
    Are you tired of waiting for buses, unsure of their routes, or struggling to plan your journey efficiently? Say goodbye to transportation hassles with Transit Odyssey – your go-to solution for seamless bus commuting. Say hello to stress-free travel and goodbye to transportation worries – with Transit Odyssey, your journey starts here.
    <br></br>
    <br></br>
    Effortless Journey Planning
    <br></br>
    With Transit Odyssey, planning your bus journey has never been easier. Simply enter your starting point and destination, and let our route planner do the rest. With Transit Odyssey, you can find the exact route and arrival time of your bus. No more guesswork – know precisely when your bus should arrive and plan your journey accordingly.
    <br></br>
    <br></br>
    User-Friendly Interface
    <br></br>
    Our user-friendly interface makes navigating Transit Odyssey a breeze. Whether you're a seasoned commuter or new to bus travel, our intuitive app design ensures a seamless and hassle-free experience for all users.
    <br></br>
    <br></br>
    Save Time and Reduce Stress
    <br></br>
    Simplify your daily commute and take the stress out of bus travel with Transit Odyssey. Save time, reduce uncertainty, and enjoy a smoother journey with our comprehensive bus route app.    
    <br></br>
    <br></br>
    Our Mission
    <br></br>
    At Transit Odyssey, we're on a mission to revolutionize the way people commute by bus. Our goal is to provide users with a seamless, reliable, and stress-free bus travel experience through innovative technology and user-centric design.
    <br></br>
    <br></br>
    Have questions or need assistance? Our dedicated customer support team is here to help. Reach out to us anytime, and we'll go above and beyond to ensure your journey with Transit Odyssey is nothing short of extraordinary. 
    Thank you for choosing Transit Odyssey. Let's embark on this odyssey together – the journey of a lifetime awaits!     
    </p>

    <div className="grid-container">
      <div>
      <h2>Saku Lahnaviik</h2>
      <p><img alt="sakuKuva" src={sakuKuva} height={200} width={180}></img></p>
      <p>Project owner and backend developer</p>
      </div>
      <div>
      <h2>Jani Gröhn</h2>
      <p>SCRUM Master and Front-end developer </p>
      </div>
      <div>
      <h2>Ilona Ehtamo</h2>  
      <p><img alt="ilonaKuva" src={ilonaKuva} height={250} width={200}></img></p>
      <p>Front-end developer</p>
      </div>  
      <div>
      <h2>Niko Mast</h2>
      <p><img alt="nikoKuva" src={nikoKuva} height={250} width={200}></img></p>
      <p>Back-end developer</p>
      </div>
    </div>
    </>
  )
}

export default AboutPage