"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actor_1 = require("bdsx/bds/actor");
const command_1 = require("bdsx/command");
/**
 * Entity for spawning an entity
 */
command_1.command.register("summon-entity", "summon an entity on current position").overload((params, origin, output) => {
    const caller = origin.getEntity();
    if (!(caller === null || caller === void 0 ? void 0 : caller.isPlayer()))
        return;
    const level = caller.getLevel();
    const identifier = actor_1.ActorDefinitionIdentifier.constructWith(params.type);
    const entity = actor_1.Actor.summonAt(caller.getRegion(), caller.getFeetPos(), identifier, level.getNewUniqueID());
    identifier.destruct();
    if (entity === null) {
        output.error("Can't spawn the entity");
        return;
    }
    output.success("Summoned an entity: §e" + params.type);
}, {
    type: command_1.command.rawEnum("EntityType"),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQWtFO0FBQ2xFLDBDQUF1QztBQUV2Qzs7R0FFRztBQUNILGlCQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxzQ0FBc0MsQ0FBQyxDQUFDLFFBQVEsQ0FDOUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQyxJQUFJLENBQUMsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSxFQUFFLENBQUE7UUFBRSxPQUFPO0lBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxNQUFNLFVBQVUsR0FBRyxpQ0FBeUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQWMsQ0FBQyxDQUFDO0lBQ2xGLE1BQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDM0csVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdkMsT0FBTztLQUNWO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0QsQ0FBQyxFQUNEO0lBQ0ksSUFBSSxFQUFFLGlCQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztDQUN0QyxDQUNKLENBQUMifQ==