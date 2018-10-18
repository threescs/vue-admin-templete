# 定义路由页面规范

* 路由页面文件名不需要跟文件夹名称后缀  

    * bad example： timeComp.vue
    * good example： time.vue

* 路由页面名完整单词，不许模糊简写

    * bad example： nav.vue
    * good example： navigation.vue

* 路由页面文件名多个单词之间采用符号 中线“-” 连接，同 element ui 路由页面文件名命名

    * bad example：  OrganizerSettle.vue
    * good example： organizer-settle.vue

* 路由页面被导入规范，路由页面语法统一，路由页面作为类的概念，导入遵循类名规范，所有单词字母大写，配置成按需加载模式
    * bad example：import OrganizerSettle from '@/pages/organizer/organizer-settle';
    * good example： const Home = () => import(/* webpackChunkName: "home" */'@/pages/Home');

* 路由页面业务逻辑编写的顺序规范
    ```javascript 
        <template>
        <div class="">
        </div>
        </template>
        <script>
        
        export default {
        mixins:[],  //混合
        inject:{},  //路由页面内指令
        props:{},  //继承属性
        data() {   //内部私有属性
            return {};
        },
        computed: {},  //计算属性 适用于随路由页面私有属性频繁变化的场景
        components:{},  //外部路由页面
        directives: {}, //外部指令
        methods: {},  //路由页面方法函数
        mounted() {},  //挂载到DOM
        updated(){},
        destroyed(){}
        ...其他生命周期钩子函数
        };
        </script>
        
        <style scoped lang="scss">
        
        </style>
    ```
* 路由页面定义CSS类名规则
  * 单词间以"-" 连接，全部小写
  * 尽量类名要表达所在标签的含义
  * bad example 
    .my_bad_example or myBadExample
  * good example
    .good-example

* 路由页面 style 上统一加上 scoped 属性 ，除了公用样式比如 main.vue 

* 路由模板绑定的对象级别属性必须提前在data 中声明
    ```template
        {{user.name}}
    ```
    ```javascript
    export default {
        data() {
            return {user:{}}
        }
    }
    ```

* 计算属性和方法使用的区别在于 实时还是一次性操作，如果需要实时监控属性值，用计算属性

* 对于页面文件代码量大于400行的情况下处理原则，保证页面代码总行数控制在200行左右不超过300行，一行的代码量不超过200个字符 包括各种空格在内
  * 抽象组件
  * 通过子路由方式加载

