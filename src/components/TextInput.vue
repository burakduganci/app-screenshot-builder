<template>
    <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="$attrs.id">{{ label }}</label>
        <input class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-bind="$attrs" :value="value" @input="updateValue($event.target.value)" @focus="focus($event.target.value)">
    </div>
</template>

<script>
    export default {
        name: "TextInput",
        props: ['value', 'label'],
        methods: {
            updateValue: function (value) {
                this.$emit('input', value)
            },
            focus(value){
                this.$emit('focus', value)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>