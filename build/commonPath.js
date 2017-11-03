/**
 * Created by haiming.zeng on 2017/9/18.
 */
const path = require('path');
const ROOT = path.resolve(__dirname,'..');
const SRC_PATH = path.join(ROOT,'src');
const PUBLIC_PATH = path.join(ROOT,'public');
const PORT = process.env.PORT||'4008'
const publicPath = `http://localhost:${PORT}/`;

module.exports = {
	ROOT,
	SRC_PATH,
	PUBLIC_PATH,
	publicPath,
	PORT
}