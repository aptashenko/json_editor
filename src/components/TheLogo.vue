<template>
  <a href="#" class="the-logo">
    L
    <span>ocalizator</span>
  </a>
</template>

<style lang="scss" scoped>
.the-logo {
  font-family: "Lilita One", sans-serif;
  font-size: 48px;
  color: #0077b6;
  line-height: 1;

  &:hover {

    & span {
      color: #90e0ef;
    }
  }

  & span {
    font-family: inherit;
    font-size: 20px;

    transition: all .25s ease;
  }
}
</style>
