import {getRandomInteger,getRandomArrayElement,randomIDWithArray} from './utils.js';

const commentsGlossary = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const namesGlossary = ['Андрей','Серафим','Николай','Сергей','Максим','Алексей','Никита','Марина','Ирина','Снежана','Анастасия','Ксения','Галина','Эльвира','Елена'];
const descriptionPhotoGlossary = ['Интересная','Необычная','Мутная','Яркая','Старая','Красивая','Ну и фото...'];

const PATH_TO_AVATAR = 'img/avatar';
const TYPE_FILE_AVATAR = '.svg';
const PATH_TO_PHOTO = 'photos/';
const TYPE_FILE_PHOTO = '.jpg';
const countUserPublication = 25;
const countAvatar = 6;
const previousValuesIDComment = [];

const createComment = () => {
  //const randomAvatar = PATH_TO_AVATAR + getRandomInteger(1,countAvatar) + TYPE_FILE_AVATAR;
  const randomAvatar = `${PATH_TO_AVATAR}${getRandomInteger(1,countAvatar)}${TYPE_FILE_AVATAR}`;
  const randomName = getRandomArrayElement(namesGlossary);
  const randomMessage = getRandomArrayElement(commentsGlossary);
  const randomID = randomIDWithArray(1,10000,previousValuesIDComment);

  return {
    id: randomID,
    avatar: randomAvatar,
    message: randomMessage,
    name: randomName,
  };
};

const previousValuesIDPhoto = [];
const previousValuesUrlIDPhoto = [];

const createUserPublication = () => {
  const randomIdPhotoPublications = randomIDWithArray(1,25,previousValuesIDPhoto);
  const randomUrlPublications = PATH_TO_PHOTO + randomIDWithArray(1,25,previousValuesUrlIDPhoto) + TYPE_FILE_PHOTO;
  const randomDescriptionPhoto = descriptionPhotoGlossary[getRandomInteger (0,descriptionPhotoGlossary.length - 1)];
  const randomCountLikes = getRandomInteger (15,200);
  const randomCountComments = getRandomInteger (1,15);

  const randomComments = Array.from({length:randomCountComments},createComment);

  return {
    id: randomIdPhotoPublications,
    url: randomUrlPublications,
    description: randomDescriptionPhoto,
    likes: randomCountLikes,
    comments: randomComments
  };
};

const publicationsEnrollment = Array.from({length: countUserPublication},createUserPublication);

export {publicationsEnrollment};
