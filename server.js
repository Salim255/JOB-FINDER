const express = require("express");
//We use pg to creat a connection over pool tool sever
const pg = require("pg");

//We use pool to run a query
/* const pool = new pg.Pool({
  host: "localhost",
  port: 4321,
  database: "postgres",
  user: "postgres",
  password: "123456",
}) */
const pool = new pg.Pool({
  host: "db",
  database: "postgres",
  user: "postgres", //The same username
  password: "123456", //
});

//To test if the connection is stablished
//pool.query("SELECT 1 +1 ;").then((res) => console.log(res));
const app = express();

//I'm going to wire up one middleware to use with the express application that is going to allow us to
//receive form submissions from a browser
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Hell world");
});

app.get("/posts", async (req, res) => {
  const { rows } = await pool.query(`
    SELECT * FROM posts ;
     `);

  res.send(`
     <table>
     <thead>
     <tr>
       <th>id</th>
       <th>lng</th>
       <th>lat</th>
     </tr>
     </thead>
     <tbody>
     ${rows
       .map((row) => {
         return `
        <tr>
        <td>${row.id}</td>
        <td>${row.loc.x}</td>
        <td>${row.loc.y}</td>
        
        </tr>
        `;
       })
       .join("")}
     </tbody>
     </table>
     <form method="POST">
      <h3> Create Post</h3>
      <div>
       <label>lng</label>
       <input name="lng" />
      </div>
      <div>
      <label>lat</label>
      <input name="lat" />
     </div>

     <button type="submit">Create</button>
     </form>
    `);
});

app.post("/posts", async (req, res) => {
  const { lng, lat } = req.body;
  await pool.query("INSERT INTO posts ( loc) VALUES ($1);", [
    `(${lng}, ${lat})`,
  ]);

  res.redirect("/posts");
});
app.listen(5004, () => {
  console.log("====================================");
  console.log("Listening on  port 5004");
  console.log("====================================");
});
