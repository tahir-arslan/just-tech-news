const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');
const bcrypt = require('bcrypt');

// first import `Model` and `DataTypes` objects from Sequelize. `User` extends `Models` and
// inherits functionality defined to `Model`. then use `init( )` to initialize model's data and config,
// passing two objects as arguments. first defines columns and datatypes, second configures
// options for table

// create User model
class User extends Model {
    // method to run on instance data per user to check pass
    checkPassword(loginPw) {
        // using `this` allows us ot access password which is already stored as hashed string
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
            // setup beforeCreate lifecycle "hook" functionality
            // sync syntax: need 2 local variables to store prehash and posthash data.  
            // beforeCreate(userData) {
            //     return bcrypt.hash(userData.password, 10).then(newUserData => {
            //         return newUserData
            //     });
            // }
            // asynch/await syntax:
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // hash password during update
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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