import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';

const EventType = sq.define(
  'EventType',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: 'event_types',
  }
);

try {
  await EventType.sync({ alter: true, force: true });
  console.log('\x1b[35mCategory\x1b[34m table created\x1b[0m');
} catch (error) {
  throw new AppError(`Error while creating EventType model: ${error}`, 500);
};

try {
  await EventType.create({ name: 'created' });
  await EventType.create({ name: 'updated' });
  await EventType.create({ name: 'deleted' });
  await EventType.create({ name: 'banned' });
  await EventType.create({ name: 'viewed' });
  await EventType.create({ name: 'bought' });
  await EventType.create({ name: 'sold' });
  await EventType.create({ name: 'expired' });
  await EventType.create({ name: 'cancelled' });
  await EventType.create({ name: 'executed' });


  console.log('\x1b[35mCategory\x1b[36m table populated\x1b[0m');
} catch (error) {
  throw new AppError(`Error while populating event type model: ${error}`, 500);
};

export default EventType;