<template>
	<view class="page">
		<u-form :model="form" ref="uForm">
			<u-form-item label="会议日期:" label-width="auto" prop="time">
				<u-input @click="show = true" v-model="form.time" placeholder="请选择会议日期" type="select" />
				<u-calendar v-model="show" @change='change'></u-calendar>
			</u-form-item>
			<u-form-item label="项目名称:" label-width="auto">
				<u-input disable v-model="form.systemName" />
			</u-form-item>
			<u-form-item label="负责人:" label-width="auto" type="select">
				<u-input disable v-model="form.chargePerson" />
			</u-form-item>
			<u-form-item label-position="left" label-width="auto" label="会议内容：" prop="intro">
				<u-input type="textarea" :border="border" placeholder="请填写会议内容" v-model="form.intro" />
				<u-select v-model="show" :list="list"></u-select>
			</u-form-item>


		</u-form>
		<u-button class="bottom-btn" type='primary' @click="submitBorrow()">添加记录</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {AddConference} from '../../api/api.js'
	export default {
		data() {
			return {
				form: {
					AID:'',
					intro: '',
					time: '',
					systemName:'',
					chargePerson:'',
				},
				book: null,
				show: false,
				mode: 'date',
				radio: '',
				switchVal: false,
				show: false,
				list: [{
						value: '1',
						label: '林'
					},
					{
						value: '2',
						label: '黄'
					}
				],
				/* rules: {
					user: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					phone: [{
						required: true,
						message: '请输入联系方式',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					time: [{
						required: true,
						message: '请选择借阅周期',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
				} */
			};
		},
		created() {
			// 调用获取当前日期的方法加四位随机数  赋值表单中的项目编号
			this.form.AID = this.getProjectNum() + Math.floor(Math.random() *
				1000000) // 如果是6位或者8位随机数，相应的 *1000000或者 *100000000就行了
		},
		methods: {
			// 获取当前日期的方法
			getProjectNum() {
				const projectTime = new Date() // 当前中国标准时间
				const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
				const Month = projectTime.getMonth() + 1 // 获取中国区月份
				const Day = projectTime.getDate() // 获取几号
				var CurrentDate = String(Year)
				if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
					CurrentDate += Month
				} else {
					CurrentDate += '0' + Month
				}
				if (Day >= 10) {
					CurrentDate += Day
				} else {
					CurrentDate += '0' + Day
				}
				return CurrentDate
			},
			addConference(){
				let that = this
				let data = {
					AID:that.form.AID,
					ConferenceDate:that.form.time,
					SystemName:that.form.systemName,
					ChargePerson:that.form.chargePerson,
					ConferenceContent:that.form.intro,
				}
				AddConference(data).then(res =>{
					
				})
			}
		}

	}
</script>

<style lang="scss">
	.page {
		padding: 20rpx;

		.bottom-btn {
			position: absolute;
			bottom: 10vh;
			width: 90%;
			margin-left: 2.5%;
		}
	}
</style>
