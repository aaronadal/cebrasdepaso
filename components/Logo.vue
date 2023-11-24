<template>
    <div class="logo">
        <div class="bars">
          <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 224 129`">
            <mask id="logo-mask">
              <rect fill="white" x="2" y="2" width="20" height="125" v-for="i in [1, 2, 3, 4, 5, 6]" :key="i" :transform="`translate(${40*(i - 1)})`" />
            </mask>

            <g mask="url(#logo-mask)" fill="var(--text-color)">
              <g>
                <ZebraPattern x="0" y="0" transform="scale(1.5)" />
                <ZebraPattern x="0" y="0" transform="scale(1.5) translate(138)" />
                <ZebraPattern x="0" y="0" transform="scale(1.5) translate(276)" />
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    dur="12s"
                    repeatCount="indefinite"
                    type="translate"
                    values="0;-207"
                    calcMode="linear" />
              </g>
            </g>
            <rect class="bar" x="2" y="2" width="20" height="125" v-for="i in [1, 2, 3, 4, 5, 6]" :key="i" :transform="`translate(${40*(i - 1)})`" />
          </svg>
        </div>
        <div class="text">
            <span>CEBRAS DE PASO</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
svg {
  .bar {
    fill: transparent;
    stroke: var(--text-color);
    stroke-width: 4px;
  }
}
</style>
