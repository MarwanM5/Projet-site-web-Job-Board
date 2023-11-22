import React from 'react';
import '../Styles/Home.css';
const Home = () => {

  // Add carrousel with a last post.
    const style = {
        width: 297,
        height: 296,
    };
  
  // Auth context
  const token = localStorage.getItem("userToken");
  
    return (
        <div class = "header">

            <h2 className='page-title'>Project Jobboard</h2>
            {/* Add carrousel with a last post. */}
            <div
    style={{
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'left',

      background: '',
    }}
        >
    <figure class="stack">
      <div class="card-home one">
        <span className='card-title'>Your</span>
      </div>
      <div class="card-home two">
        <span className='card-title'>dream</span>
      </div>
      <div class="card-home three">
        <span className='card-title'>job</span>
      </div>
    </figure>
  </div>
        </div>
    );
}

export default Home;