/**/
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

const pathToAvatar = 'img/avatar';
const typeFileAvatar = '.svg';
const pathToPhoto = 'photos/';
const typeFilePhoto = '.jpg';
const countUserPublication = 25;
const countAvatar = 6;

const comment = {
  id: 0,
  avatar: '',
  message: '',
  name: '',
};

const userPublicPhoto = {
  id: 0,
  url: '',
  description: '',
  likes: 0,
  comments: []
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function randomIDWithArray(min,max,previousValues) {
  let currentValue = getRandomInteger(min, max);

  if (previousValues.length >= (max - min + 1)) {
    //console.error('Перебраны все числа из диапазона от 1 до 10000');
    return null;
  }
  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  previousValues.push(currentValue);
  return currentValue;
};

const previousValuesIDComment = [];

createComment = () => {

  const randomAvatar = pathToAvatar + getRandomInteger(1,countAvatar) + typeFileAvatar;
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

createUserPublication = () => {

  const randomComments = [];

  const randomIdPhotoPublications = randomIDWithArray(1,25,previousValuesIDPhoto);
  const randomUrlPublications = pathToPhoto + randomIDWithArray(1,25,previousValuesUrlIDPhoto) + typeFilePhoto;
  const randomDescriptionPhoto = descriptionPhotoGlossary[getRandomInteger (0,descriptionPhotoGlossary.length - 1)];
  const randomCountLikes = getRandomInteger (15,200);
  const randomCountComents = getRandomInteger (1,3);

  for (let i = 0; i <= randomCountComents; i++) {
    randomComments.push(createComment());
    //
  }

  return {
    id: randomIdPhotoPublications,
    url: randomUrlPublications,
    description: randomDescriptionPhoto,
    likes: randomCountLikes,
    comments: randomComments
  };
};

const publicationsEnrollment = Array.from({length: countUserPublication},createUserPublication);
