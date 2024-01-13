/**/
const commentsGlossary = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра.','В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают.','Как можно было поймать такой неудачный момент?!'];
const namesGlossary = ['Андрей','Серафим','Николай','Сергей','Максим','Алексей','Никита','Марина','Ирина','Снежана','Анастасия','Ксения','Галина','Эльвира','Елена'];

const pathToAvatar = 'img/avatar';
const typeFileAvatar = '.svg';
const countUserPublication = 25;
const countAvatar = 6;

const comment = {
  id: 0,
  avatar: '',
  name: '',
  message: ''
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

createComment = () => {
  const previousValuesID = [];

  const randomAvatar = pathToAvatar + getRandomInteger(1,countAvatar) + typeFileAvatar;
  const randomName = getRandomArrayElement(namesGlossary);
  const randomMessage = getRandomArrayElement(commentsGlossary);

  const randomID = function () {
    let currentValue = getRandomInteger(1, 10000);

    if (previousValuesID.length >= (10000)) {
      //console.error('Перебраны все числа из диапазона от 1 до 10000');
      return null;
    }
    while (previousValuesID.includes(currentValue)) {
      currentValue = getRandomInteger(1, 10000);
    }
    previousValuesID.push(currentValue);
    return currentValue;
  };

  return {
    id: randomID(),
    avatar: randomAvatar,
    message: randomMessage,
    name: randomName,
  };
};

createUserPublication = () => {
  const randomIdPhotoPublications = getRandomInteger (1,25);
  const randomCountLikes = getRandomInteger (15,200);
  const randomCountComents = getRandomInteger (1,3);
};

