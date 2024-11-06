<template>
  <div class="w-full flex flex-col min-h-screen">
    <Header />

    <EmptyState />

    <!-- <List /> -->

    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'

import EmptyState from '@/components/tasks/EmptyState.vue'

import List from '@/components/tasks/List.vue'

import Footer from '@/components/Footer.vue'
</script>
