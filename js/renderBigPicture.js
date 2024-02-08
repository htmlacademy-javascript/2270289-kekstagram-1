import {isEscapeKey} from './utils.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureDiv = bigPictureSection.querySelector('.big-picture__img');
const bigPicture = bigPictureDiv.querySelector('img');
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');

const bigPictureCommentsCount = bigPictureSection.querySelector('.comments-count');

const bigPictureSocial = bigPictureSection.querySelector('.big-picture__social');
const bigPictureSocialCaption = bigPictureSocial.querySelector('.social__caption');

const bigPictureCancel = bigPictureSection.querySelector('.big-picture__cancel');

const bigPictureSocialCommentsLoader = bigPictureSection.querySelector('.social__comments-loader');

const bigPictureSocialCommentCount = bigPictureSection.querySelector('.social__comment-count');
const bigPictureSocialComments = bigPictureSection.querySelector('.social__comments');
const saveBigPictureSocialComments = bigPictureSocialComments.cloneNode(true); // Сохраним изначальную разметку .social__comments
//console.log('saveBigPictureSocialComments = ' + saveBigPictureSocialComments);
const socialCommentsFragment = document.createDocumentFragment();

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

const openBigPicture = function (miniature,picture) {

  const parentMiniature = miniature.parentElement; // Получим ссылку на родительский элемент миниатюры (элемент - ссылка <a></a>)

  bigPictureSection.classList.remove('hidden'); // показываем секцию большой фотографии
  bigPictureSocialCommentCount.classList.add('hidden');
  bigPictureSocialCommentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');
  bigPicture.src = miniature.src;

  bigPictureCancel.addEventListener('click',closeBigPicture); // обработчик на закратие секции  большой фотграфии при щелчке на кнопке закрытия
  document.addEventListener('keydown',onDocumentKeyDown); // обработчик нажатие клавиш на клавиатуре, на document

  const parentMiniaturePictureInfo = parentMiniature.querySelector('.picture__info');
  const parentMiniaturePictureComments = parentMiniaturePictureInfo.querySelector('.picture__comments');
  const parentMiniaturePictureLikes = parentMiniaturePictureInfo.querySelector('.picture__likes');

  bigPictureLikesCount.textContent = parentMiniaturePictureLikes.textContent;
  bigPictureCommentsCount.textContent = parentMiniaturePictureComments.textContent;

  //socialCommentsImage.classList.add('social__picture');

  const pictureCommentTemplate = bigPictureSocialComments.querySelector('.social__comment');

  picture.comments.forEach(({avatar,message,name}) => {
    const pictureComment = pictureCommentTemplate.cloneNode(true);
    const pictureCommentImage = pictureComment.querySelector('img');
    const pictureCommentText = pictureComment.querySelector('p');

    pictureCommentImage.src = avatar;
    pictureCommentImage.width = 35;
    pictureCommentImage.height = 35;
    pictureCommentImage.alt = name;
    pictureCommentText.textContent = message;

    socialCommentsFragment.appendChild(pictureComment);
  });

  bigPictureSocialComments.innerHTML = '';
  bigPictureSocialComments.appendChild(socialCommentsFragment);

  bigPictureSocialCaption.textContent = picture.description;
  //console.log(picture.description);
  //console.log(picture);
  console.log("idPicrure = " + picture.id);
};

export {openBigPicture};