import { defineStore } from 'pinia'

export const useShiftStore = defineStore('shifts', {
    state: () => ({
        shifts: [],
    }),
    actions: {
        addShift(shift) {
            this.shifts.push({
                ...shift,
                id: Date.now(),
            })
        },
        updateShift(updatedShift) {
            const index = this.shifts.findIndex(s => s.id === updatedShift.id)
            if (index !== -1) {
                this.shifts.splice(index, 1, updatedShift)
            }
        },
        deleteShift(id) {
            this.shifts = this.shifts.filter(s => s.id !== id)
        },
    },
})
