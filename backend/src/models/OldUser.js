import {
  Table,
  Model,
  Column,
  DataTypes,
  HasMany,
  BelongsToMany,
} from 'sequelize';


@Table({
  timestamps: true,
})

export default class User extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    defaultValue: false,
  })
  isAdmin;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    defaultValue: false,
  })
  isActive;

  @Column({
    type: DataType.STRING,
  })
  verificationToken;

  // @BelongsToMany(() => Article, () => ArticleUser)
  // articles: Article[];

  // @HasMany(() => Order)
  // orders: Order[];
}
