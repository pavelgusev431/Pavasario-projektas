import Event from '../models/eventModel.js';
import EventType from '../models/event_typeModel.js';
import EventTarget from '../models/event_targetModel.js';

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [
                { model: EventType, as: 'eventType', attributes: ['name'] },
                { model: EventTarget, as: 'eventTarget', attributes: ['name'] },
            ],
            order: [['timestamp', 'DESC']],
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Ошибка при получении ивентов:', error);
        res.status(500).json({
            message: 'Ошибка сервера при получении событий',
        });
    }
};
