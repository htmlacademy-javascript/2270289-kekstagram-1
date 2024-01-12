/*
Структура каждого объекта должна быть следующей:
id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
description, строка — описание фотографии. Описание придумайте самостоятельно.
likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
                            Количество комментариев к каждой фотографии вы определяете на своё усмотрение.
                            Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
*/

const commentsGlossary = ['Всё отлично!','В целом всё неплохо.','Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра.','В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают.','Как можно было поймать такой неудачный момент?!'];
const namesGlossaryMan = ['Андрей','Серафим','Николай','Сергей','Максим','Алексей','Александр','Никита'];
const namesGlossaryWoman = ['Марина','Ирина','Снежана','Анастасия','Ксения','Галина','Ольга','Эльвира','Елена'];

const pathToAvatar = 'img/avatar';
const typeFileAvatar = '.svg';

const comment = {
  id: 0,
  avatar: '',
  name: '',
  message: ''
};

const structObject = {
  id: 0,
  url: '',
  description: '',
  likes: 0,
  comments: []
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
