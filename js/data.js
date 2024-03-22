
const createUserPublication = (idPhoto,urlPhoto,descriptionPhoto,likesPhoto,commentsPhoto) => ({
  id: idPhoto,
  url: urlPhoto,
  description: descriptionPhoto,
  likes: likesPhoto,
  comments: commentsPhoto
});

const getPublicationsEnrollment = (miniatures) => {
  const enrollments = [];
  miniatures.forEach(({id,url,description,likes,comments}) => {
    enrollments.push(createUserPublication(id,url,description,likes,comments));
  });
  return enrollments;
};

export {getPublicationsEnrollment};
