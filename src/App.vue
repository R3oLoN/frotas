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
  animation-duration: 0.3s;
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
  position: relative;
}
.btn {
  height: 36px;
  padding: 8px 16px;
  border: none;
  color: #4a6986;
  border-radius: 4px;
  font-weight: 600;
  margin-right: 16px;
  background-color: #ffffff;
  cursor: default;
  text-decoration: none;
  border: 1px solid #d5dde5;
}

.btn:disabled {
  opacity: 0.75;
}

.btn.success {
  color: #fff;
  background-color: #4aba58;
}

.btn.primary {
  color: #fff;
  background-color: #2687e9;
}

.btn.danger {
  color: #fff;
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
.group input,
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

.right {
  position: absolute;
  right: 0;
}

.group input {
  height: 36px;
  border-right: none;
  margin: 0;
}

.group {
  display: flex;
  margin: 0;
}

.group input,
.group button {
  border-radius: 0;
  height: 36px;
  border-right: none;
  margin: 0;
}

.group > *:first-child {
  border-radius: 4px 0 0 4px;
}

.group > *:last-child {
  border-radius: 0 4px 4px 0;
  border-right: 1px solid #d5dde5;
}

.group .filterOptions {
  padding: 8px;
  position: absolute;
  left: 0;
  right: 0;
  background-color: #fff;
  top: 36px;
  z-index: 999;
  border: 1px solid #d5dde5;
  border-radius: 0 0 4px 4px;
	display: none;
	border-top: none;
}

.group input:hover + .filterOptions,
.group input:focus + .filterOptions {
  display: block;
}

.group .filterOptions:hover {
  display: block;
}

.group .filterOptions label {
  display: inline-flex;
  width: 100%;
  margin-top: 8px;
  line-height: 20px;
}

.group .filterOptions input[type="checkbox"] {
  height: 20px;
  width: 20px;
  margin-right: 8px;
}
</style>
