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

import Header from '@/components/Header.vue'

import EmptyState from '@/components/tasks/EmptyState.vue'

import AddTaskModal from '@/components/tasks/AddTaskModal.vue'

import Filter from '@/components/tasks/Filter.vue'

import List from '@/components/tasks/List.vue'

import Footer from '@/components/Footer.vue'

const addTaskModalOpen = ref(false)

const handleOpenAddTaskModal = () => {
  addTaskModalOpen.value = true
}

const handleCloseAddTaskModal = () => {
  addTaskModalOpen.value = false
}
</script>
