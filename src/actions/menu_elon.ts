import { User } from "../models/user.model.js";
import {bot} from '../core/bot.js'
import {Composer, Markup} from 'telegraf'
import { menu_elon_uzb,menu_elon_rus } from "../libs/menu_elon.lib.js";
const composer = new Composer()

composer.hears("⛽️ Zapravka qo'shish",async (ctx) => {
    const user_id = ctx.from.id
    await User.findOne({where:{user_id:`${user_id}`}}).then(async (user) => {
        if (!user) {
            await ctx.reply(`Botga "/start" tugmasi orqali qayta kiring`)
        } else {
            if (user.dataValues.phone_number == '' || user.dataValues.phone_number == null) {
              await ctx.reply(`Iltimos, <b>"Telefon raqamni yuborish"</b> tugmasini bosing! 👇`, {
                parse_mode: 'HTML',
                ...Markup.keyboard([[Markup.button.contactRequest('📱 Telefon raqamni yuborish'), '🏠 Bosh sahifa']])
                  .oneTime()
                  .resize(),
              })
            } else {
              menu_elon_uzb(ctx)
            }
          }
    })
})


composer.hears("⛽️ Добавить заправка",async (ctx)=>{
    const user_id = ctx.from.id
    await User.findOne({where:{ user_id:`${user_id}` }}).then(async (user) => {
        if (!user) {
            await ctx.reply(`Повторно войти в бот через "/start"`)
          } else {
            if (user.dataValues.phone_number == '' || user.dataValues.phone_number == null) {
              await ctx.reply(`Нажмите кнопку <b>Отправить номер телефона</b> 👇`, {
                parse_mode: 'HTML',
                ...Markup.keyboard([[Markup.button.contactRequest('📱 Отправить номер телефона'), '🏠 Главная страница']])
                  .oneTime()
                  .resize(),
              })
            } else {
              menu_elon_rus(ctx)
            }
          }
    })
})

composer.hears("🔍 Посмотреть топливо",async (ctx) => {
    await ctx.reply(`<b>Выберите один из следующих</b> 👇`, {
        parse_mode: 'HTML',
        ...Markup.keyboard([['⛽️ Газ', '⛽️ Бензин']])
          .oneTime()
          .resize(),
      })
})

composer.hears("🔍 E'lonlarni ko'rish",async (ctx) => {
    await ctx.reply(`<b>Quyidagilardan birini tanlang 👇</b>`,{
        parse_mode:'HTML',
        ...Markup.keyboard([['⛽️ Gaz', '⛽️ Benzin']])
    })
})

bot.use(composer.middleware())