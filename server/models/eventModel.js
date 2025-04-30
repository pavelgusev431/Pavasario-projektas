// @ts-check
import { DataTypes, Model } from 'sequelize';
import sq from '../database/sequelize.js';
import EventType from './event_typeModel.js';
import EventTarget from './event_targetModel.js';
import User from './userModel.js';
import AppError from '../utilities/AppError.js';

/**@type {import("sequelize").ModelStatic<Model<any, any>>}*/
const Event = sq.define(
    'Event',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        target_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    { timestamps: false, tableName: 'events' }
);

Event.belongsTo(EventType, { foreignKey: 'type_id', as: 'eventType' });
Event.belongsTo(EventTarget, { foreignKey: 'target_id', as: 'eventTarget' });
Event.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

try {
    await Event.sync({ alter: true, force: true });
    console.log('\x1b[35mEvent\x1b[34m table created\x1b[0m');
} catch (error) {
    throw new AppError(`Error while creating event model: ${error}`, 500);
}

export default Event;
