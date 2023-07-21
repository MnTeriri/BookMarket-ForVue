<template>
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
                                    <button type="button" class="btn btn-light" onclick="addAddress()">
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
                        <div class="col">
                            <div class="card" style="width: 200px;height: 210px">
                                <div class="card-body">
                                    <h5 class="card-title">${address.receiver_name}</h5>
                                    <p style="font-size: 3px">${address.phone}</p>
                                    <p style="font-size: 3px">${address.province} ${address.city}
                                        ${address.district}<br>${address.address}
                                    </p>
                                    <div class="btn-group btn-group-sm" role="group" aria-label="button group">
                                        <button type="button" class="btn btn-outline-dark"
                                                onclick="updateAddress(${address.toJSONString()})">修改
                                        </button>
                                        <button type="button" class="btn btn-outline-dark"
                                                onclick="openDeleteModal(${address.id})">删除
                                        </button>
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
</script>