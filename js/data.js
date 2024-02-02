import {getRandomInteger,getRandomArrayElement,getRandomID} from './utils.js';

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
const generatorCommentID = getRandomID(1,10000);
const generatorPhotoID = getRandomID(1,25);

const createComment = () => {
  const randomID = generatorCommentID();
  return {
    id: randomID,
    avatar: `${PATH_TO_AVATAR}${getRandomInteger(1,countAvatar)}${TYPE_FILE_AVATAR}`,
    message: getRandomArrayElement(commentsGlossary),
    name: getRandomArrayElement(namesGlossary),
  };
};

const createUserPublication = () => {
  const idPhotoPublication = generatorPhotoID();
  return {
    id: idPhotoPublication,
    url: `${PATH_TO_PHOTO}${idPhotoPublication}${TYPE_FILE_PHOTO}`,
    description: descriptionPhotoGlossary[getRandomInteger (0,descriptionPhotoGlossary.length - 1)],
    likes: getRandomInteger (15,200),
    comments: Array.from({length:getRandomInteger (1,15)},createComment)
  };
};

function getPublicationsEnrollment () {
  return Array.from({length: countUserPublication},createUserPublication);
}
//const publicationsEnrollment =

export {getPublicationsEnrollment};
