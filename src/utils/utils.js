/* eslint-disable no-undef */
/* eslint-disable no-console */
/*
 * @Description: 无
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-11-18 10:32:03
 * @LastEditors: hammercui
 * @LastEditTime: 2019-12-11 10:52:18
 */

export function baseImgUrl() {
	return process.env.VUE_APP_BASE_IMG_URL + process.env.VUE_APP_BASE_URL + '/img/';
}
//根据type和name返回图片路径
export function getAppGiftUrl(type, name) {
	switch (type) {
		case 1: //头像框
			return `http://img.53site.com/Werewolf/frame/${name}_player.png`;
		case 2: //称号
			return `http://img.53site.com/Werewolf/tag/tag_${name}.png`;
		case 3: //礼物
			return `http://img.53site.com/Werewolf/giftPack/gift_${name}.png`;
		case 4: //道具
			return `http://img.53site.com/Werewolf/pack/${name}.png`;
		case 5: //特效 麦克风 聊天背景 聊天气泡
			return `http://img.53site.com/Werewolf/hallwebp/animation_icon_${name}.png`;
		case 6: //活动道具
			return `${baseImgUrl()}${name}.png`;
		case 7: //天狼秀
			return `http://img.53site.com/werewolf/Resource/${name}.png`;
		case 8: // 活跃币 union_coinold 兑换币 box_coin
			return `http://img.53site.com/werewolf/group/resource/${name}.png`;
		default:
			break;
	}
}

export function imgUrl(name, type = 'png') {
	return `${baseImgUrl() + name + '.' + type}`;
}

export function getParam(param) {
	let query = window.location.search;
	let iLen = param.length;
	let iStart = query.indexOf(param);
	if (iStart == -1) return '';
	iStart += iLen + 1;
	let iEnd = query.indexOf('&', iStart);
	if (iEnd == -1) {
		return query.substring(iStart);
	}
	return query.substring(iStart, iEnd);
}

export function getNumFormat(num) {
	let str = '';
	let point = '';
	if (Number(num) > 9999) {
		if (Number(num) > 99999999) {
			if (num % 100000000) {
				str = num / 100000000 + '亿';
				str = str.substring(0, 4) + '亿';
			} else {
				str = String(num / 100000000);
				str = str.substring(0, 4);
				point = str.substr(str.length - 1, 1);
				while (str.length > 1 && (point === '.' || point === '0')) {
					str = str.substring(0, str.length - 1);
					if (point === '.') {
						break;
					}
					point = str.substr(str.length - 1, 1);
				}
				str = str + '亿';
			}
			return str;
		} else {
			if (num % 10000 == 0) {
				str = num / 10000 + '万';
			} else {
				str = String(num / 10000);
				str = str.substring(0, 4);
				point = str.substr(str.length - 1, 1);
				while (str.length > 1 && (point === '.' || point === '0')) {
					str = str.substring(0, str.length - 1);
					if (point === '.') {
						break;
					}
					point = str.substr(str.length - 1, 1);
				}
				str = str + '万';
			}
			return str;
		}
	}
	return num;
}

export function isUrl(url) {
	const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/).+$/;
	if (!reg.test(url)) {
		return false;
	} else {
		return true;
	}
}

export function TurnToPage(type, url) {
	//type = 10;url = '';充值界面
	let message = `{"type":${type},"url":"${url}"}`;
	if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
		//判断iPhone|iPad|iPod|iOS
		window.webkit.messageHandlers.TurnToPage.postMessage(message);
	} else if (/(Android)/i.test(navigator.userAgent)) {
		//判断Android
		wx.TurnToPage(message);
	} else {
		console.log(message);
	}
}
export function showToast(data) {
	if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
		//判断iPhone|iPad|iPod|iOS
		window.webkit.messageHandlers.PopToast.postMessage(data);
	} else if (/(Android)/i.test(navigator.userAgent)) {
		//判断Android
		wx.PopToast(data);
	} else {
		console.log(data);
	}
}
export function receiveShow(data) {
	var message = JSON.stringify(data);
	if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
		//判断iPhone|iPad|iPod|iOS
		window.webkit.messageHandlers.PopReceive.postMessage(message);
	} else if (/(Android)/i.test(navigator.userAgent)) {
		//判断Android
		wx.PopReceive(message);
	} else {
		console.log(message);
	}
}
export function hideAppCloseBtn() {
	if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
		//判断iPhone|iPad|iPod|iOS
		window.webkit.messageHandlers.hideCloseBtn.postMessage('hideCloseBtn');
	} else if (/(Android)/i.test(navigator.userAgent)) {
		//判断Android
		wx.hideCloseBtn();
	} else {
		console.log(message);
	}
}
export function showAppCloseBtn() {
	if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
		//判断iPhone|iPad|iPod|iOS
		window.webkit.messageHandlers.showCloseBtn.postMessage('showCloseBtn');
	} else if (/(Android)/i.test(navigator.userAgent)) {
		//判断Android
		wx.showCloseBtn();
	} else {
		console.log(message);
	}
}
//获取屏幕可视区域宽，高
export function getVisualHeightOfTheScreen() {
	return [ document.documentElement.clientWidth, document.documentElement.clientHeight ];
}
