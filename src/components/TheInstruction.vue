<template>
  <div class="the-instruction">
    <h2 class="the-instruction__title">File Requirements:</h2>
    <div class="the-instruction__table">
      <div class="the-instruction__table-one">
        <h3 class="the-instruction__subtitle">Several Files</h3>
        <ul class="the-instruction__list">
          <li>several files should only be uploaded as an archive</li>
          <li>the archive format should only be .zip</li>
          <li>
            the archive structure must strictly adhere to the specified structure
            <img src="@/assets/images/table_example.png" />
            <a href="/archive_example.zip" download>Download Example</a>
          </li>
        </ul>
      </div>
      <div class="the-instruction__table-two">
        <h3 class="the-instruction__subtitle">One File</h3>
        <ul class="the-instruction__list">
          <li>the file should be in .json format</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-instruction {
  &__title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 24px;
  }

  &__subtitle {
    font-size: 24px;
    margin-bottom: 12px;
  }

  &__table {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__table-one {
    display: flex;
    flex-direction: column;
  }

  &__list {
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    & li {
      & img {
        display: block;
        flex-shrink: 0;
      }

      & a {
        font-weight: 600;
        color: #0077b6;
      }
    }
  }
}
</style>
<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
</script>
