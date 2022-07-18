module.exports = (sequelize, DataTypes) => {
    return sequelize.define('servers', {
        ip: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        port: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.TEXT,
        tamingRate: DataTypes.INTEGER,
        breedingRate: DataTypes.INTEGER,
        harvestRate: DataTypes.INTEGER,
        XPRate: DataTypes.INTEGER,
        weekendTamingRate: DataTypes.INTEGER,
        weekendBreedingRate: DataTypes.INTEGER,
        weekendHarvestRate: DataTypes.INTEGER,
        WeekendXPRate: DataTypes.INTEGER,
    })
}