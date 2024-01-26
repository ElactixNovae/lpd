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
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-700 to-blue-800">
      {/* Header */}
      <header>
        <Header />
      </header>
        {/* Main Content */}
        <main className="flex-grow flex flex-col items-start justify-start">
          <div className="text-white text-center mb-8 mt-4 ml-4">
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

          <button onClick={() => setbuttonPopup(true)}>Popup</button>
          {/* <Login trigger={buttonPopup}/> */}
        </main>

        {/* Footer */}  
          <Login trigger={buttonPopup} setTrigger={setbuttonPopup} />
      <footer>
        <Footer />
      </footer>
      </div>
    </>
  );
}

export default Home;
