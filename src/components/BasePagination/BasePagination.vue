<template>
  <div class="pagination flex flex-wrap justify-center gap-2 mt-8">
    <button
        v-for="page in totalPages"
        :key="page"
        @click="$emit('page-changed', page)"
        :class="[
          'px-4 py-2 rounded-md border text-sm font-medium transition',
          page === currentPage
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        ]"
      >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  props: {
    currentPage: Number,
    totalPages: Number,
  },
};
</script>