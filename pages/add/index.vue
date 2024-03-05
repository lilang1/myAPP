<template>
	<view class="content">
		<view class="title">会议纪要</view>
		<view class="box">
			<view class="flex-box">
				<view class="small-title">会议名称</view>
				<view><input style="height: 100%;margin-left: 10rpx;" v-model="meetform.name"></input></view>
			</view>
			<view class="flex-box">
				<view class="small-title">会议日期</view>
				<view><input style="height: 100%;margin-left: 10rpx;width: 300rpx;" v-model="meetform.date"></input>
				</view>
				<view class="small-title-1">会议时间</view>
				<view><input style="height: 100%;margin-left: 10rpx;width: 100rpx;" v-model="meetform.time"></input>
				</view>
			</view>
			<view class="flex-box">
				<view class="small-title">会议地点</view>
				<view><input style="height: 100%;margin-left: 10rpx;width: 100rpx;" v-model="meetform.address"></input>
				</view>
			</view>
			<view class="flex-box">
				<view class="small-title">主持人</view>
				<view><input style="height: 100%;margin-left: 10rpx;width: 300rpx" v-model="meetform.compere"></input>
				</view>

				<view class="small-title-1">记录人</view>
				<view><input style="height: 100%;margin-left: 10rpx;width: 100rpx;" v-model="meetform.recorder"></input>
				</view>
			</view>
			<view class="flex-box-1">
				与会人员
			</view>
			<view class="flex-box">
				<view class="small-title">技术部</view><textarea style="height: 100rpx;" v-model="meetform.js"></textarea>
			</view>
			<view class="flex-box">
				<view class="small-title">市场部</view><textarea style="height: 70rpx;" v-model="meetform.sc"></textarea>
			</view>
			<view class="flex-box-1">
				缺席人员
			</view>
			<view class="flex-box">
				<textarea style="height: 70rpx;" v-model="meetform.absent"></textarea>
			</view>
			<view class="flex-box-3">
				<view style="width: 100%;">
					<view class="long-title"><text class="txt">会议内容:</text></view>
					<view class="edit">
						<!-- <piaoyiEditor :values="meetform.contnet" :maxlength="300" @changes="saveContens"
							:readOnly="readOnly" :photoUrl="photoUrl" :api="api" :name="name" /> -->
						<view class="editor_toolbox">
							<view style="display: flex;">
								<i class="iconfont icon-undo" data-method="undo" @tap="edit" />
								<i class="iconfont icon-redo" data-method="redo" @tap="edit" />
								<!-- 								<i class="iconfont icon-img" data-method="insertImg" @tap="edit" />
								<i class="iconfont icon-video" data-method="insertVideo" @tap="edit" /> -->
								<!-- 								<i class="iconfont icon-link" data-method="insertLink" @tap="edit" /> -->
								<i class="iconfont icon-text" data-method="insertText" @tap="edit" />
								<i class="iconfont icon-line" data-method="insertHtml"
									data-param="<hr style='margin:10px 0'/>" @tap="edit" />
								<i class="iconfont icon-heading" @tap="insertHead" />
							</view>
							<!-- <view style="display: flex;">
									<i class="iconfont icon-quote" data-method="insertHtml"
										data-param="<blockquote style='padding:0 1em;color:#6a737d;border-left:.25em solid #dfe2e5'>引用</blockquote>"
										@tap="edit" />
									<i class="iconfont icon-table" @tap="insertTable" />
									<i class="iconfont icon-code" @tap="insertCode" />
									<i class="iconfont icon-emoji" data-type="emoji" @tap="openDialog" />
									<i class="iconfont icon-template" data-type="template" @tap="openDialog" />
									<i class="iconfont icon-clear" @tap="clear" />
									<i class="iconfont icon-load" @tap="load" />
									<i :class="'iconfont icon-'+(editable?'save':'edit')" @tap="save" />
								</view> -->
						</view>
						<mp-html ref="article" container-style="padding:70px 10rpx 10rpx 10rpx;"
							:content="meetform.contnet" domain="https://mp-html.oss-cn-hangzhou.aliyuncs.com"
							:tag-style="tagStyle" :editable="true" @remove="remove" />
					</view>
				</view>


			</view>
			<view class="flex-box-5">
				<view class="small-title">备注:</view>
				<view><textarea style="height: 100%;margin-left: 10rpx;" v-model="meetform.remark"></textarea></view>
			</view>
		</view>
		<view style="position: absolute;bottom: 0;left: 40%;">
			<u-button type="primary" @click="formSubmit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import mpHtml from '@/pages/component/mp-html/mp-html'
	export default {
		data() {
			return {
				readOnly: false, //是否只读
				photoUrl: 'http://test.com', //服务器图片域名或者ip
				api: '/upload', //上传图片接口地址
				txt: '',
				name: 'file',
				values: '',
				// 预设的标签样式
				tagStyle: {
					table: 'box-sizing:border-box;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5',
					th: 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
					td: 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
					li: 'margin:5px 0'
				},
				meetform: {
					name: '',
					date: '',
					time: '',
					address: '',
					compere: '',
					recorder: '',
					js: '',
					sc: '',
					absent: '',
					contnet: '',
					remark: '',
				}
			};
		},
		components: {
			mpHtml
		},
		methods: {
			// 调用编辑器接口
			edit(e) {
				this.checkEditable().then(() => {
					this.$refs.article[e.currentTarget.dataset.method](e.currentTarget.dataset.param)
				})
			},
			checkEditable() {
				return new Promise((resolve, reject) => {
					if (this.editable) {
						resolve()
					} else {
						uni.showModal({
							content: '需要继续编辑吗？',
							success: res => {
								if (res.confirm) {
									// 切换编辑状态
									this.save()
									resolve()
								} else {
									reject()
								}
							}
						})
					}
				})
			},
			// 保存编辑器内容
			save() {
				var content = this.$refs.article.getContent()
				this.meetform.contnet = content
			},
			/* saveContens(e) {
				this.meetform.contnet = e.html
			}, */
			// 表单提交函数
			formSubmit() {
				let that = this
				that.save()
				setTimeout(() => {
					uni.showModal({
						title: '提示',
						content: '确定提交当前会议纪要吗？',
						success: function(res) {
							if (res.confirm) {
								uniCloud.callFunction({
									name: 'addmeet',
									data: that.meetform
								}).then(res => {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									});
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})

				}, 50)
			},
		},

	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.content {
		height: 100%;
		width: 100%;
		padding: 10rpx;

		.title {
			text-align: center;
			font-size: 25px;
			font-weight: 600;
		}

		.box {
			height: 84vh;
			border: solid 1px black;
			position: relative;

			.flex-box {
				display: flex;
				width: 100%;
				border-bottom: solid 1px black;

				.small-title {
					padding: 6rpx;
					font-size: 32rpx;
					border-right: solid 1px black;
					width: 150rpx;
				}

				.small-title-1 {
					padding: 6rpx;
					font-size: 32rpx;
					border-right: solid 1px black;
					border-left: solid 1px black;
					width: 150rpx;
				}

				.two-title {
					padding: 6rpx;
					font-size: 32rpx;
					border-right: solid 1px black;
					border-left: solid 1px black;
					width: 150rpx;
					height: 150rpx;
					line-height: 150rpx;
				}
			}

			.flex-box-1 {
				text-align: center;
				width: 100%;
				border-bottom: solid 1px black;

			}

			.flex-box-3 {
				display: flex;
				width: 100%;
				border-bottom: solid 1px black;
				height: 500rpx;
				position: fixed;


				.edit {
					width: 100%;
					position: relative;

					.editor_toolbox {
						position: absolute;
						width: 97%;
						z-index: 999;
						top: 0;
						background-color: #ededed;
						padding: 5px;
						box-sizing: border-box;
					}



					.iconfont {
						flex: 1;
						text-align: center;
						font-family: "iconfont" !important;
						font-size: 22px;
						font-style: normal;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
					}

					.icon-undo:before {
						content: "\eb75";
					}

					.icon-redo:before {
						content: "\eb71";
					}

					.icon-img:before {
						content: "\e9ee";
					}

					.icon-video:before {
						content: "\e9f0";
					}

					.icon-link:before {
						content: "\eb05";
					}

					.icon-text:before {
						content: "\ecdf";
					}

					.icon-line:before {
						content: "\e7fd";
					}

					.icon-heading:before {
						content: "\e735";
					}
				}

				.long-title {
					border-right: solid 1px black;

					.txt {
						font-size: 35rpx;
						font-weight: 600;
						/* width: 100%;
						border-bottom: solid 1px black; */
					}
				}

				.title_1 {
					width: 100%;

					.txt {
						font-size: 35rpx;
						font-weight: 600;
						/* width: 100%;
						border-bottom: solid 1px black; */
					}
				}
			}

			.flex-box-5 {
				display: flex;
				width: 100%;
				border-bottom: solid 1px black;
				position: absolute;
				bottom: 0;
				line-height: 32rpx;

				.small-title {
					padding: 6rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					/* 	border-right: solid 1px black; */
					/* width: 150rpx; */
				}

				.small-title-1 {
					padding: 6rpx;
					font-size: 32rpx;
					border-right: solid 1px black;
					border-left: solid 1px black;
					width: 150rpx;
				}

				.two-title {
					padding: 6rpx;
					font-size: 32rpx;
					border-right: solid 1px black;
					border-left: solid 1px black;
					width: 150rpx;
					height: 150rpx;
					line-height: 150rpx;
				}
			}
		}
	}
</style>
