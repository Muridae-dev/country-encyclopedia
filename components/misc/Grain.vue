<template>
  <div class="background-noise" />
  <!-- <div class="background-grain" /> -->
</template>

<style lang="scss">
.background-noise {
  height: 100%;
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

.background-grain {
  position: fixed;
  top: 0;
  z-index: 1;

  height: 100%;
  width: 100%;

  background-image: url("@/assets/images/grain/noise.gif");
  background-size: 300px;
  opacity: calc(10 / 500);
  mix-blend-mode: multiply;
  pointer-events: none;
}
</style>
