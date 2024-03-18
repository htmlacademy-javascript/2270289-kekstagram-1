
import {getData} from './api.js';
import {showAlertAboutErrorLoadData} from './message-error.js';
import {onChangeInputFile} from './forms-upload.js';
import {getPictureList,showImageFilter} from './image-filter.js';

const inputUploadFile = document.querySelector('#upload-file');
inputUploadFile.addEventListener('change', onChangeInputFile);

getData()
  .then((miniatures) => {
    getPictureList(miniatures);
    showImageFilter();
  })
  .catch(() => {
    showAlertAboutErrorLoadData();
  });
