<template>
	<div id="app">
		<app-header />
		<main>
			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
				<router-view />
			</transition>
		</main>
	</div>
</template>

<script>
import AppHeader from './components/Header.vue'
export default {
	name: 'app',
	components: {
		AppHeader
	}
}
</script>

<style>
* {
  box-sizing: border-box;
}

.animated {
  animation-duration: .3s;
}

body {
  background-color: #f1f4f9;
}

main {
  margin: auto;
  margin-top: 64px;
  max-width: 800px;
  display: flex;
}

.content {
  width: 100%;
}
.row {
  margin-top: 1em;
  display: flex;
}
.btn {
  height: 36px;
  padding: 8px 16px;
  border: none;
  color: #fff;
  border-radius: 4px;
  font-weight: 600;
  margin-right: 16px;
  background-color: #ffffff;
  cursor: default;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.75;
}

.btn.success {
  background-color: #4aba58;
}

.btn.primary {
  background-color: #2687e9;
}

.btn.danger {
  background-color: #b54949;
}

.col-50 {
  width: 50%;
}


.form-control label {
  display: block;
  height: 26px;
}

.form-control select,
.form-control input {
  border: 1px solid #d5dde5;
  border-radius: 4px;
  height: 28px;
  padding: 0 6px;
  width: calc(100% - 14px);
}

.form-control input.danger {
	border-color: #b54949;
}
</style>
