const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

// first import `Model` and `DataTypes` objects from Sequelize. `User` extends `Models` and
// inherits functionality defined to `Model`. then use `init( )` to initialize model's data and config,
// passing two objects as arguments. first defines columns and datatypes, second configures
// options for table

// create User model
class User extends Model {}

// define table columns and configs
User.init(
    {
        // table column definitions
        // define id column
        id: {
            // use special Sequelize DataTypes object and provide what type of data it is
            type: DataTypes.INTEGER,
            // equivalent of SQL's `NOT NULL` OPTION
            allowNull: false,
            // instruct Primary Key
            primaryKey: true,
            autoIncrement: true
        },
        // define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // don't allow duplicate emails
            unique: true,
            // if allowNull = false, can validate before creating table data
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4] // min 4 chars long
            }
        }
    },
    {
        // table config options (https://sequelize.org/v5/manual/models-definition.html#configuration)
        // pass imported sequelize connection (direct connection to db)
        sequelize,
        // don't autocreate createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of db table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // keep model name lowercase in db
        modelName: 'user'
    }
);

module.exports = User;