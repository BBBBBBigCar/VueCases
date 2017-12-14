new Vue({
    el:".address",
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        shipping:1,
        delFlag:false,
        delIndex:'',
        editFlag:false,
        editIndex:'',
        personInf:{
            addressId:'',
            userName:'',
            streetName:'',
            postCode:'',
            tel:'',
            isDefault:false
        }
    },
    computed:{
      limitAddressList:function(){
          return this.addressList.slice(0,this.limitNum);
      }

    },
    mounted:function(){
        var _this=this;
        this.$http.get("data/address.json").then(function(res){
            _this.addressList=res.data.result;

        })
    },
    methods:{
        moreAddr:function(){
            this.limitNum=this.addressList.length;
        },
        setDef:function(ind){
            this.addressList.forEach(function(item,index){
                if(ind==index){
                    item.isDefault=true;
                }else{
                    item.isDefault=false;
                }

            })
        },
        delConfirm:function(index){
            this.delFlag=true;
            this.delIndex=index;

        },
        deleteAddr:function(){
            this.addressList.splice(this.delIndex,1);
            this.delFlag=false;
        },
        editConfirm:function(index){
            this.editFlag=true;
            this.editIndex=index;
        },
        saveInf:function(){
            var length="10000"+this.addressList.length;
            this.personInf.addressId=length;
            this.personInf.postCode=length;
            this.addressList.push(this.personInf);
            this.editFlag=false;
        }



    },
    watch:{
        addressListChange:function(){
            this.saveInf();
        }
    }


})