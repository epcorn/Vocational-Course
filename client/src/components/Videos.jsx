import React from "react";

function Videos() {
  return (
    <div className="flex items-center justify-center w-full h-full flex-wrap mt-10">
      <div className="flex justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/RKFA3aNFIXc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Videos;
