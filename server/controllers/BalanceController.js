import Secret from '../models/userSecretModel.js';
import Event from '../models/eventModel.js';

export const getUserBalance = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await Secret.findOne({ where: { userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ balance: user.balance || 0 });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const topUp = async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await Secret.findOne({ where: { userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newBalance = (user.balance || 0) + parseFloat(amount);

        await user.update({ balance: newBalance });

        await Event.create({
            user_id: userId,
            product_id: null,
            type_id: 1,
            target_id: 4,
            description: `ADDENDUM: +${amount}€`,
            timestamp: new Date(),
        });

        res.json({ balance: newBalance });
    } catch (err) {
        console.error('🔥 Error on the TopUp server:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getBalanceHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await Event.findAll({
            where: {
                user_id: userId,
                target_id: [4, 5, 6],
            },
            order: [['timestamp', 'DESC']],
        });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Error getting history' });
    }
};
