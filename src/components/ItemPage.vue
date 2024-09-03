
<template>
    <div class="container pb-3">
        <div class="products">
            <h1 class="mb-2 text-start">/Itmes</h1>

            <!-- Filter by Category -->
            <div class="mb-3">
                <label for="categoryFilter" class="form-label">Filter by Category:</label>
                <select v-model="selectedCategory" class="form-select" id="categoryFilter">
                    <option value="">All</option>
                    <option v-for="Category in Category" :key="category" :value="Category">{{ Category }}</option>
                </select>
            </div>

            <!-- Sort by Options -->
            <div class="mb-3">
                <label for="sortOptions" class="form-label">Sort by:</label>
                <select v-model="sortOption" class="form-select" id="sortOptions">
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div>

            <div class="row justify-content-center" v-if="filteredItems.length">
                <CardComp data-aos="fade-up" v-for="item in sortedItems" :key="item.prodID">
                    <template #cardHeader>
                        <img :src="Item.prodURL" loading="lazy"
                            class="small-img img-fluid rounded mx-auto d-block card-img-top" :alt="Item.prodName">
                    </template>
                    <template #cardBody>
                        <h5 class="card-title">{{ Item.prodName }}</h5>
                        <h5 class="card-title">{{ Item.Category }}</h5>
                        <p class="lead"><span class="text-success">Quantity</span>: {{ item.quantity }}</p>
                        <p class="lead"><span class="text-success">Amount</span>: R{{ item.amount }}</p>
                        <router-link :to="{ name: 'productDetail', params: { id: item.prodID } }"><i
                                class="fas bi-arrow-right-circle-fill fa-10x"></i></router-link>
                    </template>
                </CardComp>
            </div>
        </div>
    </div>
</template>
<script>
import CardComp from '@/components/CardComp.vue';

export default {
    state: {
        items: []
    },
    data() {
        return {
            selectedCategory: '',
            sortOption: 'name',
        };
    },
    computed: {
        Category() {
            if (!this.$store.state.items || !this.$store.state.itemss.length) {
                return []; 
            }
            const Category = this.$store.state.itemss.map(item => item.Category);
            return [...new Set(Category)];
        },
        filteredItems() {
            if (!this.selectedCategory) {
                return this.items();
            }
            return this.items().filter(item => item.Category === this.selectedCategory);
        },
        sortedItems() {
            return [...this.filteredItems].sort((a, b) => {
                if (this.sortOption === 'name') {
                    return a.prodName.localeCompare(b.prodName);
                } else if (this.sortOption === 'price') {
                    return a.amount - b.amount;
                }
                return 0;
            });
        },
    },
    
    methods: {
        mounted() {
            this.getItems();
        },
        getItems() {
            this.$store.dispatch('fetchItems');
        },
        Itmes() {
            return this.$store.state.Items || [];
        },
    },
    components: {
        CardComp,
    },
    mounted() {
        this.getItems();
    },
};

</script>
<style lang="">
    
</style>