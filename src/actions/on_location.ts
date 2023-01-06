import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
import { Station } from '../models/station.model.js'


import { menu_elon_rus, menu_elon_uzb, menu_rus, menu_uz } from '../libs/menu_elon.lib.js'
import { User } from '../models/user.model.js'
const composer = new Composer()

composer.on("location",async (ctx) => {
    const latitude = ctx.message.location.latitude
    const longitude = ctx.message.location.longitude
    const id = ctx.from.id
    const station = await Station.findOne({
        where:{
            user_id:`${id}`
        }
    })
    const user = await User.findOne({
        where:{
            user_id:`${id}`
        }
    })
    const lang = user?.dataValues.user_lang
    const last_state = station?.dataValues.last_state
    await Station.update({
        location:`${longitude} | ${latitude}`,
        last_state:"station_type"
    },{
        where:{
            user_id:`${id}`
        }
    })
    if(lang == "UZB") {
        ctx.replyWithHTML('<b>Zapravka nima sotadi : Petrol,Gas,Diesel</b>')
        await menu_uz(ctx)
    } else {
        ctx.replyWithHTML('<b>Что продает Заправка : Petrol,Gas,Diesel</b>')
        await menu_rus(ctx)
    }   
})

bot.use(composer.middleware())