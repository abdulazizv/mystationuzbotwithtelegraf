import { Context } from "vm";
import { User } from "../models/user.model.js";
import {Markup} from 'telegraf'

export async function doAdmin(ctx:Context) {
    await User.update({
        is_admin:true
    },{
        where:{
            user_id:`${ctx.from.id}`
        }
    })
    const user = await User.findOne({
        where:{
            user_id:`${ctx.from.id}`
        }
    })
    if(user?.dataValues.user_lang == 'UZB') {
    await ctx.reply(`<b>Bosh sahifa!</b>`, {
        parse_mode: 'HTML',
        ...Markup.keyboard([["🔍 E'lonlarni ko'rish", "⛽️ Zapravka qo'shish"]])
          .oneTime()
          .resize(),
      })
    }else {
        await ctx.reply('<b>Добавить новое объявление</b> 👇', {
            parse_mode: 'HTML',
            ...Markup.keyboard([
              ['🆕 Добавить новое объявление'],
              ['☸ Выбор языка', 'Мои объявления'],
              ['🏠 Главная страница', '💁 Рекламная процедура'],
            ])
              .oneTime()
              .resize(),
          })
    }
}