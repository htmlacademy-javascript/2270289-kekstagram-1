import {getPublicationsEnrollment_old} from './data.js';
import {openBigPicture} from './render-big-picture.js';

const pictureList = getPublicationsEnrollment_old();

function renderingPictureUsers_old() {

  const picturesUserContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureUserTemplate = pictureTemplate.querySelector('.picture');
  const pictureUserFragment = document.createDocumentFragment();

  pictureList.forEach(({url,likes,comments,id}) => {
    const userPicture = pictureUserTemplate.cloneNode(true);
    const userPictureImage = userPicture.querySelector('.picture__img');
    userPictureImage.src = url;
    userPictureImage.setAttribute('data-id-picturelist',id); // Добавим атрибут для связи с идентификатором списка пользователей
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureUserFragment.appendChild(userPicture);
  }
  );

  const onClickPicture = function (evt) {
    if (evt.target.matches('.picture__img')) {
      const idUser = evt.target.getAttribute('data-id-picturelist');
      const indexList = pictureList.findIndex((picture) => +picture.id === +idUser);
      openBigPicture(pictureList[indexList]);
    }
  };

  picturesUserContainer.appendChild(pictureUserFragment);
  picturesUserContainer.addEventListener('click',onClickPicture); // добавим обработку по клику на секцию фотографий

}

function renderingPictureUsers(miniatures) {

  const picturesUserContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureUserTemplate = pictureTemplate.querySelector('.picture');
  const pictureUserFragment = document.createDocumentFragment();

  miniatures.forEach(({id, url, description, likes, comments}) => {
    const userPicture = pictureUserTemplate.cloneNode(true);
    const userPictureImage = userPicture.querySelector('.picture__img');
    userPictureImage.src = url;
    userPictureImage.setAttribute('data-id-picturelist',id); // Добавим атрибут для связи с идентификатором списка пользователей
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureUserFragment.appendChild(userPicture);
  }
  );

  const onClickPicture = function (evt) {
    if (evt.target.matches('.picture__img')) {
      const idUser = evt.target.getAttribute('data-id-picturelist');
      const indexList = pictureList.findIndex((picture) => +picture.id === +idUser);
      openBigPicture(pictureList[indexList]);
    }
  };

  picturesUserContainer.appendChild(pictureUserFragment);
  picturesUserContainer.addEventListener('click',onClickPicture); // добавим обработку по клику на секцию фотографий

}

export {renderingPictureUsers};
