import "../styles/Home.css";
import HeroSection from "./HeroSection";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  // const notify = () => toast('🦄 Wow so easy!', {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   });

  const [data, setData] = useState("");

  // fetch(`http://localhost:8000/getWords`)
  // .then((response) => response.json())
  // .then((data) => setData(data))
  

  // async function fetchWords() {
  //   try{
  //   const response = await axios.get("http://localhost:8000/api");
  //   console.log(response);
  //   // console.log(error.response.data)
  //   return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    axios.get("http://localhost:8000/getWords").then(response => {
      console.log(response.data)
      setData(response.data);
    });
  }, []);

    // fetchWords().then((data) => {
    //   setData(data);
    // });
  // });

  return (
    <>
      <HeroSection />
      <p>{data}</p>
      {/* <button onClick={notify}>button</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </>
  );
}

export default Home;
