import { sequelize } from '../core/db.js'
import { DataTypes } from 'sequelize'
export const Station = sequelize.define('station',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    user_id:{type:DataTypes.STRING},
    station_name:{type:DataTypes.STRING},
    branchname:{type:DataTypes.STRING},
    station_address:{type:DataTypes.STRING},
    location:{type:DataTypes.STRING},
    isBor:{type:DataTypes.BOOLEAN},        
    last_state:{type:DataTypes.STRING},
    station_type:{type:DataTypes.STRING},
})