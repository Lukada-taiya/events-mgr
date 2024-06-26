import 'dotenv/config';
import postgres from "postgres"; 

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql: postgres.Sql<{}> = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: "require",
    connection: {
      options: ENDPOINT_ID,
    },
});

export default sql;