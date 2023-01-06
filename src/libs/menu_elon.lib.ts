import { Markup, Context } from 'telegraf'
import { User } from '../models/user.model.js'
import {keyboards} from './keyboard.js'

export async function menu_elon_uzb(ctx: Context) {
    const id = ctx.from?.id
    const user = await User.findOne({
        where:{user_id:`${id}`}
    })
    if(user?.dataValues.is_admin !== true){
        return ctx.reply(`<b>Faqat xos adminlargina zapravka qo'sha olishadi!</b>`,{
            parse_mode:'HTML',
            ...Markup.keyboard([
                ["👮‍♂️ Admin bo'lish uchun"]
            ])
            .oneTime()
            .resize()
        })
    }
    await ctx.reply(`"Yangi e'lonni qo'shish" tugmasini bosing`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ["🆕 Yangi zapravkani qo'shish"],
        ['☸ Tilni tanlash', "👀 Men bergan e'lonlar"],
        ['🏠 Bosh sahifa', "💁 E'lon berish tartibi"],
      ])
        .oneTime()
        .resize(),
    })
}

export async function menu_elon_rus(ctx: Context) {
    const id = ctx.from?.id
    const user = await User.findOne({
        where:{user_id:`${id}`}
    })
    if(user?.dataValues.is_admin !== true){
        return ctx.reply(`<b>Tолько специальные люди добавляют заправку!</b>`,{
            parse_mode:'HTML',
            ...Markup.keyboard([
                ["👮‍♂️ Чтобы стать админом"]
            ])
            .oneTime()
            .resize()
        })
    }
    await ctx.reply('<b>Добавить новое объявление</b> 👇', {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ['🆕 Добавить новое заправка'],
        ['☸ Выбор языка', '👀 Мои заправка'],
        ['🏠 Главная страница', '💁 Рекламная процедура'],
      ])
        .oneTime()
        .resize(),
    })
}

export async function menu_rus(ctx:Context){
    Markup.keyboard(['🏠 Домашняя страница','👀 Мои заправка'])
    .oneTime()
    .resize()
}
export async function menu_uz(ctx:Context){
    Markup.keyboard(['🏠 Bosh sahifa','👀 Men bergan elonlar'])
    .oneTime()
    .resize()
}
  