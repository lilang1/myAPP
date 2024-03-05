import {baseURL} from '@/api/config.js'
export const request = (options = {}) => {
	return new Promise((resolve, rejects) => {
		uni.request({
			url: baseURL + options.url,
			method: options.method,
			data: options.data,
			header: {
				Authorization: 'Bearer ' + uni.getStorageSync('token')
			},
			success: (response) => {
				return resolve(response.data)
			},
			fail: (fail) => {
				return rejects(fail)
			},
		})
	})



}
