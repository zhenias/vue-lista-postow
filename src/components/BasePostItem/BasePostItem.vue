<template>
  <div
      class="bg-white rounded-xl shadow-lg p-6 flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-xl h-full"
  >
    <h2 class="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{{ post.title }}</h2>

    <p class="text-gray-700 mb-4 flex-grow text-sm">
      {{ truncatedBody }}
      <button
          v-if="post.body.length > 100 && !isExpanded"
          @click="expand"
          class="text-blue-600 hover:underline ml-2"
      >
        Zobacz więcej
      </button>
    </p>

    <p class="text-xs text-gray-500 mb-4 italic">Autor: {{ post.author }}</p>

    <button
        @click="$emit('delete-post', post.id)"
        class="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm transition"
    >
      Usuń
    </button>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    truncatedBody() {
      return this.isExpanded ? this.post.body : this.post.body.slice(0, 100) + '...';
    },
  },
  methods: {
    expand() {
      this.isExpanded = true;
    },
  },
};
</script>