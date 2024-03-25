import { isEscapeKey, pluralize } from './utils.js';

const COUNT_VIEW_COMMENTS = 5;

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

const listComments = [];
let commentsUpBoundary = COUNT_VIEW_COMMENTS;
let commentsDownBoundary = 0;


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClickButtonForCloseBigPicture();
  }
};

const createRangeElementsForFragment = () => {
  const commentsFragment = document.createDocumentFragment();

  for (let i = commentsDownBoundary; i < commentsUpBoundary; i++) {
    const comment = pictureCommentTemplateClone.cloneNode(true);
    const commentImage = comment.querySelector('img');
    const commentText = comment.querySelector('p');

    commentImage.src = listComments[i].avatar;
    commentImage.width = 35;
    commentImage.height = 35;
    commentImage.alt = listComments[i].name;
    commentText.textContent = listComments[i].message;

    commentsFragment.appendChild(comment);
  }
  return commentsFragment;
};

const onClickButtonForLoadNextMessage = () => {
  const commentDeclension = pluralize(listComments.length, ['комментария', 'комментариев', 'комментариев']);

  commentsDownBoundary += COUNT_VIEW_COMMENTS;
  const increaseBoundary = commentsDownBoundary + COUNT_VIEW_COMMENTS;
  commentsUpBoundary = increaseBoundary < listComments.length ? increaseBoundary : listComments.length;

  bigPictureSocialComments.appendChild(createRangeElementsForFragment());
  bigPictureSocialCommentCount.innerHTML = `${commentsUpBoundary} из ${bigPictureCommentsCount.outerHTML} ${commentDeclension}`; // Использую innerHTML, вместо textContent, для того чтобы внутри элемента сохранить тэг span, который был в изначальной разметке.
  if (commentsUpBoundary === listComments.length) {
    bigPictureSocialCommentsLoader.classList.add('hidden');
  }
};

const openBigPicture = (picture) => {
  commentsDownBoundary = 0;
  listComments.length = 0; // очищаем содержимое массива
  picture.comments.forEach((comment) => listComments.push(comment));
  commentsUpBoundary = (listComments.length <= COUNT_VIEW_COMMENTS) ? picture.comments.length : COUNT_VIEW_COMMENTS;

  const commentDeclension = pluralize(listComments.length, ['комментария', 'комментариев', 'комментариев']);

  bigPicture.src = picture.url;
  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureSocialCaption.textContent = picture.description;

  bigPictureSection.classList.remove('hidden'); // показываем секцию большой фотографии
  document.body.classList.add('modal-open');
  if (picture.comments.length <= COUNT_VIEW_COMMENTS) {
    bigPictureSocialCommentsLoader.classList.add('hidden');
  }

  bigPictureCancel.addEventListener('click', onClickButtonForCloseBigPicture); // обработчик на закрытие секции большой фотографии, при щелчке на кнопке закрытия
  document.addEventListener('keydown', onDocumentKeyDown); // обработчик нажатия клавиш на клавиатуре, на document

  bigPictureSocialComments.innerHTML = '';
  bigPictureSocialCommentCount.innerHTML = `${commentsUpBoundary} из ${bigPictureCommentsCount.outerHTML} ${commentDeclension}`;
  bigPictureCommentsCount.textContent = picture.comments.length;

  bigPictureSocialComments.appendChild(createRangeElementsForFragment());

  bigPictureSocialCommentsLoader.addEventListener('click', onClickButtonForLoadNextMessage);
};

// Функциональное объявление, для поднятия.
function onClickButtonForCloseBigPicture() {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialCommentCount.classList.remove('hidden');
  bigPictureSocialCommentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  bigPictureSocialCommentsLoader.removeEventListener('click', onClickButtonForLoadNextMessage);
  bigPictureSocialCommentsLoader.classList.remove('hidden');
}

export { openBigPicture };
