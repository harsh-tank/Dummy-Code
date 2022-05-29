import { Unique } from "sequelize-typescript"

const CustomerModel = (sequelize: any, DataTypes: any) => {
    const Customer = sequelize.define(
      'Customer',
      {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING
        },
        company: {
            allowNull: false,
            type: DataTypes.STRING
        }
      },
      {
        timestamps: true,
      }
    )
    return Customer
  }
  
  export default CustomerModel