<template>
    <div class="text_group">
        <div class="input_group"
             :class="{'is-invalid': error}">
            <!-- 输入框 -->
            <input :type="type"
                   :placeholder="placeholder"
                   :value="value"
                   :name="name"
                   @input="$emit('input',$event.target.value)">
            <!-- 输入框后面的内容 -->
            <button v-if="btnTitle"
                    @click="$emit('btnClick')"
                    :disabled="disabled">{{btnTitle}}</button>
        </div>
        <!-- 验证提示 -->
        <div v-if="error"
             class="invalid-feedback">{{error}}</div>
    </div>
</template>
<script>
export default {
    name: "inputGroup",
    props: {
        type: {
            type: String,
            default: "text"
        },
        placeholder: String,
        value: String,
        name: String,
        disabled: Boolean,
        btnTitle: String,  //input框中的文字
        error: String  //验证不正确提示
    }
}
</script>
<style lang="scss" scoped>
.invalid-feedback{
    color: red;
}
button {
    width: 100px;
    color: #fff;
    height: 35px;
    background-color: #111;
    font-size: 14px;
    border-color: #111;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
input:hover{
    border: 2px solid #c500008a;
}
input {
    width: 200px;
    height: 35px;
    margin-top: 20px;
    padding: 0 10px;
}
</style>