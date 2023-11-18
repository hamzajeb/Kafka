import background from '../Assets/images/background1.jpg'
import img1 from '../Assets/images/1.png'
import img2 from '../Assets/images/2.png'
import img3 from '../Assets/images/3.png'
import img4 from '../Assets/images/4.png'
import img5 from '../Assets/images/5.png'
import anime from 'animejs';
import React, { useEffect } from 'react';
function Main() {
    useEffect(() => {
        // Animation for loop
      
    
        // Add more animations as needed
    
        return () => {
          // Clean up the animations if needed
        };
      }, []); 
  return (
    <>
    <div className="Main" >
        <img src={background} className='background' alt='Search Illustration' />
        {/* <div className='child'></div> */}
    </div>
    <div className='child'>
    <ul className='ul'>
  <li className='li'>
    <img src={img1} alt="img1" style={{width:"10vh",height:"10vh"}}/>
    <p
          className='title'
          >
            Customer <span style={{color:"#1976d2"}}>2921</span>
          </p>
  </li>
  <li className='li'>
  <img src={img2} alt="img1" style={{width:"10vh",height:"10vh"}}/>
    <p
          className='title'
          >
            Customer <span style={{color:"#1976d2"}}>1005</span>
          </p>
  </li>
  <li className='li'>
  <img src={img3} alt="img1" style={{width:"10vh",height:"10vh"}}/>
    <p
          className='title'
          >
            Customer <span style={{color:"#1976d2"}}>0321</span>
          </p>
  </li>
  <li className='li'>    <img src={img4} alt="img1" style={{width:"10vh",height:"10vh"}}/>
    <p
          className='title'
          >
            Customer <span style={{color:"#1976d2"}}>5121</span>
          </p></li>
  <li className='li'>    <img src={img5} alt="img1" style={{width:"10vh",height:"10vh"}}/>
    <p
          className='title'
          >
            Customer <span style={{color:"#1976d2"}}>1021</span>
          </p></li>
  <li className='li'>
  <img src={img1} alt="img1" style={{width:"10vh",height:"10vh"}}/>
    <p
          className='title'
          >
            Customer <span style={{color:"#1976d2"}}>4001</span>
          </p>
  </li>
</ul>
    </div>

          </>
  );
}

export default Main;
