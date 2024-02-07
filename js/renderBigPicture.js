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

bigPicture.url = '';
bigPictureLikesCount.textContent = '';
bigPictureCommentsCount.textContent = '';

socialCommentsImage.classList.add('social__picture');
socialCommentsImage.src = '';
socialCommentsImage.alt = '';
socialCommentsImage.width = 35;
socialCommentsImage.height = 35;
socialCommentsText.textContent = ' ';

bigPictureSocialCaption.textContent = '';

const openBigPicture = function (miniature) {
  console.log('miniature.src = ' + miniature.src);
};

export {openBigPicture};
