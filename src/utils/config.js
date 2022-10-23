const MAIN_API_URL = 'https://api.kinomania.nomoredomains.icu';
const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const HEADERS =  { 
  "Content-Type": "application/json", 
};
const SHORT_DURATION = 40;
const MEDIUM_SCREEN_SIZE = 1024;
const SMALL_SCREEN_SIZE = 480;
const CARDS_PER_PAGE_LARGE = 12;
const CARDS_PER_PAGE_MEDIUM = 8;
const CARDS_PER_PAGE_SMALL = 5;
const CARDS_ADD_LARGE = 3;
const CARDS_ADD_MEDIUM = 2;

const URL_REGEX = /^http(s)?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-z]{1,6}\b[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/;

export {
  MAIN_API_URL,
  MOVIES_API_URL,
  HEADERS,
  SHORT_DURATION,
  MEDIUM_SCREEN_SIZE,
  SMALL_SCREEN_SIZE,
  CARDS_PER_PAGE_LARGE,
  CARDS_PER_PAGE_MEDIUM,
  CARDS_PER_PAGE_SMALL,
  CARDS_ADD_LARGE,
  CARDS_ADD_MEDIUM,
  URL_REGEX,
}
