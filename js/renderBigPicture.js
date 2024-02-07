import {isEscapeKey} from './utils.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureDiv = bigPictureSection.querySelector('.big-picture__img');
const bigPicture = bigPictureDiv.querySelector('img');
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');

const bigPictureCommentsCount = bigPictureSection.querySelector('.comments-count');
const bigPictureSocialComments = bigPictureSection.querySelector('.social__comments');
const socialCommentsImage = bigPictureSocialComments.querySelector('img');
const socialCommentsText = bigPictureSocialComments.querySelector('p');

const bigPictureSocial = bigPictureSection.querySelector('.big-picture__social');
const bigPictureSocialCaption = bigPictureSocial.querySelector('.social__caption');

const bigPictureCancel = bigPictureSection.querySelector('.big-picture__cancel');

const bigPictureSocialCommentCount = bigPictureSection.querySelector('.social__comment-count');
const bigPictureSocialCommentsLoader = bigPictureSection.querySelector('.social__comments-loader');

const closeBigPicture = function () {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialCommentCount.classList.remove('hidden');
  bigPictureSocialCommentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown',onDocumentKeyDown);
};

const onDocumentKeyDown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = function (miniature,listUsers) {

  let indexUser = 0;
  console.log(miniature.src);
  //console.log(listUsers);
/*
  for (let i = 0; i < listUsers.length; i++) {
    const user = listUsers[i];
    console.log(user);
    if (user.url === miniature.src) {
      indexUser = i;
    }
  }

  console.log('indexUser = ' + indexUser);
  console.log('listUsers[indexUser].description = '+listUsers[indexUser].description);

  const comments = listUsers[indexUser].comments;
*/
  const parentMiniature = miniature.parentElement; // Получим ссылку на родительский элемент миниатюры (ссылка <a></a>)
  bigPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureSocialCommentCount.classList.add('hidden');
  bigPictureSocialCommentsLoader.classList.add('hidden');
  bigPicture.src = miniature.src;

  bigPictureCancel.addEventListener('click',closeBigPicture);
  document.addEventListener('keydown',onDocumentKeyDown);

  const parentMiniaturePictureInfo = parentMiniature.querySelector('.picture__info');
  const parentMiniaturePictureComments = parentMiniaturePictureInfo.querySelector('.picture__comments');
  const parentMiniaturePictureLikes = parentMiniaturePictureInfo.querySelector('.picture__likes');

  bigPictureLikesCount.textContent = parentMiniaturePictureLikes.textContent;
  bigPictureCommentsCount.textContent = parentMiniaturePictureComments.textContent;

  socialCommentsImage.classList.add('social__picture');
  socialCommentsImage.src = '';
  socialCommentsImage.alt = '';
  socialCommentsImage.width = 35;
  socialCommentsImage.height = 35;
  socialCommentsText.textContent = ' ';

  bigPictureSocialCaption.textContent = listUsers[indexUser].description;

  //console.log('miniature.src = ' + miniature.src);
  //console.log('parentMiniature.classList = ' + parentMiniature.classList);
};


export {openBigPicture};
