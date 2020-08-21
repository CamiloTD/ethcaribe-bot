import { User, UserModel } from "../../models/db";
import { AUTH_ADMIN, AUTH_SUPEROWNER } from "../../utils/enums";
import { reply } from "../../utils/messages";
import { updateUserPoints, ExpContract, PointsContract } from "../../modules/web3";

export async function processmint (currentUser: User) {
    if(currentUser.auth < AUTH_SUPEROWNER) throw "UNAUTHORIZED";

    reply(currentUser.id, "Fetching db info...");
    const users = await UserModel.find({ address: { $ne: null } });
    
    let count = 0;
    for(const user of users) {
        const addedPoints = await updateUserPoints(PointsContract, user.address, user.points);
        const addedEXP = await updateUserPoints(ExpContract, user.address, user.exp);

        reply(currentUser.id, `<b>(${++count}/${users.length}) - ${user.name} (${user.address}):</b> ${user.points} (${addedPoints < 0? addedPoints : "+" + addedPoints}) 🚀  ${user.exp} (${addedEXP < 0? addedEXP : "+" + addedEXP})🌟`);
    }

    return "All points has been updated.";
}