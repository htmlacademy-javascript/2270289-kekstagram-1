function createRangeElementsForFragment (template,tagOne,tagTwo,indexBegin,boundaryUp,element) {
  const commentsFragment = document.createDocumentFragment();

  for (let i = indexBegin; i < boundaryUp; i++) {
    const comment = template.cloneNode(true);
    const commentImage = comment.querySelector(tagOne);
    const commentText = comment.querySelector(tagTwo);

    commentImage.src = element.comments[i].avatar;
    commentImage.width = 35;
    commentImage.height = 35;
    commentImage.alt = element.comments[i].name;
    commentText.textContent = element.comments[i].message;

    commentsFragment.appendChild(comment);
  }
  return commentsFragment;
}

export {createRangeElementsForFragment};
