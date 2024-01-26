import React from "react";

function Marquee() {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="py-6 animate-marquee whitespace-nowrap">
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
      </div>

      <div className="absolute top-0 py-6 animate-marquee2 whitespace-nowrap">
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
        <span className="text-4xl mx-4">STUDY ROOM</span>
      </div>
    </div>
  );
}

export default Marquee;
