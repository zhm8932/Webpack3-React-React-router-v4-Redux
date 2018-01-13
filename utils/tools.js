
exports.formatDate = function(value, format) {
	if(!value){
		return false
	}
	var t = new Date(value);
	var tf = function (i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (a) {
		switch (a) {
			case 'YYYY':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'DD':
				return tf(t.getDate());
				break;
			case 'hh':
				return tf(t.getHours());
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
		}
	});
}

//html字符转义过滤函数
exports.htmlEncode = function(str) {
	if(typeof str ==="string"&&str!==""){
		return str.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;");
	}else{
		return str
	}
}