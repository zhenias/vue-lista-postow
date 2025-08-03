import { fetchPosts, fetchUsers, deletePost } from '@/services/api';

export default {
    namespaced: true,
    state: {
        posts: [],
        users: [],
        errors: [],
        currentPage: 1,
        itemsPerPage: 10,
        loading: true,
    },
    mutations: {
        SET_LOADING(state, status) {
            state.loading = status;
        },

        SET_POSTS(state, posts) {
            state.posts = posts;
        },
        DELETE_POST(state, postId) {
            state.posts = state.posts.filter(post => post.id !== postId);
        },
        SET_PAGE(state, page) {
            state.currentPage = page;
        },

        SET_USERS(state, users) {
            state.users = users;
        },

        SET_ERROR(state, error) {
            state.errors.push(error);
        },
    },
    actions: {
        async loadPosts({ commit, state }) {
            if (state.users.length === 0) {
                commit('SET_ERROR', 'Wystąpiły błędy podczas ładowania użytkowników. Spróbuj ponownie później lub odśwież stronę.');

                return;
            }

            try {
                commit('SET_LOADING', true);

                const posts = await fetchPosts();

                const postsWithAuthors = await Promise.all(
                    posts.map(async post => {
                        const user = state.users.find(user => user.id === post.userId);

                        return {
                            ...post,
                            author: user?.name || 'Unknown'
                        };
                    })
                );

                commit('SET_POSTS', postsWithAuthors);
            } catch (error) {
                console.error('Błąd ładowania postów:', error);

                commit('SET_ERROR', 'Błąd, podczas ładowania postów, więcej szczegółów znajdziesz w konsoli.');
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async loadUsers({ commit }) {
            try {
                const users = await fetchUsers();

                commit('SET_USERS', users);
            } catch (error) {
                console.error('Błąd ładowania użytkowników:', error);

                commit('SET_ERROR', 'Nie udało się pobrać użytkowników. Więcej szczegółów znajdziesz w konsoli.');
            }
        },
        async removePost({ commit }, postId) {
            try {
                await deletePost(postId);

                commit('DELETE_POST', postId);
            } catch (error) {
                console.error('Błąd usuwania posta:', error);

                commit('SET_ERROR', 'Nie udało się usunąć posta. Więcej szczegółów znajdziesz w konsoli.');
            }
        },
    },
    getters: {
        paginatedPosts: (state) => {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;

            return state.posts.slice(start, end);
        },
        totalPages: (state) => Math.ceil(state.posts.length / state.itemsPerPage),
    },
};