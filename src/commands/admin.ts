import { Command, Declare, Options } from "seyfert";
import AllowCommand from "./admin/allow";
import ClearDeletedCommand from "./admin/clear-deleted";
import DisallowCommand from "./admin/disallow";

@Declare({
	name: "roles",
	description: "roles command"
})
@Options([AllowCommand, DisallowCommand, ClearDeletedCommand])
export default class RolesCommand extends Command { }