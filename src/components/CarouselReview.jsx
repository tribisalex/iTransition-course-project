import React from 'react';
import Batman from '../assets/img/reviews/betmen.png'
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from 'mdb-react-ui-kit';

const CarouselReview = () => {
 return (
    <MDBCarousel showControls>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src={Batman} alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={Batman} alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={Batman} alt='...' />
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
};

export default CarouselReview;