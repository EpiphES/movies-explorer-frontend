import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p className='footer__heading'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__contain'>
        <p className='footer__copyright'>© { year }</p>
        <ul className='footer__links'>
          <li>
            <a 
              className='footer__link'
              href='https://practicum.yandex.ru' 
              rel='noreferrer' 
              target='_blank'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a 
              className='footer__link' 
              href='https://github.com' 
              rel='noreferrer' 
              target='_blank'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer> 
  );
}

export default Footer;
