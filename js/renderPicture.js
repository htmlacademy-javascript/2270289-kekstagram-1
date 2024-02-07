import {getPublicationsEnrollment} from './data.js';
import {openBigPicture} from './renderBigPicture.js';

function renderingPictureUsers() {

  const usersList = getPublicationsEnrollment();

  const picturesUserContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureUserTemplate = pictureTemplate.querySelector('.picture');
  const pictureUserFragment = document.createDocumentFragment();

  usersList.forEach(({url,likes,comments}) => {
    const userPicture = pictureUserTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureUserFragment.appendChild(userPicture);
  }
  );

  const onClickPicture = function (evt) {
    console.log('Выполняем обаботчик...');
    console.log('evt.target = '+evt.target);
    console.log('evt.target.src = '+evt.target.src);
    console.log('evt.target.classList = '+evt.target.classList);
    if (evt.target.matches('.picture__img')) {
      console.log('Вошли в if');
      openBigPicture(evt.target);
    }

  };

  // добавим обработку по клику на секцию фотографий
  console.log('Добавляем обработчик события на конейнер');
  picturesUserContainer.addEventListener('click',onClickPicture);

  console.log('Прорисовываем элементы');
  picturesUserContainer.appendChild(pictureUserFragment);
}

export {renderingPictureUsers};
