import { useState, useEffect } from 'react';
import './Index.scss';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Home() {
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
    }, 1000); // Change the word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='hm-pg'>
      <div className='my-auto fade-in'>
        <h1 className='real-estate-heading text-5xl font-black tracking-tight text-center text-white sm:text-6xl md:max-w-lg lg:text-7xl leading-90p text-effect'>
          Revolutionizing Real Estate With <br />
          <em className="highlight">{words[wordIndex]}</em>
        </h1>
      </div>
      <Link to="/" className="navbar-brand logo-container1 fade-in">
        <img src={logo} alt="Logo" className="navbar-logo1" />
      </Link>
    </div>
  );
}

export default Home;
