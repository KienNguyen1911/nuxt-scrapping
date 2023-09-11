<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Sample Page"> 
                <div class="pa-7 pt-1">
                    <v-form validate-on="submit lazy" @submit.prevent="onSubmit">
                        <v-text-field
                            v-model="link"
                            label="Link"
                        ></v-text-field>

                        <v-btn
                            :loading="loading"
                            type="submit"
                            block
                            class="mt-2"
                        >Submit</v-btn>
                    </v-form>
                    <br>
                    <div class="product-info" v-if="productInfo">
                        <div class="product-info__title">
                            <h3>{{ productInfo.nameProduct }}</h3>
                        </div>
                        <div class="d-flex gap-3 flex-wrap">
                            <div class="product-info__image" v-for="imageProduct in productInfo.listImageLink">
                                <img :src="imageProduct" alt="" style="width: 140px; height: 140px; object-fit: fill;">
                            </div>
                        </div>
                        <code>{{ productInfo }}</code>
                    </div>
                    <code v-else>No Data</code>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const link = ref('')
const productInfo = ref('')
const loading = ref(false)

const onSubmit = async () => {
    loading.value = true
    await useFetch("/api/scrapping", {
        method: "POST",
        body: JSON.stringify({
            url: link.value
        })
    }).then((res) => {
        loading.value = false
        productInfo.value = res.data.value
        console.log(productInfo)
    }).catch((err) => {
        console.log(err)
    })
}
</script>