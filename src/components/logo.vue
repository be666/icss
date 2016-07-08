<template>
  <svg height="50" viewBox="-2,-12,50,24" class="i-css-logo">
    <path class="i-char-i"
          d="M 0,-11 L 0,11"
    >
    </path>
    <path
      class="i-char-poi"
      d="M 1,-1 A 1,1 0,1,0 1,0"
    >
    </path>
    <path
      class="i-char-c"
      d="M 5,-5 A 5,5 0,1,0 -5,-5 L -5,5 A 5,5 0,1,0 5,5"
    >
    </path>
    <path
      class="i-char-s"
      d="M 5,-5 A 5,5 0,1,0 0,0 A 5,5 0,1,1 -5,5"
    >
    </path>
    <path
      class="i-char-s-s"
      d="M 5,-5 A 5,5 0,1,0 0,0 A 5,5 0,1,1 -5,5"
    >
    </path>
  </svg>
</template>
<style lang="less">
  @keyframes i-css-logo-path {
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes i-css-logo-poi {
    0% {
      transform: translate(0);;
    }
    100% {
      transform: translate(50px);;
    }
  }

  .i-css-logo {
    path {
      fill: none;
      stroke-width: 2;
      stroke: #e653d5;
    }

    .i-char-poi {
      transform: translate(4px);
      stroke: #0e9a2d;
    }

    .i-char-c {
      stroke: #74bae6;
      transform: translate(13px);
    }

    .i-char-s {
      stroke: #92e6c7;
      transform: translate(27px);
    }

    .i-char-s-s {
      stroke: #9a83e6;
      transform: translate(41px);
    }

    .i-char-s, .i-char-s-s {
      stroke-dasharray: 200%;
      stroke-dashoffset: 200%;
      animation: i-css-logo-path 2s infinite linear forwards;
    }

    .i-char-poi {
      animation: i-css-logo-poi 2s infinite linear forwards;
    }
  }
</style>
<script>

  export default{
    data(){
      return {}
    }
  }
</script>
