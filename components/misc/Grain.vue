<template>
  <div class="background-noise" />
</template>

<style lang="scss">
.background-noise {
  height: 100dvh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  background: linear-gradient(hsla(0, 6%, 7%, 0) 50%, rgba(0, 0, 0, 0.1) 0),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 0, 0.26)
    );
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}
</style>
