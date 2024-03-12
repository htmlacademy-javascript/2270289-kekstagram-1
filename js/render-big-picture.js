import {isEscapeKey,pluralize} from './utils.js';
import {createRangeElementsForFragment} from './render-comments.js';

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
const pictureCommentTemplate = bigPictureSocialComments.querySelector('.social__comment');
const pictureCommentTemplateClone = pictureCommentTemplate.cloneNode(true);

const COUNT_VIEW_COMMENTS = 5;
let commentsUpBoundary = COUNT_VIEW_COMMENTS;
let commentsDownBoundary = 0;

const openBigPicture = (picture) => {
  const onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  bigPictureSection.classList.remove('hidden'); // показываем секцию большой фотографии
  document.body.classList.add('modal-open');

  bigPicture.src = picture.url;
  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;

  bigPictureCancel.addEventListener('click',closeBigPicture); // обработчик на закратие секции  большой фотграфии при щелчке на кнопке закрытия
  document.addEventListener('keydown',onDocumentKeyDown); // обработчик нажатие клавиш на клавиатуре, на document
  const commentDeclension = pluralize(picture.comments.length,['комментария','комментариев','комментариев']); // Для склонение слова в зависимости от количества

  const loadNextMessage = () => {
    commentsDownBoundary += COUNT_VIEW_COMMENTS;
    const increaseBoundary = commentsDownBoundary + COUNT_VIEW_COMMENTS;
    commentsUpBoundary = increaseBoundary < picture.comments.length ? increaseBoundary : picture.comments.length;

    bigPictureSocialComments.appendChild(createRangeElementsForFragment(pictureCommentTemplateClone,'img','p',commentsDownBoundary,commentsUpBoundary,picture));
    bigPictureSocialCommentCount.innerHTML = `${commentsUpBoundary} из ${bigPictureCommentsCount.outerHTML} ${commentDeclension}`; // Использую innerHTML, вместо textContent, для того чтобы внутри элемента сохранить тэг span, который был в изначальной разметке.
    if (commentsUpBoundary === picture.comments.length) {
      bigPictureSocialCommentsLoader.classList.add('hidden');
    }
  };

  if (picture.comments.length <= 5) {
    commentsUpBoundary = picture.comments.length;
  }

  bigPictureSocialComments.innerHTML = '';
  bigPictureSocialCommentCount.innerHTML = `${commentsUpBoundary} из ${bigPictureCommentsCount.outerHTML} ${commentDeclension}`;
  bigPictureCommentsCount.textContent = picture.comments.length;

  bigPictureSocialComments.appendChild(createRangeElementsForFragment(pictureCommentTemplateClone,'img','p',commentsDownBoundary,commentsUpBoundary,picture));
  bigPictureSocialCommentsLoader.addEventListener('click', loadNextMessage);

  bigPictureSocialCaption.textContent = picture.description;
  if (picture.comments.length <= 5) {
    bigPictureSocialCommentsLoader.classList.add('hidden');
  }

  // Функционадьное объявление, для поднятия.
  function closeBigPicture () {
    bigPictureSection.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureSocialCommentCount.classList.remove('hidden');
    bigPictureSocialCommentsLoader.classList.remove('hidden');
    document.removeEventListener('keydown',onDocumentKeyDown);
    bigPictureSocialCommentsLoader.removeEventListener('click',loadNextMessage);
    bigPictureSocialCommentsLoader.classList.remove('hidden');
    commentsUpBoundary = COUNT_VIEW_COMMENTS;
    commentsDownBoundary = 0;
  }
};

export {openBigPicture};
