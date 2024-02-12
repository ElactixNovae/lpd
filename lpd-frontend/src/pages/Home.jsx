import React from "react";
import "../static/Home.css";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";

function Home() {
  const [buttonPopup, setbuttonPopup] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-screen z-10">
        <Header />
      </header>
      <div
        id="home"
        className={'flex flex-nowrap flex-col min-h-screen bg-[linear-gradient(to_right_bottom,rgba(0,142,198,0.9),rgba(32,151,172,0)),url(https://cdn.pixabay.com/photo/2018/08/18/06/05/license-plates-3614254_1280.jpg)] bg-cover ease-in-out' +(buttonPopup ? " transition delay-100 ease-in-out blur-sm" : "") }
      >
        {/* Main Content */}
        <main className=" grid mt-16 flex-col items-start justify-start">
          <div className="text-white text-center mb-8 mt-36 ml-4">
            <h1 className="text-5xl font-bold">License Plate Detection</h1>
          </div>

          <div className="text-white ml-4">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc ml-4 mb-8">
              <li>Accurate license plate detection</li>
              <li>Real-time processing capabilities</li>
              <li>Easy integration into existing systems</li>
            </ul>
          </div>
          {/* <Login trigger={buttonPopup}/> */}
        </main>
        <div>
          <button className="bg-custom-blue1 ml-4 hover:bg-white hover:text-custom-blue1 text-white font-bold py-2 px-4 border border-cyan-600 rounded" onClick={() => setbuttonPopup(true)}>Login</button>
        </div>
      </div>
      <div
        style={{
          // position: "absolute",
          // left: "50%",
          // top: "50%",
          // transform: "translate(-50%, -25%)",
        }}
      >
        <Login trigger={buttonPopup} setTrigger={setbuttonPopup} />
      </div>
      {/* Footer */}
      <footer className=" fixed bottom-0 w-screen">
        <Footer />
      </footer>
    </>
  );
}

export default Home;
