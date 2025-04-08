const zalgoRegex = new RegExp(process.env.ZALGO_REGEX);

const validateSearchQuery = (req, res, next) => {
    const { q } = req.query;
    const trimmed = q?.trim().toLowerCase();

    if (
        !trimmed ||
        trimmed.length < 3 ||
        trimmed.length > 15 ||
        zalgoRegex.test(trimmed)
    ) {
        return res.status(400).json({ error: 'Invalid search query.' });
    }

    next();
};

export default validateSearchQuery;
