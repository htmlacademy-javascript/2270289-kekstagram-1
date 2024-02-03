import {getPublicationsEnrollment} from './data.js';

function renderingPictureUsers() {

  const usersList = getPublicationsEnrollment();

  const picturesUserConteiner = document.querySelector('.pictures');
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
  picturesUserConteiner.appendChild(pictureUserFragment);
}

export {renderingPictureUsers};
