import axios from "axios";

const deleteCommentBtn = document.querySelectorAll("#commentDeleteBtn");
const commentNumber = document.getElementById("jsCommentNumber");

function decreaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const deleteComment = async commentId => {
  const response = await axios({
    url: `/api/${commentId}/deleteComment`,
    method: "POST"
  });
  if (response.status === 200) {
    decreaseNumber();
  }
};

function handleDeleteClick(event) {
  const commentId = event.target.name;
  event.target.parentNode.remove();
  deleteComment(commentId);
}

function init() {
  deleteCommentBtn.forEach(elem => {
    elem.addEventListener("click", handleDeleteClick);
  });
}

if (deleteCommentBtn) {
  console.log(deleteCommentBtn);
  init();
}
