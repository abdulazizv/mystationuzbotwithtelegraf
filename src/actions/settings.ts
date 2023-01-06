import {bot} from '../core/bot.js'
import {Composer,Markup} from 'telegraf'
import { selectLang,saveLang } from '../libs/lang.js'
import { doAdmin } from '../libs/admin.js'
import { User } from '../models/user.model.js'
import { Station } from '../models/station.model.js'
import { Fuel } from '../models/fuel.model.js'

const composer = new Composer()

composer.hears("🇺🇿 O'zbek tili", async (ctx) => {
    await saveLang(ctx, 'UZB')
  })
  
  composer.hears('🇷🇺 Русский язык', async (ctx) => {
    await saveLang(ctx, 'RUS')
})
composer.hears("👮‍♂️ Admin bo'lish uchun",async (ctx) => {
    await doAdmin(ctx)
})
composer.hears("👮‍♂️ Чтобы стать админом",async(ctx) => {
    const user = await User.findOne({
        where:{
            user_id:`${ctx.from.id}`
        }
    })
    const station = await Station.create({
        user_id:ctx.from.id
    })
    await Station.update({
        last_state:"station_name"
    },{
       where:{
        user_id: `${ctx.from.id}`
       } 
    })
    ctx.replyWithHTML("<b> Запись началась !</b>")
    ctx.replyWithHTML(`<b> Введите имя Заправки! </b>`)
})

composer.hears("🆕 Добавить новое заправка",async (ctx)=> {
    const user = await User.findOne({
        where:{
            user_id:`${ctx.from.id}`
        }
    })
    const station = await Station.create({
        user_id:ctx.from.id
    })
    await Station.update({
        last_state:"station_name"
    },{
       where:{
        user_id: `${ctx.from.id}`
       } 
    })
    ctx.replyWithHTML("<b>Введите имя заправка !</b>")
})

composer.hears("🆕 Yangi zapravkani qo'shish",async (ctx) => {
    const user = await User.findOne({
        where:{
            user_id:`${ctx.from.id}`
        }
    })
    const station = await Station.findOne({
        where:{
            user_id:`${ctx.from.id}`
        }
    })
    const station1 = await Station.create({
            user_id:ctx.from.id
        })
    const fuel =  await Fuel.findOne({
        where:{
            user_id:`${ctx.from.id}`
        }
    })
    console.log(station?.dataValues.last_state)
    if(station?.dataValues.last_state == "" || station?.dataValues.last_state == null){
        await Station.update({
        last_state:"station_name"
        },{
       where:{
        user_id: `${ctx.from.id}`
       } 
        }
    )
    ctx.replyWithHTML("<b>Zapravkaning nomini kiriting !</b>")
    } else if(station.dataValues.last_state == "station_name"){
        ctx.replyWithHTML("<b>Zapravkaning nomini kiriting !</b>")
    } else if(station.dataValues.last_state == "branch_name"){
        ctx.replyWithHTML(`<b> Zapravkaning filialini kiriting</b>`)
    } else if(station.dataValues.last_state == "station_address"){
        ctx.replyWithHTML("<b>Stationni addresini kiriting! </b>")
    }else if(station.dataValues.last_state == "location")  {
        await ctx.reply(`Iltimos, <b>"Location yuborish"</b> tugmasini bosing! `, {
            parse_mode: 'HTML',
            ...Markup.keyboard([[Markup.button.locationRequest('📍 Location yuborish'), '🏠 Bosh sahifa']])
              .oneTime()
              .resize(),
        })
    }
    else if(station.dataValues.last_state == "station_type"){
        ctx.replyWithHTML('<b>Zapravka nima sotadi : Petrol,Gas,Diesel</b>')
    } else if(fuel?.dataValues.last_state == "a80"){
        ctx.replyWithHTML(`<b>Benzinning a80 turi narxini kiriting ? Agar bo'lmasa yo'q deb kiriting :</b>`)
    }else if(fuel?.dataValues.last_state == "a91") {
        ctx.replyWithHTML(`<b>Benzinning a91 turi narxini kiriting ! Agar bo'lmasa yo'q deb kiriting !</b>`)
    } else if(fuel?.dataValues.last_state == "a92"){
        ctx.replyWithHTML(`<b>Benzinning a92 turi narxini kiriting ! Agar bo'lmasa yo'q deb kiriting !</b>`)
    }
})



bot.use(composer.middleware())