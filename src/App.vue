<template>
	<div id="app">
		<div class="loader-overlay" v-if="isProcessing">
			<div class="loader"></div>
			<p>Processing...</p>
		</div>
		<div class="container mx-auto py-5">
			<div id="logo">App Screenshot Builder</div>
			<nav class="flex justify-center py-5 border-b">
				<a href="https://github.com/burakduganci/app-screenshot-builder" class="mr-2 pr-2" target="_blank"><img
						:src="require('@/assets/images/github-logo.png')" width="25"></a>
				<github-button href="https://github.com/burakduganci/app-screenshot-builder" data-icon="octicon-star"
					data-size="large" aria-label="Star burakduganci/app-screenshot-builder on GitHub">Star
				</github-button>
			</nav>

			<div id="app-wrapper" class="my-8 bg-white rounded">
				<div id="tabs">
					<div class="tab-body flex p-10 bg-gray-300 rounded shadow">

						<!-- Screenshot Scene -->
						<scene />

						<div class="settings-wrapper p-8 bg-gray-200 ml-4 rounded flex-1">
							<div class="mb-4">
								<text-input label="Text" id="text" type="text" placeholder="Please enter text" v-model="scene.text" />
							</div>
							<div class="flex mb-4">
								<div class="flex-1 mr-3">
									<text-input label="Font Size" id="font-size" type="number" placeholder="Please enter font size" v-model="scene.fontSize" />
								</div>
								<div class="flex-1 ml-3">
									<color-picker :color="scene.textColor.hex8" label="Text Color" v-model="scene.textColor.hex8"/>
								</div>
							</div>
							<div class="mb-4">
								<label class="block text-gray-700 text-sm font-bold mb-2" for="text">
									Phone
								</label>

								<div class="relative">
									<select
										class="shadow block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										v-model="scene.phone">
										<option value="iphone">iPhone</option>
										<option value="iphone_se_black">iPhone SE Black</option>
										<option value="iphone_13_pro_max_graphite">iPhone 13 Pro Max Graphite</option>
										<option value="nexus">Nexus</option>
										<option value="nexus_black">Nexus Black</option>
										<option value="pixel_5_just_black">Pixel 5 Just Black</option>
										<option value="s21_ultra_black">S21 Ultra Black</option>
										<option value="mi_mix_alpha">Mi Mix Alpha</option>
									</select>
									<div
										class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20">
											<path
												d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
											</svg>
									</div>
								</div>
							</div>
							<div class="flex mb-4 justify-between">
								<div class="flex-1 ">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="">
										Font Family
									</label>
									<font-picker :api-key="'AIzaSyDwOiqTyeU9bNqQcaIEuwrilHg2U0L_15M'"
										:active-font="scene.fontFamily" :sort="'popularity'" @change="updateFont">
									</font-picker>
								</div>
							</div>
							<div class="mb-4">
								<label class="block text-gray-700 text-sm font-bold mb-2" for="">
									Background Color
								</label>
								<div class="solid-colors">
									<div class="my-5">
										<color-picker :color="scene.bgColor.hex8" v-model="scene.bgColor.hex8"/>

										<!-- Gradients -->
										<div class="static-bg-colors flex flex-wrap justify-between mt-5 pt-2 border-t">
											<button class="bg-color-box w-24 h-20 my-3 mx-2 rounded shadow"
												:style="{'background': color}" v-for="(color, key) in staticGradients"
												:key="key" @click="updateBgColor(color)"></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer class="text-center text-white">
				created by <a class="text-blue-500" href="https://duganci.com" target="_blank">@burakduganci</a><br>
				<small class="text-gray-500">This app works on Google Chrome browser correctly.</small>
			</footer>
		</div>


	</div>
</template>

<script>
	import FontPicker from 'font-picker-vue';
	import {
		Chrome
	} from 'vue-color'
	import gradientColors from '@/configs/gradients';
	import GithubButton from 'vue-github-button';
	import Scene from '@/components/Scene'
	import ColorPicker from '@/components/ColorPicker'
	import TextInput from '@/components/TextInput'
	import { mapState } from 'vuex';
	import { mixin as clickaway } from 'vue-clickaway';


	export default {
		data() {
			return ({				
				textPickerStatus: false,
				bgPickerStatus: false,
				staticGradients: gradientColors
			})
		},
		mixins: [ clickaway ],
		components: {
			FontPicker,
			ColorPickers: Chrome,
			ColorPicker,
			GithubButton,
			Scene,
			TextInput
		},
		computed: {
			...mapState({
				scene: state => state.scene,
				isProcessing: state => state.isProcessing
			})
		},
		methods: {
			updateFont(font) {
				this.$store.commit('updateFontFamily', font.family)
			},
			updateBgColor(color) {
				this.$store.commit('updateBgColor', color)
			},
			closeAllPickers() {
				this.textPickerStatus = false
				this.bgPickerStatus = false
			},
			showPicker(pickerName){
				document.addEventListener('click', this.documentClick);
				this[`${pickerName}PickerStatus`] = true;
			},
			hidePickers(){
				document.addEventListener('click', this.documentClick);
				this.textPickerStatus = false;
				this.bgPickerStatus = false;
			},
			documentClick(e) {
				var el = this.$refs.colorpicker,
					target = e.target;
				if(el !== target && !el.contains(target)) {
					this.hidePicker()
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Fugaz+One&display=swap');

	#app {
		width: 1280px;
		margin: 0 auto;

		.container {
			width: 100%;
			max-width: inherit;
		}
	}

	.loader-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 3;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
	}

	nav {
		border-color: rgba(0, 0, 0, 0.1);
	}

	#logo {
		font-size: 35px;
		font-weight: bold;
		text-align: center;
		font-family: 'Fugaz One', cursive;
		color: white;
	}
</style>
