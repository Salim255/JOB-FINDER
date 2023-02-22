/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      contents VARCHAR (240) NOT NULL
      );
      `);
};

console.log("====================================");
console.log("Created users tabel!");
console.log("====================================");
//pool.query("SELECT 1 +1 ;").then((res) => console.log(res));
exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE comments;
      `);
};
