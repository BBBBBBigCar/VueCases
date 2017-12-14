new Vue({
    el:".checkout",
    data:{
        productList:[],
        checkFlag : false ,
        delFlag : false ,
        currentIndex:'',
        sum:0
    },
    mounted: function() {
        this.$nextTick(function() {
            this.cartView();
        })
    },
    filters:{
        moneyLogo:function(value){
            return "¥"+value.toFixed(2);
        }
    },
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get("data/cart.json").then(function (res) {
                //console.log(res.data.result.list);
                _this.productList = res.data.result.list;

            });
        },
        changeAmount:function(item,operation){
        if(operation==-1){
            item.amount--;
            if(item.amount<1){
                item.amount=1;
                alert("the amount of items must be over 1");
            }
        }else{
            item.amount++;
            }
            this.totalMoney();
        },
        selectItem:function(item){
            var _this=this;
            //alert(item.checked);
            if(typeof item.checked=="undefined"){
                _this.$set(item,"checked",true);
            }
            else {
                item.checked = !item.checked;
            }
            this.totalMoney();
        },
        checkAll:function(val){
            var _this=this;
            _this.checkFlag=val;
            //alert(_this.checkFlag);
            _this.productList.forEach(function(item,index){
                if(typeof item.checked=="undefined"){
                    _this.$set(item,'checked',_this.checkFlag);
                }else{
                    item.checked=_this.checkFlag;
                }
            })
            this.totalMoney();
        },
        delConfirm:function(index){
            this.delFlag=true;
            this.currentIndex=index;
        },
        deleteItem:function(){
            this.productList.splice(this.currentIndex,1);
            this.delFlag=false;
        },
        totalMoney:function(){
            var _this=this,total=0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    total+=item.price*item.amount;
                }
            })
            _this.sum=total;
        }

    }
});
Vue.filter("money",function(value,type){
        return "¥"+value.toFixed(2)+type;
});

