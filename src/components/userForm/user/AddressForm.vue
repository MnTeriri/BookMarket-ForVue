<template>
    <div class="modal fade" id="addressModal" tabindex="-1" aria-labelledby="addressModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">{{data.modalTitle}}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" v-model="data.address.receiverName" placeholder="name@example.com">
                        <label>收货人</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" v-model="data.address.phone" placeholder="name@example.com">
                        <label>手机号码</label>
                    </div>
                    <div class="form-floating mb-3" data-toggle="distpicker" id="addressForm">
                        <select class="form-select mb-3" id="province"></select>
                        <select class="form-select mb-3" id="city"></select>
                        <select class="form-select mb-3" id="district"></select>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" v-model="data.address.address" placeholder="Leave a comment here"></textarea>
                        <label>详细地址</label>
                    </div>
                    <div class="form-check mb-3" v-show="!data.isAddModal">
                        <input class="form-check-input" type="checkbox" v-model="data.address.isDefault">
                        <label class="form-check-label" for="is_default">设为默认地址</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" v-show="data.isAddModal" @click="addSubmitButton">添加</button>
                    <button type="button" class="btn btn-primary" v-show="!data.isAddModal" @click="updateSubmitButton">修改</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container" style="width: 90%">
        <div class="row">
            <HeaderForm/>
            <SideMenu/>
            &nbsp;&nbsp;
            <div class="col-md-9 " style="background: #f1f1f1;">
                <div style="margin: 30px">
                    <div style="height: 20px"></div>
                    <h5>我的收货地址</h5>
                    <div id="addressList" class="row row-cols-1 row-cols-md-4 g-4">
                        <div class="col">
                            <div class="card" style="width: 200px;height: 210px">
                                <div class="card-body text-center nav flex-column justify-content-center">
                                    <button type="button" class="btn btn-light" @click="addAddress">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             class="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                        <p>添加收货地址</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col" v-for="address in data.addressList" :key="address">
                            <div class="card" style="width: 200px;height: 210px">
                                <div class="card-body">
                                    <h5 class="card-title" v-if="address.isDefault===1">{{ address.receiverName }}【默认】</h5>
                                    <h5 class="card-title" v-else>{{ address.receiverName }}</h5>
                                    <p style="font-size: 3px">{{ address.phone }}</p>
                                    <p style="font-size: 3px">{{ address.province }} {{ address.city }} {{ address.district }}<br>{{ address.address }}</p>
                                    <div class="btn-group btn-group-sm" role="group" aria-label="button group">
                                        <button type="button" class="btn btn-outline-dark" @click="updateAddress(address)">修改</button>
                                        <button type="button" class="btn btn-outline-dark">删除</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Utils/>
        <FooterForm/>
    </div>
</template>
<script setup>
import Utils from "@/components/userForm/Utils.vue";
import SideMenu from "@/components/userForm/user/SideMenu.vue";
import FooterForm from "@/components/FooterForm.vue";
import HeaderForm from "@/components/userForm/HeaderForm.vue";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import {getCurrentInstance, onMounted, reactive} from "vue";
import 'distpicker/dist/distpicker.esm.js'
import $ from 'jquery/dist/jquery'

let addressModal = null;
let distPicker = null;
const {proxy} = getCurrentInstance()
const data = reactive({
    addressList: [],
    address: {},
    modalTitle:'添加收货地址',
    isAddModal: true
})

onMounted(() => {
    getAddressList()
    addressModal = new bootstrap.Modal('#addressModal');
    distPicker = $('#addressForm')
})

function getAddressList() {
    proxy.$axios.post('/address/addressList').then(response => {
        data.addressList = response.data
    })
}

function addAddress() {
    data.modalTitle = '添加收货地址'
    data.isAddModal = true
    data.address = {}
    distPicker.distpicker('destroy')
    distPicker.distpicker('reset')
    addressModal.show()
}

function updateAddress(json) {
    data.modalTitle = '修改收货地址'
    data.isAddModal = false
    data.address = JSON.parse(JSON.stringify(json))
    data.address.isDefault = json.isDefault === 1;
    distPicker.distpicker('destroy')
    distPicker.distpicker({province: json.province, city: json.city, district: json.district});
    distPicker.distpicker('reset')
    addressModal.show()
}

function addSubmitButton() {
    console.log(data.address)
}

function updateSubmitButton() {
    console.log(data.address)
}
</script>