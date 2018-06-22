<template id="register">
    <div class="register" v-bind:style="{height: register_height + 'px'}" >
        <div class="register_back" v-bind:class="{ register_relative: !register_relative}">
        	<div class="register_body" v-bind:class="{ register_relative: register_relative}">
	        	<div class="logo"><img src="../images/registerNew/logo.png" alt="" /></div>
	        	<div class="codeImg_cover codeImg" v-show="imgCodeShow"></div>
			        <div class="codeImg_container codeImg" v-show="imgCodeShow">
			            <div id="imgCode"></div>
			        </div>
			        <div class="register_topArea">
			        	<img class="register_words" src="../images/registerNew/word.png"/>
			        	<img class="register_goodsList" src="../images/registerNew/goods.png"/>
			        </div>
			        <div class="registerPage_area">
			            <div class="phoneInput">
			                <input type="tel" maxlength='11' name="tel" v-on:input="phoneChange" v-model="telNum" placeholder="请输入手机号" value="" />
			            </div>
			            <div class="codeInput">
			                <input type="number" maxlength='8' v-on:input="codeChange" name="code" v-model="code"  placeholder="请输入短信验证码" />
			                <button class="getCode" v-on:click="getCode" v-bind:class="{btn_allow:getCodeAllow}" :disabled="!getCodeAllow">{{btnMessage}}</button>
			            	<div style="clear:both;height: 0;overflow:hidden"></div>
			            </div>
			            <div class="register_tips">
			                <span class="register_phone_tips" >{{tips}}</span>
			            </div>
			            <button class="toRegister" v-on:click="toRegister" v-bind:class="{btn_allow:registerAllow}" :disabled="!registerAllow">注册</button>
			            <div class="register_message">或到各大应用市场搜索下载</div>
			        </div>
			    </div>
	        </div>
    </div>
</template>
<script src="../controller/register.js"></script>
<style>
    @import '../css/register.css';
</style>