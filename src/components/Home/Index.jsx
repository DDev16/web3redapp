import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import './Index.scss';
import '../hero/Hero.css';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import Search from '../Home/Searchbar2.js';
import { useMediaQuery } from '@mui/material';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';



function Home() {
  const showUP780 = useMediaQuery('(min-Width: 780px)');
  const showDown780px = useMediaQuery('(max-width: 780px)');

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
      <div className='my-auto'>
        <h1 className='real-estate-heading text-5xl font-black tracking-tight text-center text-white sm:text-6xl md:max-w-lg lg:text-7xl leading-90p text-effect'>
          Revolutionizing Real Estate With <br />
          <em className="highlight">{words[wordIndex]}</em>
        </h1>
      </div>
      <Link to="/" className="navbar-brand logo-container1">
    <span className="navbar-title">Web3 Realty</span>
    <img src={logo} alt="Logo" className="navbar-logo1" />
</Link>
<Search showUP780={showUP780} showDown780px={showDown780px}  margin= '50px 10px 10px auto'  />

      <Container
        sx={{
          margin: '50px 10px 10px auto',
        }}>


      </Container>
    </div>
  )
}

export default Home;
