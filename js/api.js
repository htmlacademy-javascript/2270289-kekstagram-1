const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const URL_GET_DATA = `${BASE_URL}${Route.GET_DATA}`;
const URL_SEND_DATA = `${BASE_URL}${Route.SEND_DATA}`;

function getData () {
  return fetch(URL_GET_DATA)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error();
    });
}

function sendData(body) {
  return fetch(URL_SEND_DATA,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
}

export {getData, sendData};
