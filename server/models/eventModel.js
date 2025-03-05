import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';

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
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false, tableName: 'events' }
);

try {
  await Event.sync({ alter: true, force: true });
  console.log('\x1b[35mCategory\x1b[34m table created\x1b[0m');
} catch (error) {
  throw new AppError(`Error while creating event model: ${error}`, 500);
};

export default Event;