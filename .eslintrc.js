module.exports = {
	// "extends": "eslint:recommended",
	"extends": "plugin:react/recommended",
	"root": true,
	"parser": "babel-eslint",
	// 指定校验的ECMAScript的版本及特性
	"parserOptions": {
		"ecmaVersion": 7,  // ECMAScript版本，7为ES7
		"sourceType": "module",  //默认script，如果代码是ECMAScript模块，设置为module
		"ecmaFeatures": { // 使用额外的语言特性
			"jsx": true,  // 启用JSX
			"experimentalObjectRestSpread":true,
		}
	},
	"plugins": [
		"react",
	],
	// 当访问未定义的变量时，no-undef 规则将发出警告
	// 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
	"env": {
		"browser" : true,
		"node": true,
		"es6": true,
		"commonjs": true
	},
	"rules": {
		"no-console": 0,  //禁止使用console
		"comma-dangle": ["error", "never"], // 要求或禁止末尾逗号：不允许逗号
		"indent": ["error","tab", {"SwitchCase": 1}], //缩进风格
		// "linebreak-style": [  //换行风格
		// 	"error", "windows"
		// ],
		// "quotes": [   //引号类型 `` "" ''
		// 	"warn",
		// 	"single"
		// ],
		"semi": [  //禁止多余的冒号
			"warn",
			"always"
		],
		"react/prop-types": 0,
		"react/no-unescaped-entities": 0,
		"react/jsx-key": 0,
		"react/no-string-refs": 0,
		"react/display-name": 0,
		"react/no-deprecated": 0,
		"no-debugger": "error",//不允许用debugger这个关键字
		"no-dupe-args": "error",//不允许函数参数同名
		"no-caller": "error",//不允许用callee等，es6严格模式不支持
		"no-unmodified-loop-condition": "error",
		"no-with": "error",//不允许用with来声明
		"no-extra-semi": "error",//禁止不必要的分号
	},
	"globals": {  //使用的全局变量
		"window": true,
		"document": true,
		"console": true,
		"React": true,
	}
};