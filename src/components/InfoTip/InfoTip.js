import './InfoTip.css';

import checkedIcon from '../../images/check-circle.svg'
import failIcon from '../../images/x-circle.svg'

function InfoTip({ errorMessage, isInfotipOpen, onClose}) {
  return (
    <div className={`infotip ${isInfotipOpen && "infotip_opened"}`}>
      <div className='infotip__content'>
        <button
          className='infotip__close-button'
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        {
          errorMessage ? (
          <>
            <img className='infotip__icon' src={failIcon} alt={'ошибка'} />
            <h2 className='infotip__title infortip__title_type_fail'>{errorMessage}</h2>
          </>
          ) : (
            <>
            <img className='infotip__icon' src={checkedIcon} alt={'успешный запрос'} />
            <h2 className='infotip__title infortip__title_type_success'>Данные профиля успешно изменены!</h2>
          </>
          )
        }        
      </div>
    </div>
  );
}

export default InfoTip;