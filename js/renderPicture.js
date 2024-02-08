import {getPublicationsEnrollment} from './data.js';
import {openBigPicture} from './renderBigPicture.js';

const pictureList = getPublicationsEnrollment();

function renderingPictureUsers() {

  const picturesUserContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureUserTemplate = pictureTemplate.querySelector('.picture');
  const pictureUserFragment = document.createDocumentFragment();

  pictureList.forEach(({url,likes,comments,id}) => {
    const userPicture = pictureUserTemplate.cloneNode(true);
    const userPictureImage = userPicture.querySelector('.picture__img');
    userPictureImage.src = url;
    userPictureImage.setAttribute('data-id-picturelist',id); // Добавим атрибут для связи с идентификатором списка пользователей
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureUserFragment.appendChild(userPicture);
  }
  );

  const onClickPicture = function (evt) {
    if (evt.target.matches('.picture__img')) {
      const idUser = evt.target.getAttribute('data-id-picturelist');

      //  let indexList = 0;
      //  console.log("idUser = " + idUser);
      // массив.some((текущий_элемент_массива, индекс_текущего_элемента, ссылка_на_весь_массив) => {})
      //
      /*
      const indexList = () => {
        if isInArray = pictureList.some((picture,indexPicture) => {
        return 1 === 1;});
      }
*/
      const indexList = pictureList.findIndex((picture,indexPicture) => {
        console.log(picture.id);
        return picture.id == idUser;
      });

//      let indexList = pictureList.findIndex(item => item.id === idUser);
      console.log("idUser = " + idUser);
      console.log("indexList = " + indexList);
/*
      for (let i = 0; i < pictureList.length; i++) {
        console.log("pictureList[i].id = " + pictureList[i].id);
        if (pictureList[i].id === idUser) {
          indexList = i;
          console.log('Индекс в цикле равен = ' + indexList);
          break;
        }
      }
*/
      //arr.indexOf(item, from)
      openBigPicture(evt.target,pictureList[indexList]);
    }
  };

  picturesUserContainer.appendChild(pictureUserFragment);
  picturesUserContainer.addEventListener('click',onClickPicture); // добавим обработку по клику на секцию фотографий

}

export {renderingPictureUsers};
