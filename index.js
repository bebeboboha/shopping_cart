// make sure to set this synchronously immediately after loading Vue
Vue.config.devtools = true
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyC8suLxUjAuLXaMYya3-wC2lPldcVQOpQU",
    authDomain: "shopping-cart-cbc46.firebaseapp.com",
    databaseURL: "https://shopping-cart-cbc46.firebaseio.com",
    storageBucket: "shopping-cart-cbc46.appspot.com",
    messagingSenderId: "792231392315"
};

firebase.initializeApp(config);
var db = new firebase.database();

var starCountRef = firebase.database().ref('product');
starCountRef.on('value', function(snapshot) {
    //updateStarCount(postElement, snapshot.val());
    var productss = snapshot.val();
    var buys = []
    var total = 0
    var totalnum = 0
    var demo = new Vue({
        el: '#demo',
        data: {
            productss,
            num: 1,
            buys,
            total,
            totalnum,
            picked: 'Top'
        },
        methods: {
            add: function(name, num, money,size,product) {
                var found = false
                if (num < 0) {
                    alert('請輸入至少一件')
                } else if (isNaN(num)) {
                    alert('不要惡搞誒')
                } else if (size != "") {
                    total = total + num * money
                    totalnum = totalnum + num * 1
                    for (var i = 0; i < buys.length; i++) {
                        if (buys[i].name === name) {
                          if(buys[i].size === size){
                            buys[i].num = buys[i].num * 1 + num * 1
                            buys[i].money = buys[i].money * 1 + money * num
                            found = true
                            break
                          }
                            
                        }
                    }
                    if (!found) {
                        buys.push({ name: name,size:size, num: num, money: num * money ,allsize:product.size})
                    }

                    this.$set('buys', buys)
                    this.$set('total', total)
                    this.$set('totalnum', totalnum)
                }
            },
            check: function() {
                for (let i in buys) {
                    console.log(buys[i].name)
                    console.log(buys[i].size)
                    console.log(buys[i].num)
                }
                console.log('total ' + total)
                buys.length = 0;
                this.$set('buys', [])
                total = 0
                this.$set('total', 0)
                totalnum = 0
                this.$set('totalnum', 0)
            },
            remove: function(buy) {
                var remove = buys.indexOf(buy)
                buys.splice(remove, 1)
                total = total - buy.money
                this.$set('total', total)
                totalnum = totalnum - buy.num
                this.$set('totalnum', totalnum)

            },
            lmin: function(buy) {
                var lmin = buys.indexOf(buy)
                if (buys[lmin].num > 1) {
                    buys[lmin].num = buys[lmin].num * 1 - 1
                    buys[lmin].money = buys[lmin].money - buys[lmin].money / (buys[lmin].num + 1)
                    total = total - buys[lmin].money / (buys[lmin].num)
                    this.$set('total', total)
                    totalnum = totalnum * 1 - 1
                    this.$set('totalnum', totalnum)
                } else {
                    buys.splice(lmin, 1)
                    total = total - buy.money
                    this.$set('total', total)
                    totalnum = totalnum - buy.num
                    this.$set('totalnum', totalnum)
                }

            },
            ladd: function(buy) {
                var ladd = buys.indexOf(buy)
                    buys[ladd].num = buys[ladd].num * 1 +1
                    buys[ladd].money = buys[ladd].money + buys[ladd].money / (buys[ladd].num - 1) 
                    total = total + buys[ladd].money / (buys[ladd].num)
                    this.$set('total', total)
                    totalnum = totalnum * 1 + 1 
                    this.$set('totalnum', totalnum)

            },

        },
        // 分類Top.Bottom,Shoes
        computed: {
            products: function() {
                if (this.picked == 'All') {
                    return this.productss
                } else if (this.picked == 'Top') {
                    var array = []
                    var p = Object.values(productss)
                    for (var i = 0; i < p.length; i++) {
                        if (p[i].type == 'top') {
                            array.push(p[i])
                        }
                    }
                    return array;
                } else if (this.picked == 'Bottom') {
                    var array = []
                    var p = Object.values(productss)
                    for (var i = 0; i < p.length; i++) {
                        if (p[i].type == 'bottom') {
                            array.push(p[i])
                        }
                    }
                    return array;
                } else if (this.picked == 'Shoes') {
                    var array = []
                    var p = Object.values(productss)
                    for (var i = 0; i < p.length; i++) {
                        if (p[i].type == 'shoes') {
                            array.push(p[i])
                        }
                    }
                    return array;
                }


            }
        }
    })
});
