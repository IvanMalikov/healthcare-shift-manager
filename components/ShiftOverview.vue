<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8">
                <v-slider
                    v-model="priceFilter"
                    :min="minPrice"
                    :max="maxPrice"
                    label="Filter by Price"
                    thumb-label
                ></v-slider>
            </v-col>
            <v-col cols="12" md="4" class="text-right">
                <v-btn color="primary" @click="$emit('add')">Add Shift</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="shift in filteredShifts" :key="shift.id" cols="12" md="4">
                <ShiftCard :shift="shift" @edit="$emit('edit', shift)" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import ShiftCard from './ShiftCard.vue'
import { useShiftStore } from '~/stores/shifts'

const shiftStore = useShiftStore()
const priceFilter = ref(0)

const shifts = computed(() => shiftStore.shifts)
const filteredShifts = computed(() =>
    shifts.value.filter(s => s.price >= priceFilter.value)
)
const minPrice = computed(() => Math.min(...shifts.value.map(s => s.price), 0))
const maxPrice = computed(() => Math.max(...shifts.value.map(s => s.price), 0))
</script>
