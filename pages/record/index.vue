<template>
	<view class="content">
		<u-loading-page :loading="loading" loading-text="加载中..."></u-loading-page>
		<image class="logo" src="../../static/aea28613546fe611a2aa4789b94a0584.jpeg"></image>
		<view class="logo_font">历史记录</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="item._id" @click="openDetail(item._id)">
				<view>
					<view class="yuan"></view>
					<view class="line"></view>
				</view>
				<view class="item_txt">
					<view class="yuan2">
						<image src="../../static/tabbar/会议纪要 (2).png" style="width: 55rpx;height: 55rpx;margin-top: 17rpx;"></image>
					</view>
					<view class="txt">
						<view style="display: flex;flex-direction: column;">
							<view style="font-size: 18px;font-weight: 600;height: 40rpx;font-family: Adobe Heiti Std R;margin: 10rpx 0rpx 7rpx 0rpx;">{{item.name}}</view>
							<view style="height: 40rpx;">{{item.date}}</view>
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading:true,
			};
		},
		mounted() {
			this.getList()
		},
		methods: {
			// 表单提交函数
			async getList() {
				let result = await uniCloud.callFunction({
					name: 'getmeetlist',
					/* data: this.meetform */
				})
				this.list = result.result.data
				this.loading = false
			},
			openDetail(id) {
				// 跳转页面
				this.$u.route({
					url: '/pages/detail/index',
					params: {
						id: id,
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.content {
		.logo{
			width: 100%;
			height: 446rpx;
			/* background: #1B46B8; */
			/* opacity: 0.45; */
		}
		.logo_font{
			color: #e3e3e3;
			position: absolute;
			top: 100rpx;
			left: 40rpx;
			font-size: 35px;
			font-weight: 600;
			font-family: Adobe Heiti Std R;
		}
		.list {
			position: absolute;
			top: 400rpx;
			height: 80vh;
			width: 99%;
			margin-left: 0.5%;
			overflow: auto;
			border-top-left-radius: 30px;
			border-top-right-radius: 30px;
			background-color: #fff;
			padding-top: 60rpx;
			padding-left: 40rpx;
			.item {
				display: flex;
				position: relative;
				margin-bottom: 20rpx;
				.yuan{
					width: 32rpx;
					height: 32rpx;
					border: 6px solid #4C8CFF;
					border-radius: 50%;
					position: absolute;
					top: 40rpx;
					/* margin-top: 40rpx; */
				}
				.yuan2{
					width: 88rpx;
					height: 88rpx;
					text-align: center;
					line-height: 88rpx;
					background: linear-gradient(0deg, #4A89FF 0%, #66A8FF 100%);
					box-shadow: 0px 5rpx 10rpx 0px rgba(77,141,255,0.5);
					border-radius: 50%;
				}
				.line{
					width: 2rpx;
					height: 140rpx;
					background: #4C8CFF;
					margin-left: 15rpx;
					opacity: 0.3;
					position: absolute;
					top: 20rpx;
				}
				.item_txt{
					display: flex;
					width: 577rpx;
					height: 118rpx;

					background: #FFFFFF;
					box-shadow: 0px 10rpx 15rpx 0px rgba(215,215,215,0.4);
					border-radius: 16rpx;
					margin-left: 40rpx;
					padding: 10rpx 10rpx 0 20rpx;
					.txt{
						display: flex;
						justify-content: space-between;
						height: 100rpx;
						
						width: 400rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
