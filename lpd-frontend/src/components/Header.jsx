import React from 'react'
import "./Header.css"

function Header() {
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-custom-blue py-1 text-neutral-500 hover:text-neutral-700 focus:text-neutral-600 lg:py-3 fixed top-0 w-full">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div>
            <a href='/'>
            <button className="font-bold text-2xl tracking-wider text-white">
              Project
            </button>
            </a>
          </div>
          <div>
            <span className="font-bold text-2xl tracking-wider text-white">
              Maya
            </span>
          </div>
        </div>
      </nav>
      <div class="header">
        <div>
          <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g class="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="#2cc4ff95"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="#2cc4ff85"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="#2cc4ff75"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="7"
                fill="#2cc4ff70"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export default Header