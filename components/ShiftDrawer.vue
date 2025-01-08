<template>
    <v-navigation-drawer v-model="drawer" location="right" temporary width="450" @update:modelValue="handleClose">
        <v-form ref="form" @submit.prevent="save">
            <v-container>
                <v-text-field
                    v-model="localShift.title"
                    label="Title"
                    :rules="[v => !!v || 'Title is required']"
                    maxlength="100"
                ></v-text-field>

                <v-textarea
                    v-model="localShift.description"
                    label="Description"
                    maxlength="500"
                ></v-textarea>

                <v-select
                    v-model="localShift.type"
                    :items="['Consultation', 'Telephone', 'Ambulance']"
                    label="Type"
                    :rules="[v => !!v || 'Type is required']"
                ></v-select>

                <v-text-field
                    v-model="localShift.starttime"
                    label="Start Time"
                    type="time"
                    :rules="[v => !!v || 'Start time is required']"
                ></v-text-field>

                <v-text-field
                    v-model="localShift.endtime"
                    label="End Time"
                    type="time"
                    :rules="[validateTime]"
                ></v-text-field>

                <v-text-field
                    v-model="localShift.price"
                    label="Price ($)"
                    type="number"
                    min="0"
                    :rules="[v => v !== '' || 'Price is required']"
                ></v-text-field>

                <v-text-field
                    v-model="localShift.date"
                    label="Shift Date"
                    type="date"
                    :rules="[v => !!v || 'Date is required']"
                ></v-text-field>

                <v-btn color="primary" type="submit" block class="mt-4">
                    {{ mode === 'edit' ? 'Update' : 'Create' }} Shift
                </v-btn>
                <v-btn @click="$emit('close')" block class="mt-2">Cancel</v-btn>
            </v-container>
        </v-form>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    shift: Object,
    modelValue: Boolean,
    mode: String,
})

const emit = defineEmits(['save', 'close'])
const drawer = ref(false)
const localShift = ref({
    title: '',
    description: '',
    type: '',
    price: 0,
    date: new Date().toISOString().slice(0, 10),
    starttime: '',
    endtime: '',
})

const form = ref(null)

watch(
    () => props.modelValue,
    (val) => {
        drawer.value = val
        if (props.shift) {
            localShift.value = { ...props.shift }
        } else {
            localShift.value = {
                title: '',
                description: '',
                type: '',
                price: 0,
                date: new Date().toISOString().slice(0, 10),
                starttime: '',
                endtime: '',
            }
        }
    }
)

const handleClose = (val) => {
    if (!val) {
        emit('close')
    }
}

const validateTime = (end) => {
    if (!end) return 'End time is required'
    const [startHour, startMin] = localShift.value.starttime.split(':')
    const [endHour, endMin] = end.split(':')
    const start = new Date(0, 0, 0, startHour, startMin)
    const endTime = new Date(0, 0, 0, endHour, endMin)
    return endTime > start || 'End time must be after start time'
}

const save = async () => {
    const { valid } = await form.value.validate()
    if (valid) {
        emit('save', localShift.value)
        emit('close')
    }
}
</script>
