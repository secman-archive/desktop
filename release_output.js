const powershell = require("powershell");
const shell = require("shelljs");
const os = require("os");
const version = require("./package.json").version;

const cmd = `echo ${version} >> version`;

if (os.platform === "win32") {
	let ps = new powershell(cmd);

	ps.on("output", data => {
		console.log(data);
	});
} else {
	shell.exec(cmd);
}
