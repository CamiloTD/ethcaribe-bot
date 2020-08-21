import { getModelForClass } from "@typegoose/typegoose";

/**
 * 
 * Shop will be divided into 3 parts
 *   
 *   - Show global progress and next goal (More goals imply that people will need to sum xp as much as they can)
 * 
 */
export class Shop {
    
}

export class ShopItemTypes {
    
}

export const ShopModel = getModelForClass(Shop);