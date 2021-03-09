const { passwordHash, tokenizer } = require('../helper');
const { authService } = require('../service');
const { errorUser } = require('../error');

module.exports = {
    getUSerAuth: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await authService.authUser({ email });

            if (!user) {
                throw new Error('NO USER');
            }

            await passwordHash.compare(password, user.password);

            const tokens = tokenizer();

            res.json(tokens);
        } catch (e) {
            res.status(errorUser.BED_PASSWORD_OR_EMAIL).json(e.message);
        }
    }
};
