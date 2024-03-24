<template>
  <div class="base-input-file">
    <label
        :for="id"
        class="base-input-file__label"
    >
      <m-icon name="upload_file" />
      <span>
        Выберите файл или перетащите его сюда
      </span>
    </label>
    <input
        :id="id"
        type="file"
        @change="emit('change', $event)"
    />
  </div>
</template>

<script setup>
import MIcon from "@/components/shared/MIcon.vue";

const emit = defineEmits(['change']);
defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})
</script>

<style lang="scss">
.base-input-file {
  position: relative;
  width: 150px;
  aspect-ratio: 1/1;
  border: 1px solid #111113;
  border-radius: 16px;
  box-shadow: -1px 1px 5px 1px rgba(17, 17, 19, 0.42);
  transition: all .25s ease;
  background: #fff;

  &:hover {
    transform: scale(1.1);
  }


  &__label {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    cursor: pointer;

    & span {
      font-size: 14px;
      text-align: center;
    }
  }

  & input {
    visibility: hidden;
  }
}
</style>
