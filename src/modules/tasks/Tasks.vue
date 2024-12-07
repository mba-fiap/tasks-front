<template>
  <div class="w-full flex flex-col min-h-screen">
    <Header />

    <!-- <EmptyState @openAddTaskModal="handleOpenAddTaskModal" /> -->

    <Filter @openAddTaskModal="handleOpenAddTaskModal" />

    <List />

    <Footer />

    <AddTaskModal :open="addTaskModalOpen" @dismiss="handleCloseAddTaskModal" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Header from '@/common/components/Header.vue'

import EmptyState from './components/EmptyState.vue'

import AddTaskModal from './components/AddTaskModal.vue'

import Filter from './components/Filter.vue'

import List from './components/List.vue'

import Footer from '@/common/components/Footer.vue'

const addTaskModalOpen = ref(false)

const handleOpenAddTaskModal = () => {
  addTaskModalOpen.value = true
}

const handleCloseAddTaskModal = () => {
  addTaskModalOpen.value = false
}
</script>
