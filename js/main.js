/**/

const commentsGlossary = ['Всё отлично!','В целом всё неплохо.','Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра.','В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают.','Как можно было поймать такой неудачный момент?!'];
const namesGlossaryMan = ['Андрей','Серафим','Николай','Сергей','Максим','Алексей','Александр','Никита'];
const namesGlossaryWoman = ['Марина','Ирина','Снежана','Анастасия','Ксения','Галина','Ольга','Эльвира','Елена'];

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

createComment = () => {

};

createUserPublication = () => {
  const randomIdPhotoPublications = getRandomInteger (1,25);
  const randomCountLikes = getRandomInteger (15,200);
  const randomCountComents = getRandomInteger (1,3);
};

