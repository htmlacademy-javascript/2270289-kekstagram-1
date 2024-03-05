
import {renderingPictureUsers} from './render-picture.js';
import {getPublicationsEnrollment} from './data.js';
import './forms-upload.js';
import {getData} from './api.js';

getData()
  .then((miniatures) => {
    const pictureList = getPublicationsEnrollment(miniatures);
    renderingPictureUsers(pictureList);
  });

/*
fetch ('https://28.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    const pictureList = getPublicationsEnrollment(miniatures);
    renderingPictureUsers(pictureList);
  });
*/
