namespace org {

    export namespace bukkit {
        export namespace entity {
            export interface HumanEntity {

            }
        }
        export namespace event {
            export namespace inventory {
                export enum InventoryType {
                    ANVIL,
                    BARREL,
                    BEACON,
                    BLAST_FURNACE,
                    BREWING,
                    CARTOGRAPHY,
                    CHEST,
                    CRAFTING,
                    CREATIVE,
                    DISPENSER,
                    DROPPER,
                    ENCHANTING,
                    ENDER_CHEST,
                    FURNACE,
                    GRINDSTONE,
                    HOPPER,
                    LECTERN,
                    LOOM,
                    MERCHANT,
                    PLAYER,
                    SHULKER_BOX,
                    SMITHING,
                    SMOKER,
                    STONECUTTER,
                    WORKBENCH
                }
            }
        }
        export namespace inventory {
            export class CookingRecipe<T> implements org.bukkit.inventory.Recipe {
                getCookingTime() : number {
                    return;
                }
                getExperience() : number {
                    return;
                }
                getGroup() : string {
                    return;
                }
                getInput() : org.bukkit.inventory.ItemStack {
                    return;
                }
                getKey() : org.bukkit.NamespacedKey {
                    return;
                }
                getResult() : org.bukkit.inventory.ItemStack {
                    return;
                }
                setCookingTime(cookingTime: number) : void {}
                setExperience(experience: number) : void {}
                setGroup(group: string) : void {}
                setInput(input: org.bukkit.Material) : org.bukkit.inventory.CookingRecipe<T> {
                    return;
                }

            }
            export class BlastingRecipe extends org.bukkit.inventory.CookingRecipe<BlastingRecipe> {
                constructor(key: org.bukkit.NamespacedKey, result: org.bukkit.inventory.ItemStack, source: org.bukkit.Material,experience: number, cookingTime: number) {
                    super();
                }
            }
            export class CampfireRecipe extends org.bukkit.inventory.CookingRecipe<CampfireRecipe> {
                constructor(key: org.bukkit.NamespacedKey, result: org.bukkit.inventory.ItemStack, source: org.bukkit.Material,experience: number, cookingTime: number) {
                    super();
                }
            }
            export class FurnaceRecipe extends org.bukkit.inventory.CookingRecipe<FurnaceRecipe> {
                constructor(key: org.bukkit.NamespacedKey, result: org.bukkit.inventory.ItemStack, source: org.bukkit.Material,experience: number, cookingTime: number) {
                    super();
                }

                setInput(input: org.bukkit.Material) : org.bukkit.inventory.FurnaceRecipe {
                    return;
                }
            }
            export abstract class InventoryView {
                static OUTSIDE: number = -999;
                close() : void {}
                convertSlot : number;
                abstract getBottomInventory() : org.bukkit.inventory.Inventory;
                getCursor() : org.bukkit.inventory.ItemStack {
                    return;
                }
                getInventory(rawSlot: number) : org.bukkit.inventory.Inventory {
                    return;
                }
                getItem() : org.bukkit.inventory.ItemStack {
                    return;
                }
                abstract getPlayer() : org.bukkit.entity.HumanEntity;
                 /** Return value for this method is not possible with TS, please see the bukkit javadocs */
                getSlotType() : any {
                    return;
                }
                abstract getTitle() : String;
                abstract getTopInventory() : org.bukkit.inventory.Inventory;
                abstract getType() : org.bukkit.event.inventory.InventoryType;
                setCursor(item: org.bukkit.inventory.ItemStack) : void {}
                setItem(slot: number, item: org.bukkit.inventory.ItemStack) : void {}
                /** Parameters for this method are not possible with TS, please see the bukkit javadocs */
                setProperty() : boolean {
                    return;
                }

            }
            export enum EquipmentSlot {
                CHEST,
                FEET,
                HAND,
                HEAD,
                LEGS,
                OFF_HAND
            }
            export enum ItemFlag {
                HIDE_ATTRIBUTES,
                HIDE_DESTROYS,
                HIDE_DYE,
                HIDE_ENCHANTS,
                HIDE_PLACED_ON,
                HIDE_POTION_EFFECTS,
                HIDE_UNBREAKABLE
            }

            export interface Inventory {

            }

            export enum MainHand {
                LEFT,
                RIGHT
            }
            export class ShapelessRecipe implements org.bukkit.inventory.Recipe {

                constructor(key: org.bukkit.NamespacedKey, result: org.bukkit.inventory.ItemStack) {}

                addIngredient(count: number,ingredient: org.bukkit.Material) : org.bukkit.inventory.ShapelessRecipe;
                addIngredient(ingredient: org.bukkit.Material) : org.bukkit.inventory.Recipe;
                /** @deprecated */
                addIngredient(count: number,ingredient: org.bukkit.Material,rawdata: number) : org.bukkit.inventory.ShapelessRecipe;             
                /** @deprecated */
                addIngredient(ingredient: org.bukkit.Material,rawdata: number) : org.bukkit.inventory.ShapelessRecipe;             
                addIngredient() : any {
                    return;
                }
                getGroup () : string {
                    return;
                }
                getInredientList() : java.util.List<org.bukkit.inventory.ItemStack> {
                    return;
                }
                getKey() : org.bukkit.NamespacedKey {
                    return;
                }
                getResult() : org.bukkit.inventory.ItemStack {
                    return;
                }
                removeIngredient(count: number, ingredient: org.bukkit.Material) : org.bukkit.inventory.ShapelessRecipe;
                removeIngredient(ingredient: org.bukkit.Material) : org.bukkit.inventory.ShapelessRecipe;
                /** @deprecated */   
                removeIngredient(ingredient: org.bukkit.Material, rawdata: number) : org.bukkit.inventory.ShapelessRecipe;
                removeIngredient() : any {
                    return;
                }
                setGroup(group: string) : void {}
            }

            export class ItemStack {
                constructor(stack: org.bukkit.inventory.ItemStack);
                constructor(type: org.bukkit.Material);
                constructor(type: org.bukkit.Material, amount: number);
                constructor() {

                }
            }

            export interface Recipe {
                getResult() : org.bukkit.inventory.ItemStack;
            }
        }

        export namespace material {
            /** @deprecated all usage of MaterialData is deprecated and subject to removal. Use BlockData. */
            export class MaterialData {}
        }

        export enum Material {
            // List is incomplete for now
            ACACIA_BOAT,
            ACACIA_BUTTON,	
            ACACIA_DOOR,	
            ACACIA_FENCE,	
            ACACIA_FENCE_GATE,	
            ACACIA_LEAVES,
            ACACIA_LOG,
            ACACIA_PLANKS,	 
            ACACIA_SAPLING,	
            ACACIA_SIGN,	
            ACACIA_SLAB,	
            ACACIA_STAIRS,	
            ACACIA_TRAPDOOR,	
            ACACIA_WALL_SIGN
        }

        export class NamespacedKey {

        }
    }
}



// ** JAVA TYPES (That I need)

namespace java {
    export class test {

    }
    export namespace util {
        export interface List<T> {
            toArray() : Array<T>;
        }
    }
}

