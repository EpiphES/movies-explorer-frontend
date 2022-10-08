import './AboutMe.css';
 import Avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__heading'>Студент</h2>
      <div className='about-me__contain'>
        <div className='about-me__info'>          
          <h3 className='about-me__name'>Екатерина</h3>
          <p className='about-me__profession'>Фронтенд-разработчик, 37 лет</p>
          <p className='about-me__description'>
            Я родилась и живу в Екатеринбурге, закончила лечебный факультет УГМА. Люблю спорт, занимаюсь скалолазанием и плаванием. Более 10 лет проработала врачем-рентгенологом. Недавно начала кодить. После того, как прошла курс по веб-разработке, ушла с постоянной работы.
          </p>
          <a className='about-me__link' href='https://github.com/EpiphES' rel='noreferrer' target='_blank'>
            Github
          </a>    
        </div>
        <img src={Avatar} className='about-me__photo' alt='мое фото' />   
      </div>
    </section>
  );
}

export default AboutMe;
