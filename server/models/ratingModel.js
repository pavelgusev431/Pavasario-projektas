import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';

const Rating = sq.define(
  'Rating',
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
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,

    },
  },
  { timestamps: false, tableName: 'ratings' }
);

try {
  await Rating.sync({ alter: true, force: true });
  console.log('\x1b[35mCategory\x1b[34m table created\x1b[0m');
} catch (error) {
  throw new AppError(`Error while creating rating model: ${error}`, 500);
};

export default Rating;