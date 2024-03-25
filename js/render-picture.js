import {openBigPicture} from './render-big-picture.js';

let isEventExist = false; // Для определения, повешено ли уже событие

const renderPictureUsers = (pictureList) => {

  const picturesUserContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureUserTemplate = pictureTemplate.querySelector('.picture');
  const pictureUserFragment = document.createDocumentFragment();

  pictureList.forEach(({url,likes,comments,id}) => {
    const userPicture = pictureUserTemplate.cloneNode(true);
    const userPictureImage = userPicture.querySelector('.picture__img');
    userPictureImage.src = url;
    userPictureImage.setAttribute('data-id-picture-list',id); // Добавим атрибут для связи с идентификатором списка пользователей
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureUserFragment.appendChild(userPicture);
  }
  );

  const onClickPicture = (evt) => {
    if (evt.target.matches('.picture__img')) {
      const idUser = evt.target.getAttribute('data-id-picture-list');
      const indexList = pictureList.findIndex((picture) => +picture.id === +idUser);
      openBigPicture(pictureList[indexList]);
    }
  };

  picturesUserContainer.appendChild(pictureUserFragment);

  // При переключении фильтра фотографий, происходит добавление обработчика по клику на секцию фотографий.
  // Проверим, есть ли обработчик, и если есть, то просто не добавляем его
  if (!isEventExist) {
    picturesUserContainer.addEventListener('click',onClickPicture); // добавим обработку по клику на секцию фотографий
    isEventExist = true;
  }

};

export {renderPictureUsers};
