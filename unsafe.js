import { exec } from "child_process";
import http from "http";

http.createServer((req, res) => {
  const userCmd = new URL(req.url, "http://localhost").searchParams.get("cmd");

  // ▼ CodeQL の js-shell-command-constructed-from-input クエリが検出
  exec(`ls ${userCmd}`, (err, stdout) => {
    res.end(stdout);
  });

}).listen(3000);

// もう一つ: js-unsafe-code-construction
export function unsafeDeserialize(value) {
  // eval に外部入力
  return eval(`(${value})`);
}


