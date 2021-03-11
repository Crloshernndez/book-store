class PageNotFoundController {
  constructor() {}

  // metodo para renderizar 404 page
  getPageNotFound = (req, res, next) => {
    res.status(404).render("404", { pageTitle: "Page not found" });
  };
}

module.exports = PageNotFoundController;
