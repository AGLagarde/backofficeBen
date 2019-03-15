<template>
    <button
        @mouseenter="toggleIsHover(true)"
        @mouseleave="toggleIsHover(false)"
        :style="buttonStyle"
        class="button">
        <p>
            {{ title }}
            </p>
    </button>
</template>

<script>
    export default {
        name:'button-user',
        data() {
            return {
                isHover: false
            }
        },
        props: {
            title: {
                type: String
            },
            activeButton: {
                type: Object,
            },
            nonActiveButton: {
                type: Object
            }
        },
        computed: {
            buttonStyle() {
                return {
                    backgroundColor: this.isHover ? this.activeButton.backgroundColor : this.nonActiveButton.backgroundColor,
                    color: this.isHover ? this.activeButton.colorText : this.nonActiveButton.colorText,
                    borderColor: this.isHover ? this.activeButton.borderColor : this.nonActiveButton.borderColor
                }
            }
        },
        methods: {
            toggleIsHover(val) {
                this.isHover = val
            }
        },
        watch: {
            isHover() {
                console.log('is hover a changé')
            }
        }
    }

</script>

<style scoped lang=scss> 
@import "../scss/common/_colors.scss";

.button {
    padding: 2px 6px;
    margin: 0 10px;
    border: 1px solid; 
    border-radius: 10px;
    cursor: pointer;
}
</style>