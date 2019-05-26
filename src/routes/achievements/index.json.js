import fs from "fs"

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const list = fs.readFileSync(process.cwd() + '/src/routes/achievements/_list.json');

  res.end(list);
}