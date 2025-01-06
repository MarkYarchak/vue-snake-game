<template>
  <footer class="game-footer is-warning">
    <span class="nes-text">Explore the source code on</span>

    <a
      :href="GH_SOURCE_LINK"
      target="_blank"
      class="game-footer__gh-btn nes-btn"
    >
      <i class="nes-icon github"></i>
      <span class="game-footer__gh-btn-text">GitHub</span>
    </a>
  </footer>
</template>

<script setup lang="ts">
const GH_SOURCE_LINK = 'https://github.com/MarkYarchak/vue-snake-game';
</script>

<style scoped>
.game-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.game-footer__gh-btn {
  display: flex;
  align-items: center;
}

.game-footer__gh-btn-text {
  margin-left: 1rem;
}
</style>
