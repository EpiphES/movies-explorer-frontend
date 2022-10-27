import './Promo.css';

import PromoImage from '../../images/promo.png';

function Promo() {
  return (
    <section className='promo'>    
      <div className='promo__text'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href='#about' className='promo__link'>Узнать больше</a>
      </div>
      <img className='promo__image' src={PromoImage} alt='планета Земля' />      
    </section>
  );
}

export default Promo;
