import React from 'react';
import { Carousel } from 'react-carousel3';

const style = {
  width: 297,
  height: 296,
};
const Caroussel  =() =>{

  <div class="carousel"
    style={{
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #16235e 0%, #020223 100%)',
    }}
  >
    <Carousel height={460} width={980} yOrigin={42} yRadius={48} autoPlay={true}>
      <div key={1} style={style}>
        <img alt="apple logo" src= "https://imgs.search.brave.com/XS2LoWR9gsMlZrE3_6zCtt2loibJswARBBxlzVRtOfk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1MTYu/cG5n" height="100" width="100" />
      </div>
      <div key={2} style={style}>
        <img alt="google logo" src= "https://imgs.search.brave.com/SC6dbPCDxOX_PnvBnC_XKc9HEVy_v9lkaodJOgeOYHQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1MWYu/cG5n" height="100" width="250"/>
      </div>
      <div key={3} style={style}>
        <img alt="facebook logo" src= "https://imgs.search.brave.com/arLPabLWSWPIXIOhYm7j8t9V8opMLMUXtYxco7P3fbY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3Bhcy5ncmV6LWRv/aWNlYXUuYmUvZXBu/L2ltYWdlcy9sb2dv/LWZhY2Vib29rLnBu/Zy9AQGltYWdlcy9l/MDg5ZDcwZi01MWZl/LTRiYzMtOWZiNC01/MGFmNWQ1MWVmNjku/cG5n" height="100" width="100"/>
      </div>
      <div key={4} style={style}>
        <img alt="amazon logo" src= "https://imgs.search.brave.com/jAU9O-cLxon3IWhilaBoSjhJUA1TMo7iRlqHhiZkZ6s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1MTgu/cG5n" height="100" width="250"/>
      </div>
      <div key={5} style={style}>
        <img alt="riot logo" src= "https://imgs.search.brave.com/WYyPqMsAyUfDb0cnFSbJJvBCBmW0J5KrngxkpzenmZY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzEyL3Jpb3QtZ2Ft/ZXMtbG9nby5wbmc" height="100" width="250"/>
      </div>
    </Carousel>
  </div>
}

export default Carousel;