import React from "react";

const ServerError = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 m-auto text-center">
        <img className="object-cover w-56 mx-auto h-44" alt="error" loading="lazy" src="https://i.imgur.com/qIufhof.png" />

        <h1 className="mt-5 text-4xl text-center">
          <span className="text-6xl">500</span> <br />
          Internal server error
        </h1>
        <p className="mt-3">We are currently trying to fix the problem.</p>
      </div>
    </section>
  );
};

export default ServerError;
