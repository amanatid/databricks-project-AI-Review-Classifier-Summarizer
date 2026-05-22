export const isGuestUser = (req, res, next) => {

  console.log("guestuserMiddleware");

  // NOT LOGGED IN
  if (!req.userInfo) {

    console.log("redirect to login");
    console.log(req.originalUrl);

    return res.redirect(
      `/login?redirect=${encodeURIComponent(req.originalUrl)}`
    );
  }

  // LOGGED IN BUT NOT GUEST
  if (req.userInfo.role !== "guest") {

    return res.status(403).render("error", {
      message: "Η αξιολόγηση επιτρέπεται μόνο για χρήστες."
    });
  }

  // LOGGED IN GUEST
  next();
};