<template>
	<div id="app">
		<header class="app-header">
			<!-- Control Buttons -->
			<button class="app-header-left-section" @click="onClickLogo">
				<VIcon name="sm-logo" />
			</button>
			<!-- Search -->
			<div class="app-header-search" v-if="authenticated">
				<div class="app-header-search-wrapper">
					<input
						type="text"
						:value="searchQuery"
						@input="onInputSearchQuery"
						:placeholder="$t('Search Here')"
					/>
					<VIcon name="search" size="16px" />
				</div>
			</div>
			<div class="app-header-control-buttons">
				<button @click="onClickMin" class="ml-2">
					<VIcon name="min" size="13px" />
				</button>

				<button @click="onClickMax" class="ml-2">
					<VIcon name="duplicate" size="13px" rotation="180" />
				</button>

				<button @click="onClickQuit" class="ml-2">
					<VIcon name="x" size="13px" />
				</button>
			</div>
		</header>
		<!-- Content -->
		<RouterView />
		<!-- Hidden -->
		<Icons />
		<notifications width="345" position="top center" />
	</div>
</template>

<script>
import electron, { remote } from "electron";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
	computed: mapState(["authenticated", "searchQuery"]),

	methods: {
		...mapActions(["Logout"]),
		...mapActions("Logins", ["FetchAll"]),
		...mapMutations(["onInputSearchQuery"]),

		onClickQuit() {
			remote.app.quit();
		},

		onClickMin() {
			remote.getCurrentWindow().minimize();
		},

		onClickMax() {
			if (remote.getCurrentWindow().isMaximized()) {
				remote.getCurrentWindow().unmaximize();
			} else {
				remote.getCurrentWindow().maximize();
			}
		},

		onClickLogout() {
			this.Logout();
			this.$router.replace({ name: "Login" });
		},

		onClickLogo() {
			electron.shell.openExternal("https://secman.dev");
		}

		// async onExport() {
		//   const filePath = remote.dialog.showSaveDialogSync(null);

		//   if (!filePath) {
		//     return;
		//   }

		//   try {
		//     const data = await this.Export();

		//     const itemList = JSON.parse(CryptoTools.aesDecrypt(data));
		//     itemList.forEach((item) => CryptoTools.decryptFields(item));

		//     const csvContent = Papa.unparse(itemList);
		//     fs.writeFileSync(filePath, csvContent);
		//   } catch (error) {
		//     this.$notifyError(this.$t("Something went wrong."));
		//     console.log(error);
		//   }
		// },

		// onImport() {
		//   remote.dialog
		//     .showOpenDialog({ properties: ["openFile"] })
		//     .then(async ({ filePaths }) => {
		//       if (filePaths.length === 0) {
		//         return;
		//       }
		//       try {
		//         const fileContent = fs.readFileSync(filePaths[0]).toString();

		//         let parsedCSV = Papa.parse(fileContent.trim(), {
		//           header: true, // creates array of { head: value }
		//         });

		//         if (parsedCSV.errors.length > 0) {
		//           this.$notifyError(
		//             this.$t(
		//               "There is an error. Error: ",
		//               parsedCSV.errors[0].message
		//             )
		//           );
		//           return;
		//         }

		//         const itemList = parsedCSV.data.map((item) => {
		//           return CryptoTools.encryptPayload(item, [
		//             "username",
		//             "password",
		//             "extra",
		//           ]);
		//         });

		//         await this.Import(itemList);
		//         this.FetchAll();
		//       } catch (error) {
		//         this.$notifyError(this.$t("Something went wrong."));
		//         console.log(error);
		//       }
		//     });
		// },
	}
};
</script>

<style lang="scss">
.app-header {
	width: 100vw;
	height: 56px;
	margin: 0px;
	padding: 0px 35px;
	background: $color-gray-500;
	-webkit-app-region: drag;
	border-bottom: 1px solid $color-gray-400;

	& > * {
		-webkit-app-region: no-drag;
	}

	&,
	&-control-buttons {
		display: flex;
		align-items: center;
	}

	&-search {
		width: 295px;
		text-align: center;

		&-wrapper {
			position: relative;
			width: 260px;

			input {
				width: 100%;
				height: 40px;
				background-color: #000;
				border-radius: 8px;
				padding: 0 46px 0 24px;
				color: white;
				border: 0;
				font-size: 12px;

				&::placeholder {
					font-size: 12px;
					color: $color-gray-300;
				}
			}
		}

		.v-icon {
			top: 12px;
			right: 20px;
			position: absolute;
			color: $color-gray-300;
		}
	}

	&-control-buttons {
		width: 56px;
		height: 48px;
		-webkit-app-region: drag;
		margin-left: auto;
		display: flex;

		button {
			margin-right: 7px;
			-webkit-app-region: no-drag;
			color: $color-gray-300;
		}
	}

	&-left-section {
		display: flex;
		margin-right: auto;
		margin-left: -20px;
	}
}
</style>
