export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Video" });
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete video" });
