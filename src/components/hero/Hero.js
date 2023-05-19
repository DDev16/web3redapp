import React, { useState, useEffect } from 'react';
import '../hero/Hero.css';


const Hero = ({ className }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    'Smart Contracts',
    'Blockchain',
    'Security',
    'Transferability',
    'Decentralization',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change the word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen min-h-screen bg-fixed bg-cover -z-10 bg-opacity-80 custom-bg ${className}`}
      style={{ height: '100vh', width: '100%', backgroundImage: `url(/d.jpg)`, backgroundSize: 'cover' }}
    >
      <div className='my-auto'>
        <h1 className='text-5xl font-black tracking-tight text-center text-white sm:text-6xl md:max-w-lg lg:text-7xl leading-90p text-effect'>
          Revolutionizing Real Estate With <br />
          <em className="highlight">{words[wordIndex]}</em>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
