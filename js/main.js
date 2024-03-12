
import {renderingPictureUsers} from './render-picture.js';
import {getPublicationsEnrollment} from './data.js';

import {getData} from './api.js';
import {showAlertAboutErrorLoadData} from './message-error.js';

import {onChangeInputFile} from './forms-upload.js';

const inputUploadFile = document.querySelector('#upload-file');
inputUploadFile.addEventListener('change', onChangeInputFile);

getData()
  .then((miniatures) => {
    const pictureList = getPublicationsEnrollment(miniatures);
    renderingPictureUsers(pictureList);
  })
  .catch(() => {
    showAlertAboutErrorLoadData();
  });
