var app = new Vue({
    el: "#app",
    data: {
        products: [
            { id: 1, title: "Radish 1", short_text: "Corund Red Radish", image: '1.jpeg', desc: '' },
            { id: 2, title: "Radish 2", short_text: "Standart Red Radish", image: '2.jpeg', desc: '' },
            { id: 3, title: "Radish 3", short_text: "Zlata Yellow Radish", image: '3.jpg', desc: '' },
            { id: 4, title: "Radish 4", short_text: "Daikon White Radish", image: '4.jpg', desc: '' },
            { id: 5, title: "Radish 5", short_text: "White Hailstone Radish", image: '5.jpg', desc: '' },
        ],
        product: [{}],
        cart: [],
        btnVisible: 0,
        atLeastOneInCart: 0,
        contactFields: {},
        formVisible: 1,
    },

    methods: {
        getProduct: function () {
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id)
                            this.product = this.products[i];
                    }
                }
            }
        },

        addToCart: function (id) {
            var cart = [];

            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }

            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = 1;
            }
        },

        checkInCart: function () {
            if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1)
                this.btnVisible = 1;
        },

        getCart: function () {
            var lStorage = [];
            lStorage = localStorage.getItem('cart').split(',')
            for (i in this.products) {
                if (lStorage.indexOf(String(this.products[i].id)) != -1) {
                    this.cart.push(this.products[i])
                }
            }
            this.atLeastOneInCart = this.cart.length
        },

        removeFromCart: function (id) {
            var lStorage = [];
            lStorage = window.localStorage.getItem('cart').split(',')

            lStorage = lStorage.filter(storageId => storageId != id)
            window.localStorage.setItem('cart', lStorage.join())

            this.cart = this.cart.filter(item => item.id != id)

            this.atLeastOneInCart = this.cart.length
        },
        
        makeOrder: function () {
            localStorage.clear();
            this.cart.splice(0, this.cart.length)
            this.formVisible = 0
            this.atLeastOneInCart = this.cart.length
        },

    },
    

    mounted: function () {
        this.getProduct()
        this.checkInCart()
        this.getCart();
    },

});