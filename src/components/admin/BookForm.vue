<template>
    <div class="d-flex flex-column" style="height: 100vh">
        <HeadForm/>
        <div class="d-flex flex-fill overflow-hidden">
            <SideMenu/>
            <div class="container-fluid overflow-auto">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>图片</th>
                        <th>ISBN</th>
                        <th>图书分类</th>
                        <th>图书名称</th>
                        <th>作者</th>
                        <th>出版社</th>
                        <th>出版时间</th>
                        <th>价格</th>
                        <th>折扣</th>
                        <th>数量</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="book in data.bookList" :key="book">
                        <th><img :src="'data:image/png;base64,'+book.image" width="50" height="50"></th>
                        <td>{{ book.bid }}</td>
                        <td>{{ book.cname }}</td>
                        <td>{{ book.bname }}</td>
                        <td>{{ book.author }}</td>
                        <td>{{ book.publisher }}</td>
                        <td>{{ formattedDate(book.publish_time) }}</td>
                        <td>{{ book.price }}</td>
                        <td>{{ book.discount }}</td>
                        <td>{{ book.count }}</td>
                        <td>{{ data.status[book.status] }}</td>
                        <td>
                            <button class="btn btn-primary btn-sm">修改</button>
                            <button class="btn btn-warning btn-sm">存储明细</button>
                            <button v-if="book.status===2" class="btn btn-success btn-sm">上架</button>
                            <button v-else class="btn btn-danger btn-sm">下架</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <template v-if="data.recordsTotal===data.recordsFiltered">
                            显示第 {{ (data.selectedPage - 1) * data.pageCount + 1 }} 至
                            {{ data.selectedPage * data.pageCount }} 项结果，共 {{ data.recordsTotal }} 项
                        </template>
                        <template v-else>
                            显示第 {{ (data.selectedPage - 1) * data.pageCount + 1 }} 至
                            {{ data.selectedPage * data.pageCount }} 项结果，共 {{ data.recordsFiltered }} 项 (由
                            {{ data.recordsTotal }} 项结果过滤)
                        </template>
                    </div>
                    <div v-if="data.totalPage!==0" class="d-flex">
                        <nav>
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="data.totalPage<=7"><!--总页数小于等于7-->
                                    <template v-for="item in data.totalPage" :key="item">
                                        <li class="page-item" :class="{'active':data.selectedPage===item}">
                                            <span class="page-link" @click="getBookList(item)">{{ item }}</span>
                                        </li>
                                    </template>
                                </template>
                                <template v-else><!--总页数大于7-->
                                    <template v-if="data.selectedPage<=4"><!--当已选择页数小于等于4时-->
                                        <template v-for="item in 5" :key="item">
                                            <li class="page-item" :class="{'active':data.selectedPage===item}">
                                                <span class="page-link" @click="getBookList(item)">{{ item }}</span>
                                            </li>
                                        </template>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <li class="page-item">
                                            <span class="page-link"
                                                  @click="getBookList(data.totalPage)">{{ data.totalPage }}</span>
                                        </li>
                                    </template>
                                    <template v-else-if="data.selectedPage<=data.totalPage-4"><!--当已选择页数小于等于总页数-4时-->
                                        <li class="page-item">
                                            <span class="page-link" @click="getBookList(1)">1</span>
                                        </li>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <template v-for="item in 3" :key="item">
                                            <li class="page-item" :class="{'active':item===2}">
                                                <span class="page-link" @click="getBookList(data.selectedPage-2+item)">{{data.selectedPage - 2 + item}}</span>
                                            </li>
                                        </template>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <li class="page-item">
                                            <span class="page-link"
                                                  @click="getBookList(data.totalPage)">{{ data.totalPage }}</span>
                                        </li>
                                    </template>
                                    <template v-else><!--当已选择页数大于总页数-4时-->
                                        <li class="page-item">
                                            <span class="page-link" @click="getBookList(1)">1</span>
                                        </li>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <template v-for="item in 5" :key="item">
                                            <li class="page-item"
                                                :class="{'active':data.totalPage-5+item===data.selectedPage}">
                                                <span class="page-link" @click="getBookList(data.totalPage-5+item)">{{data.totalPage - 5 + item }}</span>
                                            </li>
                                        </template>
                                    </template>
                                </template>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import SideMenu from "@/components/admin/SideMenu.vue";
import {QWebChannel} from "@/assets/js/qwebchannel.js";
import {onMounted, reactive} from "vue";
import HeadForm from "@/components/admin/HeadForm.vue";

const data = reactive({
    bookList: {},
    status: {'0': '正常', '1': '缺货', '2': '下架'},
    totalPage: 1,
    selectedPage: 1,
    pageCount: 10,
    recordsTotal: 0,
    recordsFiltered: 0,
    searchName: ''
})
let proxyService;
onMounted(() => {
    //eslint-disable-next-line no-undef
    new QWebChannel(qt.webChannelTransport, function (channel) {
        proxyService = channel.objects.proxyService;// 获取Qt注册的对象
        getBookList(1)
    })
})

function getBookList(page) {
    data.selectedPage = page
    proxyService.executeService('BookService', 'getBookList', {
        bname: data.searchName,
        page: page,
        count: data.pageCount
    }, function (response) {
        data.bookList = response.bookList;
        data.recordsTotal = response.recordsTotal;
        data.recordsFiltered = response.recordsFiltered;
        if (data.recordsFiltered % data.pageCount === 0) {//计算总页数
            data.totalPage = Math.trunc(data.recordsFiltered / data.pageCount);
        } else {
            data.totalPage = Math.trunc(data.recordsFiltered / data.pageCount) + 1;
        }
    })
}

function formattedDate(date) {
    const dateObject = new Date(date);
    // 提取年月日部分
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    // 将提取的年月日拼接成一个新的字符串
    return `${year}-${month}-${day}`;
}
</script>