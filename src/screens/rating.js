const rating = ({ rating }) => {
  function star1() {
    if (rating > 0 && rating < 1 ) {
        return <i className="fa-solid fa-star-half-stroke"> </i>;
      } else if (rating >= 1 ) {
        return <i className="fa-solid fa-star"> </i>;
      }
      else{
          return <i className="fa-regular fa-star" >  </i>
      }
  }
  function star2() {
    if (rating > 1 && rating <2) {
        return <i className="fa-solid fa-star-half-stroke"> </i>;
      } else if (rating >= 2 ) {
        return <i className="fa-solid fa-star"> </i>;
      }
      else{
          return <i className="fa-regular fa-star" >  </i>
      }
  }function star3() {
    if (rating > 2 && rating <3) {
        return <i className="fa-solid fa-star-half-stroke"> </i>;
      } else if (rating >= 3 ) {
        return <i className="fa-solid fa-star"> </i>;
      }
      else{
          return <i className="fa-regular fa-star" >  </i>
      }
  }function star4() {
    if (rating > 3 && rating <4) {
      return <i className="fa-solid fa-star-half-stroke"> </i>;
    } else if (rating >= 4 ) {
      return <i className="fa-solid fa-star"> </i>;
    }
    else{
        return <i className="fa-regular fa-star" >  </i>
    }
  }
  function star5() {
    if (rating > 4 && rating <5) {
      return <i className="fa-solid fa-star-half-stroke"> </i>;
    } else if (rating >= 5 ) {
      return <i className="fa-solid fa-star"> </i>;
    }
    else{
        return <i className="fa-regular fa-star" >  </i>
    }
  }

  return (
    <div>
      <span> {star1()} </span>
      <span> {star2()} </span>
      <span> {star3()} </span>
      <span> {star4()} </span>
      <span> {star5()} </span>
    </div>
  );
};

export default rating;
