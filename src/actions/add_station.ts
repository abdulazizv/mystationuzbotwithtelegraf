import { Composer } from "telegraf";
import { bot } from "../main.js";
import { Station } from "../models/station.model.js";


const composer = new Composer()

composer.on("message",async (ctx) => {
    const id = ctx.from.id
    const station = await Station.findOne({
        where:{
            user_id:`${id}`
        }
    })
    console.log(station)
    // if(station?.dataValues.last_state == "station_name"){
    //     station.dataValues.last_state = "station_address"
    // }
    console.log(ctx.from)
})