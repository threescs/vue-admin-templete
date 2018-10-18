## 组件开发规范

* 组件文件名不需要跟文件夹名称后缀  

    * bad example： timeComp.vue
    * good example： time.vue

* 组件名完整单词，不许模糊简写

    * bad example： nav.vue
    * good example： navigation.vue

* 组件文件名多个单词之间采用符号 中线“-” 连接，同 element ui 组件文件名命名

    * bad example： dataTable.vue timePicker.vue
    * good example： data-table.vue  time-picker.vue

* 组件被导入规范，组件语法统一，组件作为类的概念，导入遵循类名规范，所有单词字母大写
    * bad example：import timePicker from '@/date-picker/time-picker';
    * good example： import TimePicker from '@/date-picker/time-picker';

* 模板中使用组件规范，单词小写、单词之间采用符号 中线“-” 连接
    ```javascript 
      <template>
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
      </template>
    ```
* 组件业务逻辑编写的顺序规范
    ```javascript 
        <template>
        <div class="">
        </div>
        </template>
        <script>
        
        export default {
        mixins:[],  //混合
        inject:{},  //组件内指令
        props:{},  //继承属性
        data() {   //内部私有属性
            return {};
        },
        computed: {},  //计算属性 适用于随组件私有属性频繁变化的场景
        components:{},  //外部组件
        directives: {}, //外部指令
        methods: {},  //组件方法函数
        mounted() {},  //挂载到DOM
        updated(){},
        destroyed(){}
        ...其他生命周期钩子函数
        };
        </script>
        
        <style scoped lang="scss">
        
        </style>
    ```


    
