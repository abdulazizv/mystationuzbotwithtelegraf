import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
import { Station } from '../models/station.model.js'
import { Fuel } from '../models/fuel.model.js'
import { User } from '../models/user.model.js'

const composer = new Composer()

composer.on("message",async (ctx) => {
    const id = ctx.from.id
    const fuel = await Fuel.findOne({
        where:{
            user_id:`${id}`
        }
    })
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
    if(!user) {
        return ctx.replyWithHTML(`<b>"/start" tugmasini bosing</b>`)
    }
        const l_state = fuel?.dataValues.last_state
        const last_state = station?.dataValues.last_state
        const lang = user.dataValues.user_lang
    if(last_state == "station_name"){    
        if('text' in ctx.message) {
            await Station.update({
                station_name:`${ctx.message.text}`,
                last_state:"branch_name"
            },{
                where:{
                user_id:`${id}`
                }
            })
        }
        if(lang == "UZB"){
            ctx.replyWithHTML(`<b>Zapravka qaysi filialda ekanligini kiriting :</b>`)
        }else {
            ctx.replyWithHTML(`<b>Укажите филиал, в котором находится Заправка :</b>`)
        }
}  else if(last_state == "branch_name"){
    if('text' in ctx.message) {
        await Station.update({
            branchname:`${ctx.message.text}`,
            last_state:"station_address"
        },{
            where:{
                user_id:`${id}`
            }
        })
    }
    if(lang == "UZB"){
        ctx.replyWithHTML('<b>Zapravkaning addressini kiriting: </b>')
    } else {
        ctx.replyWithHTML('<b>Введите адрес заправки: </b>')
    }
} else if(last_state == "station_address") {
    if('text' in ctx.message) {
        await Station.update({
            station_address:`${ctx.message.text}`,
            last_state:"location"
        },{
            where:{
                user_id:`${id}`
            }
        })
    }
    if(lang == "UZB"){
    await ctx.reply(`Iltimos, <b>"Location yuborish"</b> tugmasini bosing! `, {
        parse_mode: 'HTML',
        ...Markup.keyboard([[Markup.button.locationRequest('📍 Location yuborish'), '🏠 Bosh sahifa']])
          .oneTime()
          .resize(),
    })
    } else {
        await ctx.reply(`Пожалуйста, нажмите <b>"Отправить местоположение"</b>! `, {
            parse_mode: 'HTML',
            ...Markup.keyboard([[Markup.button.locationRequest('📍 Отправить местоположение'), '🏠 Домашняя страница']])
              .oneTime()
              .resize(),
        }) 
    }
} else if(last_state == "station_type"){
    if('text' in ctx.message) {
        await Station.update({
            station_type:`${ctx.message.text}`,
            last_state:"finish"
        },{
            where:{
                user_id:`${id}`
            }
        })
        await Fuel.create({
            user_id:`${id}`,
            station_id:station?.dataValues.id,
            main_type:`${ctx.message.text}`
        })
        if(ctx.message.text.toLowerCase() == 'petrol'){
                await Fuel.update({
                    last_state:"a80"
                },{
                    where:{
                        user_id:`${id}`
                    }
                }) 
                if(lang == "UZB"){
                    ctx.replyWithHTML(`<b>Benzinning a80 turi narxini kiriting ? Agar bo'lmasa yo'q deb kiriting :</b>`)
                }
                else {
                    ctx.replyWithHTML(`<b>Введите цену бензина марки А80? Если нет, введите нет :</b>`)
                }
        }
    } 
} else if(l_state == "a80"){
    if('text' in ctx.message){
        await Fuel.update({
        last_state:"a91",
        a80:`${ctx.message.text}`
    },{
            where:{
                user_id:`${id}`
            }
        })
    }
    if(lang == "UZB"){
        await ctx.replyWithHTML(`<b>a91 haqida ma'lumotlarini,bo'lmasa yo'q deb kiriting oka 🤘</b>`)
    } else {
        await ctx.replyWithHTML(`<b>Введите информацию о а91, если нет, введите как нет, ок 🤘</b>`)
    }
} else if(l_state == "a91"){
    if('text' in ctx.message) {
        await Fuel.update({
            last_state:"a92",
            a91:`${ctx.message.text}`
        },{
            where:{
                user_id:`${id}`
            }
        })
    }
    if(lang == "UZB"){
        await ctx.replyWithHTML(`<b>9️⃣2️⃣ ni kiritin endi : </b>`)
    } else {
        await ctx.replyWithHTML(`<b>Теперь введите 9️⃣2️⃣ : </b>`)
    }
} else if(l_state == "a92") {
    if('text' in ctx.message) {
        await Fuel.update({
            last_state:'finish',
            a92:`${ctx.message.text}`
        },{
            where:{
                user_id:`${id}`
            }
        })
    }
    if(lang == "UZB"){
        await ctx.replyWithHTML(`<b>🫡 Bo'ldi brat tugadi! </b>`)
    } else {
        await ctx.replyWithHTML(`<b>🫡 Готово!</b>`)
    }
}  
})





bot.use(composer.middleware())