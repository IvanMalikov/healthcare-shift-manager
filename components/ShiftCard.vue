<template>
    <v-card class="mx-auto my-4" max-width="400">
        <v-card-title>{{ shift.title }}</v-card-title>
        <v-card-subtitle>{{ shift.type }}</v-card-subtitle>
        <v-card-subtitle>{{ shift.description }}</v-card-subtitle>

        <v-card-text>
            <p><strong>Price:</strong> ${{ shift.price }}</p>
            <p><strong>Date:</strong> {{ shift.date }}</p>
            <p><strong>Time:</strong> {{ shift.starttime }} - {{ shift.endtime }}</p>
        </v-card-text>

        <v-card-actions>
            <v-btn color="primary" @click="$emit('edit', shift)">Edit</v-btn>
            <v-btn color="error" @click="dialog = true">Delete</v-btn>
        </v-card-actions>

        <v-dialog v-model="dialog" persistent width="400">
            <v-card>
                <v-card-title>Confirm Deletion</v-card-title>
                <v-card-text>Are you sure you want to delete this shift?</v-card-text>
                <v-card-actions>
                    <v-btn @click="dialog = false">Cancel</v-btn>
                    <v-btn color="red" @click="deleteShift">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useShiftStore } from '~/stores/shifts'

const props = defineProps({
    shift: Object,
})

const shiftStore = useShiftStore()
const dialog = ref(false)

const deleteShift = () => {
    shiftStore.deleteShift(props.shift.id)
    dialog.value = false
}
</script>
