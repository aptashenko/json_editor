<template>
 <div class="base-drop-field-wrapper">
   <label
       for="file"
       class="base-drop-field dropzone"
       @dragover.prevent="onDragOver"
       @dragleave="onDragLeave"
       @drop="onDrop"
   >
    <span v-if="!file" class="wobble-hor-bottom">
      Drop your file here
    </span>
     <span v-else>
      Processing...
    </span>
   </label>
   <input
       id="file"
       type="file"
       ref="fileInput"
       hidden
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
</script>

<style lang="scss" scoped>
.base-drop-field-wrapper {
  height: 100%;
}
.base-drop-field {
  width: 100%;
  height: 100%;
  outline: 1px dashed #48cae4;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  transition: all .25s ease;

  & span {
    cursor: default;
  }

  &.dragover {
    opacity: 0.5;
  }
}
.wobble-hor-bottom {
  -webkit-animation: wobble-hor-bottom 0.8s infinite both;
  animation: wobble-hor-bottom 0.8s infinite both;
}

@-webkit-keyframes wobble-hor-bottom {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
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
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
}
</style>
