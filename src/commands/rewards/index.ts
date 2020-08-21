import { User } from "../../models/db";
import { TIME_DAY } from "../../utils/enums";
import { html, reply } from "../../utils/messages";

export function dailybox (user: User) {
    if(user.lastClaimedReward && new Date(user.lastClaimedReward.getTime() + TIME_DAY) > new Date()) return 'Ya reclamaste tu premio de hoy! Vuelve mañana!';

    user.lastClaimedReward = new Date();

    const reward = {
        exp: Math.floor(Math.random() * 500),
        points: Math.floor(Math.random() * 5)     
    };

    user.exp += reward.exp;
    user.points += reward.points;
    
    return `
        Gracias por jugar! 🚀
        
        Has ganado:

        🚀 ${reward.points}
        🌟 ${reward.exp}

        Usa /tienda para gastar tu exp y tus puntos!
    `;
}