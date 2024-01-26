import React from "react";
import "../static/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";
// import Marquee from "../static/Marquee";

function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header>
          <Header />
        </header>

        {/* Main Content */}
        <main className="flex-grow bg-gradient-to-r from-purple-700 to-blue-800 flex flex-col items-start justify-start">
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

            <div className="Login">
              <button id="demoButton">
                <div class="popup-container">
                  <label class="popup-button" for="login-popup">
                    Login
                  </label>
                  <input type="checkbox" id="login-popup" />
                  <div class="popup">
                    <label for="login-popup" class="transparent-label"></label>
                    <div class="popup-inner">
                      <div class="popup-title">
                        <h6>Login</h6>
                        <label for="login-popup" class="popup-close-btn">
                          Close
                        </label>
                      </div>
                      <div class="popup-content">
                        <form action="">
                          <ul>
                            <li>
                              <input type="text" placeholder="Username" />
                            </li>
                            <li>
                              <input type="password" placeholder="Password" />
                            </li>
                            <li>
                              <button type="submit">Log in</button>
                            </li>
                          </ul>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Home;
