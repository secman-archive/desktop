<template>
  <div class="avatar">
    <div class="avatar-content">
      <VIcon name="user" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VAvatar",
  props: {
    name: String,
  },
};
</script>

<style lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 5px;

  &:global(.fancy) {
    background-origin: border-box;
    background-clip: content-box, border-box;
    border: double 2px transparent;

    background-image: linear-gradient(black, black),
      linear-gradient(45deg, $color-secondary, $color-primary);
  }

  &-content {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: #696969;
    font-weight: 700;
    color: #fff;
    border: 2px solid #484848;

    &:global(.fancy) {
      background: black;
    }
  }
}
</style>
