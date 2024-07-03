<template>
 <div class="base-drop-field-wrapper">
   <div class="base-drop-field-wrapper__inner">
     <label
         for="file"
         class="base-drop-field dropzone"
         @dragover.prevent="onDragOver"
         @dragleave="onDragLeave"
         @drop="onDrop"
     >
      <span class="wobble-hor-bottom">
        Drop your file here
      </span>
     </label>
   </div>
   <input
       id="file"
       type="file"
       ref="fileInput"
       hidden
       @change="onChange($event.target.files[0])"
   />
 </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const file = ref(null);

const modelFile = defineModel();
const emit = defineEmits(['submit'])

const onDragOver = (event) => {
  event.preventDefault();
  event.currentTarget.classList.add('dragover');
}

const onDragLeave = (event) => {
  event.currentTarget.classList.remove('dragover');
}

const onDrop = (event) => {
  event.preventDefault();
  event.currentTarget.classList.remove('dragover');

  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles.length > 0) {
    file.value = droppedFiles[0];
    fileInput.value.files = droppedFiles;
    modelFile.value = file.value;
  }

  emit('submit')
}

const onChange = file => {
  file.value = file;
  modelFile.value = file.value;
  emit('submit')
}
</script>

<style lang="scss" scoped>
.base-drop-field-wrapper {
  height: 100%;
  outline: 1px dashed #48cae4;

  &__inner {
    padding: 20px;
    height: 100%;
  }
}
.base-drop-field {

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  cursor: pointer;

  transition: all .25s ease;

  & span {
    width: 100%;
    text-align: center;
  }


  &:hover {
    opacity: 0.5;
  }

  &.dragover {
    opacity: 0.5;
    outline: 1px dashed #48cae4;
  }
}
.wobble-hor-bottom {
  -webkit-animation: wobble-hor-bottom 4s infinite both;
  animation: wobble-hor-bottom 4s infinite both;
}

@keyframes wobble-hor-bottom {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    transform: translateX(-6px) rotate(-6deg);
  }
  30% {
    transform: translateX(4px) rotate(6deg);
  }
  45% {
    transform: translateX(-4px) rotate(-3.6deg);
  }
  60% {
    transform: translateX(2px) rotate(2.4deg);
  }
  75% {
    transform: translateX(-1px) rotate(-1.2deg);
  }
}
</style>
