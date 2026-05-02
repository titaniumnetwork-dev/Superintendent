import { Command, Declare, Options } from "seyfert";
import AllowCommand from "./admin/allow";
import ClearDeletedCommand from "./admin/clear-deleted";
import DisallowCommand from "./admin/disallow";

@Declare({
	name: "admin",
	description: "admin command"
})
@Options([AllowCommand, DisallowCommand, ClearDeletedCommand])
export default class AdminCommand extends Command { }