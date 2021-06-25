<template>
	<view>
		<u-cell-group>
			<view v-for="(item,idx) in signs" :key='idx' style="border-top: #CCCCCC 0.1rpx solid;">
				<u-cell-item class="line" :title="item.signID" @click="showSignStudent(item.signID)">
					{{item.createTime}}
				</u-cell-item>
			</view>
		</u-cell-group>
		<u-popup v-model="show" mode="bottom">
			<view>
				<u-cell-group>
					<view v-for="(item,idx) in allStudents" :key='idx' :arrow="false">
						<u-cell-item v-if="inSign(item.studentNumber)" class="line"  :title="item.studentNumber+' - '+item.username"  :arrow="false">
							<u-icon name="checkmark" color="success" size="34"></u-icon>
						</u-cell-item>
						<u-cell-item v-if="!inSign(item.studentNumber)" class="line"  :title="item.studentNumber+' - '+item.username" :arrow="false">
							<u-icon name="close" color="error" size="34"></u-icon>
						</u-cell-item>
					</view>
				</u-cell-group>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.id = option.id
			this.classid = option.classId
			this.$api.getClassSign(this.id).then((res) => {
				this.signs = res
			})
			this.$api.getClassStudents(this.classid).then((res)=>{
				this.allStudents = res
			})
		},
		data() {
			return {
				classid:"",
				show:false,
				id: "",
				signs: [],
				signStudents: [],
				allStudents:[],
			}
		},
		methods: {
			showSignStudent(signID) {
				this.$api.getSignStudents(signID).then((res)=>{
					this.signStudents = res
				})
				this.show = true
			},
			inSign(studenId){
				for (var i = 0; i < this.signStudents.length; i++) {
					if(studenId === this.signStudents[i].stuTeaAdmNumber){
						return true
					}
				}
				return false
			}
		}
	}
</script>

<style>

</style>
