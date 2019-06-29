const validateGame = (req, res, next) => {
    const { title, genre, releaseYear } = req.body;

    if (!title || !genre) req.body = "Missing required field";
    else if ((Number(releaseYear) + "").length != 4) req.body = "Year must be a four digit number";

    next();
}

module.exports = validateGame;