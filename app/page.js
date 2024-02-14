import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">NEXT GPT</h1>
          <p className="py-6 text-lg leading-loose">
            NEXTGPT: Your AI language companion. Powered by OpenAI, it enhances
            your conversations, content creation and more.....
          </p>
          <Link href="/chat" className="btn btn-secondary">
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
