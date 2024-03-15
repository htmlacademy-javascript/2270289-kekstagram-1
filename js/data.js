
const createUserPublication = (idPhoto,urlPhoto,descriptionPhoto,likesPhoto,commentsPhoto) => ({
  id: idPhoto,
  url: urlPhoto,
  description: descriptionPhoto,
  likes: likesPhoto,
  comments: commentsPhoto
});

const getPublicationsEnrollment = (miniatures) => {
  const enrollment = [];
  miniatures.forEach(({id,url,description,likes,comments}) => {
    enrollment.push(createUserPublication(id,url,description,likes,comments));
  });
  return enrollment;
};

export {getPublicationsEnrollment};
