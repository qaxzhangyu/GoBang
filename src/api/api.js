import { request } from '../utils/request';
//eg:基础信息
let ATV_NAME_TEMP = '/api/';
export async function featchRegister(params) {
	return request(`${ATV_NAME_TEMP}gobang/featchRegister`, {
		method: 'POST',
		body: params
	});
}
export async function featchSignin(params) {
	return request(`${ATV_NAME_TEMP}gobang/featchSignin`, {
		method: 'POST',
		body: params
	});
}