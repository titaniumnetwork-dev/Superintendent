import { Client } from "seyfert";

const client = new Client();

await client.uploadCommands({ cachePath: './commands.json' });
await client.start();