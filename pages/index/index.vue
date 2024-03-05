<template>
	<view class="content">
		<image class="logo" src="/static/jindiantong.jpg"></image>
		<view class="main">

			<scroll-view class="left" scroll-y>
				<view class="date" @click="checkDate" :class="{ 'active':isActive == true }">
					2024-02-07
				</view>

				<view class="bottom-btn" @click="toAdd(null)">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/tabbar/新增(1).png"></image>
					<text style="margin-left: 10rpx;">新增纪要</text>
				</view>
			</scroll-view>
			<view class="right">
				<view>
					<u-button  type='primary' @click="toAdd(date)">添加记录</u-button>
				</view>
				<view style="margin-top: 20rpx;">
					<u-button  type='primary' @click="toDetail()">查看记录</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				isActive: false,
				date:null,
			}
		},
		onLoad() {

		},
		methods: {
			checkDate() {
				this.isActive = !this.isActive
			},
			toAdd(){
				this.$u.route({
					url: 'pages/add/index(1)',					
				})
			},
			toDetail(){
				this.$u.route({
					url: 'pages/detail/index(1)',					
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 30vh;
		width: 100%;
		/* margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx; */
	}

	.main {
		display: flex;
		width: 100%;

		.left {
			width: 30%;
			/* padding-top: 20rpx; */
			background-color: #b7b7bc;
			height: 60vh;
			position: relative;

			.date {
				width: 100%;
				line-height: 80rpx;
				text-align: center;
				margin-bottom: 0rpx;
			}
			.active {
				color: #2177c7;
				background-color: #fff;
			}

			.clickdate {
				color: #2177c7;
				background-color: #fff;
			}

			.bottom-btn {
				position: fixed;
				bottom: 5vh;
				width: 100%;
				height: 50rpx;
				display: flex;
				align-items: center;
				width: 100%;
				padding-left: 20rpx;
				color: #2177c7;
				/* background-color: #fff; */
			}
		}

		.right {
			width: 70%;
			padding: 20rpx;
			height: 65vh;
		}
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
