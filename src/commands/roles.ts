import { Command, Declare, Options } from "seyfert";
import AllowCommand from "./roles/allow";
import ClearDeletedCommand from "./roles/clear-deleted";
import DisallowCommand from "./roles/disallow";
import GrantCommand from "./roles/grant";
import ListCommand from "./roles/list";
import RevokeCommand from "./roles/revoke";

@Declare({
	name: "roles",
	description: "roles command"
})
	@Options([AllowCommand, DisallowCommand, GrantCommand, RevokeCommand, ListCommand, ClearDeletedCommand])
export default class RolesCommand extends Command { }