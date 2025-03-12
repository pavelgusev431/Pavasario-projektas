import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';

const EventTarget = sq.define(  
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
    tableName: 'event_targets',
  }
);

try {
  await EventTarget.sync({ alter: true, force: true });
  console.log('\x1b[35mCategory\x1b[34m table created\x1b[0m');
} catch (error) {
  throw new AppError(`Error while creating EventTarget model: ${error}`, 500);
};

try {
  await EventTarget.create({ name: 'user' });
  await EventTarget.create({ name: 'product' });
  await EventTarget.create({ name: 'transaction' });
  await EventTarget.create({ name: 'category' });
  await EventTarget.create({ name: 'subcategory' });
  await EventTarget.create({ name: 'rating' });
        
  
  console.log('\x1b[35mCategory\x1b[36m table populated\x1b[0m');
} catch (error) {
  throw new AppError(`Error while populating event target model: ${error}`, 500);
};

export default EventTarget;