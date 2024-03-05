
import {renderingPictureUsers} from './render-picture.js';
import {getPublicationsEnrollment} from './data.js';
import './forms-upload.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';

getData()
  .then((miniatures) => {
    const pictureList = getPublicationsEnrollment(miniatures);
    renderingPictureUsers(pictureList);
  })
  .catch((err) => {
    showAlert(err.message);
  });
