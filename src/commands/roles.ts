import { Command, Declare, Options } from "seyfert";
import GrantCommand from "./roles/grant";
import ListCommand from "./roles/list";
import RevokeCommand from "./roles/revoke";

@Declare({
	name: "roles",
	description: "roles command"
})
@Options([GrantCommand, RevokeCommand, ListCommand])
export default class RolesCommand extends Command { }