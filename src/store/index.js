import { createStore } from 'vuex';
import postsModule from './modules/posts';

export default createStore({
    modules: {
        posts: postsModule,
    },
});