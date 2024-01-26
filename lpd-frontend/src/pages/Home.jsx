import React from 'react'
import '../static/Home.css'

function Home() {
  return (<>
   <header>
        <div class="container">
            <h1>License Plate Detection</h1>
        </div>
    </header>

    <section class="main-content">
        <div class="container">
            <h2>About the Project</h2>
            <p>
                Welcome to our License Plate Detection project homepage! This project utilizes advanced computer vision techniques to detect and recognize license plates in images and videos.
            </p>

            <h2>Key Features</h2>
            <ul>
                <li>Accurate license plate detection</li>
                <li>Real-time processing capabilities</li>
                <li>Easy integration into existing systems</li>
            </ul>

            <div class="demo">
                <h2>Demo</h2>
                <p>Click the button below to see a live demo:</p>
                <button id="demoButton">Launch Demo</button>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            &copy; 2024 License Plate Detection Project
        </div>
    </footer>

    <script src="script.js"></script>
  </>
  )
}

export default Home