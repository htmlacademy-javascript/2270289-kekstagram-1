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

const socialCommentsFragment = document.createDocumentFragment();

let indexBeginViewComments = 0;
const COUNT_VIEW_COMMENTS = 5;

const closeBigPicture = function () {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialCommentCount.classList.remove('hidden');
  bigPictureSocialCommentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown',onDocumentKeyDown);
  //bigPictureSocialCommentsLoader.removeEventListener('click',loadNextMessage);
  indexBeginViewComments = 0;
};

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const createRangeElementsForFragment = function (template,tagOne,tagTwo,indexBegin,countView,element) {

  const commentsFragment = document.createDocumentFragment();

  console.log('комментарии из функции...');
  console.log('indexBegin: ' + indexBegin);
  console.log('countView: ' + countView );
  console.log('template: ' + template );

  const indexUpBoundary = (indexBegin + countView) < element.comments.length ? indexBegin + countView : element.comments.length;

  for (let i = indexBegin; i < indexUpBoundary; i++) {
    const comment = template.cloneNode(true);
    const commentImage = comment.querySelector(tagOne);
    const commentText = comment.querySelector(tagTwo);

    commentImage.src = element.comments[i].avatar;
    commentImage.width = 35;
    commentImage.height = 35;
    commentImage.alt = element.comments[i].name;
    commentText.textContent = element.comments[i].message;

    commentsFragment.appendChild(comment);
  }
  return commentsFragment;
};

/*
function loadNextMessage(picture) {
  indexBeginViewComments += 5;
  const commentsUpBoundary = (indexBeginViewComments + COUNT_VIEW_COMMENTS) < picture.comments.length ? indexBeginViewComments + COUNT_VIEW_COMMENTS : picture.comments.length;
  bigPictureSocialCommentCount.innerHTML = `показаны комментарии с ${indexBeginViewComments} по ${commentsUpBoundary} из ${bigPictureCommentsCount.outerHTML}`;
  bigPictureSocialComments.innerHTML = '';
  const pictureCommentTemplate = bigPictureSocialComments.querySelector('.social__comment');
  bigPictureSocialComments.appendChild(createRangeElementsForFragment(pictureCommentTemplate,'img','p',indexBeginViewComments,COUNT_VIEW_COMMENTS,picture));
}
*/

const openBigPicture = function (miniature,picture) {

  const parentMiniature = miniature.parentElement; // Получим ссылку на родительский элемент миниатюры (элемент - ссылка <a></a>)

  bigPictureSection.classList.remove('hidden'); // показываем секцию большой фотографии

  document.body.classList.add('modal-open');
  bigPicture.src = miniature.src;

  bigPictureCancel.addEventListener('click',closeBigPicture); // обработчик на закратие секции  большой фотграфии при щелчке на кнопке закрытия
  document.addEventListener('keydown',onDocumentKeyDown); // обработчик нажатие клавиш на клавиатуре, на document

  const parentMiniaturePictureInfo = parentMiniature.querySelector('.picture__info');
  const parentMiniaturePictureComments = parentMiniaturePictureInfo.querySelector('.picture__comments');
  const parentMiniaturePictureLikes = parentMiniaturePictureInfo.querySelector('.picture__likes');

  bigPictureLikesCount.textContent = parentMiniaturePictureLikes.textContent;
  bigPictureCommentsCount.textContent = parentMiniaturePictureComments.textContent;

  const pictureCommentTemplate = bigPictureSocialComments.querySelector('.social__comment');

  bigPictureSocialComments.innerHTML = '';
  console.log(picture);
  console.log('picture.comments.length = ' + picture.comments.length);

  if (picture.comments.length <= 5) {
    console.log('Зашли в блок где "меньше 5"');

    bigPictureCommentsCount.textContent = picture.comments.length;
    bigPictureSocialCommentCount.innerHTML = `${picture.comments.length} из ${bigPictureCommentsCount.outerHTML} комментариев`;
    bigPictureSocialComments.appendChild(createRangeElementsForFragment(pictureCommentTemplate,'img','p',0,picture.comments.length,picture));

  } else {
    console.log('Зашли в блок где "БОЛЬШЕ 5"');

    const commentsUpBoundary = (indexBeginViewComments + COUNT_VIEW_COMMENTS) < picture.comments.length ? indexBeginViewComments + COUNT_VIEW_COMMENTS : picture.comments.length;
    bigPictureCommentsCount.textContent = picture.comments.length;
    console.log('indexBeginViewComments = ' + indexBeginViewComments + '| commentsUpBoundary = ' + commentsUpBoundary);
    bigPictureSocialCommentCount.innerHTML = `показаны комментарии с ${indexBeginViewComments + 1} по ${commentsUpBoundary} из ${bigPictureCommentsCount.outerHTML}`;
    bigPictureSocialComments.appendChild(createRangeElementsForFragment(pictureCommentTemplate,'img','p',indexBeginViewComments,COUNT_VIEW_COMMENTS,picture));
  }

  bigPictureSocialCommentsLoader.addEventListener('click', () => {
    indexBeginViewComments += 5;
    const commentsUpBoundary = (indexBeginViewComments + COUNT_VIEW_COMMENTS) < picture.comments.length ? indexBeginViewComments + COUNT_VIEW_COMMENTS : picture.comments.length;
    console.log('indexBeginViewComments = ' + indexBeginViewComments + '| commentsUpBoundary = ' + commentsUpBoundary);
    bigPictureSocialComments.innerHTML = '';
    //const pictureCommentTemplate = bigPictureSocialComments.querySelector('.social__comment');
    bigPictureSocialComments.appendChild(createRangeElementsForFragment(pictureCommentTemplate,'img','p',indexBeginViewComments,COUNT_VIEW_COMMENTS,picture));
    bigPictureSocialCommentCount.innerHTML = `показаны комментарии с ${indexBeginViewComments} по ${commentsUpBoundary} из ${bigPictureCommentsCount.outerHTML}`;
  }
  );

  bigPictureSocialCaption.textContent = picture.description;
};

export {openBigPicture};
