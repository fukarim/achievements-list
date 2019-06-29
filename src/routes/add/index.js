import fs from "fs";

export function post(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const body = req.body;

  res.end({body, success: true});
}
