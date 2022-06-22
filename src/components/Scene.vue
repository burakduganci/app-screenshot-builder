<template>
    <div>
        <input type="file" ref="ss" class="ss-file-input" @change="changeSS" accept="image/*">
        <button class="inline-block w-full mb-4 py-3 text-center bg-green-600 rounded text-white shadow hover:bg-green-700 outline-none" @click="downloadImage">Download</button>
        <div id="screenshot" class="screenshot-wrapper rounded relative cursor-pointer" :style="{'background': scene.bgColor.hex8, 'font-size': scene.fontSize + 'px' }" @click="$refs.ss.click()">
            <div class="editable-area flex justify-center items-center h-48 py-8 text-center overflow-hidden" :style="{'font-family': scene.fontFamily, 'font-size': scene.fontSize + 'px', 'color': scene.textColor.hex8 }">
				{{ scene.text }}
            </div>
			<img :src="require(`@/assets/images/click_and_select.png`)" class="screenshot-cover">
            <div class="screenshot-cover" :style="scene.screenshotBase64 ? {'background-image': 'url(' + scene.screenshotBase64 + ')'} : ''"></div>
            <img :src="require(`@/assets/images/${scene.phone}.png`)" alt="" class="phone-frame absolute bottom-0 w-full h-auto">
        </div>
    </div>
</template>

<script>
	import { mapState } from 'vuex';
	import html2canvas from 'html2canvas';

    export default {
        name: "Scene",
        computed: {
            ...mapState({
                scene: state => state.scene
            })
        },
        methods: {
            downloadImage() {
				this.$store.commit("updateProcessing", true);
				try {
					setTimeout(() => {
						html2canvas(document.querySelector("#screenshot"), {
							backgroundColor: null
						}).then((canvas) => {
							this.saveAs(canvas.toDataURL(), 'screenshot.png')
							this.$store.commit("updateProcessing", false);
						});
					}, 100)
				} catch (error) {
					this.$store.commit("updateProcessing", false);
					alert("An error occured, please try again.");
					console.log(error);
				}

			},

			saveAs(uri, filename) {
				const link = document.createElement('a');
				if (typeof link.download === 'string') {
					link.href = uri;
					link.download = filename;

					//Firefox requires the link to be in the body
					document.body.appendChild(link);

					//simulate click
					link.click();

					//remove the link when done
					document.body.removeChild(link);
				} else {
					window.open(uri);
				}
            },
            
            // Update Screenshot
            async changeSS(event) {
                let screenshotBase64 = await this.getBaseUrl(event.target.files[0]);
                this.$store.commit('updateScreenshot', screenshotBase64);
            },
            
			getBaseUrl(file) {
				return new Promise((resolve) => {
					const reader = new FileReader();
					let baseString;
					reader.onloadend = function () {
						baseString = reader.result;
						resolve(baseString);
					};
					reader.readAsDataURL(file);
				})
			}
        }
    }
</script>

<style lang="scss" scoped>

.screenshot-wrapper {
	width: 500px;
	height: 899px;
}

.editable-area{
	word-break: break-word;
}

.ss-file-input {
	opacity: 0;
	position: absolute;
	z-index: -9990;
	top: -9999px;
}

.screenshot-cover {
	width: 72%;
	height: 71%;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	background-size: 100%;
	background-repeat: no-repeat
}

</style>