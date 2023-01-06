import { sequelize } from "../core/db.js";
import { DataTypes } from "sequelize";

export const Fuel = sequelize.define('fuel',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    station_id:{type:DataTypes.STRING},
    user_id:{type:DataTypes.STRING},
    main_type:{type:DataTypes.STRING},
    last_state:{type:DataTypes.STRING},
    gas:{type:DataTypes.STRING},
    petrol:{type:DataTypes.STRING},
    a80:{type:DataTypes.STRING},
    a91:{type:DataTypes.STRING},
    a92:{type:DataTypes.STRING},
    diesel:{type:DataTypes.STRING}
})