<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-h4 mb-4">Healthcare Shifts</h1>

                <ShiftOverview @edit="openDrawer" @add="openDrawer(null)" />

                <ShiftDrawer
                    v-model="isDrawerOpen"
                    :shift="selectedShift"
                    :mode="drawerMode"
                    @save="saveShift"
                    @close="isDrawerOpen = false"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import ShiftOverview from '~/components/ShiftOverview.vue'
import ShiftDrawer from '~/components/ShiftDrawer.vue'
import { useShiftStore } from '~/stores/shifts'

const shiftStore = useShiftStore()
const isDrawerOpen = ref(false)
const selectedShift = ref(null)
const drawerMode = ref('create')

const openDrawer = (shift) => {
    selectedShift.value = shift ? { ...shift } : null
    drawerMode.value = shift ? 'edit' : 'create'
    isDrawerOpen.value = true
}

const saveShift = (shift) => {
    if (shift.id) {
        shiftStore.updateShift(shift)
    } else {
        shiftStore.addShift(shift)
    }
    isDrawerOpen.value = false
}
</script>
