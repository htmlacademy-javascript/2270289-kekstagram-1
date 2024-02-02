//import {getPublicationsEnrollment} from './data.js';
import {renderingPictureUsers} from './rendering.js';

renderingPictureUsers();

/*
const usersList = getPublicationsEnrollment();

console.log(usersList);

const picturesUserConteiner = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content;
const pictureUserTemplate = pictureTemplate.querySelector('.picture');
const pictureUserFragment = document.createDocumentFragment();

console.log(pictureTemplate);
console.log(pictureUserTemplate);

usersList.forEach(({url,likes,comments}) => {
  const userPicture = pictureUserTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  pictureUserFragment.appendChild(userPicture);
}
);

picturesUserConteiner.appendChild(pictureUserFragment);
*/
