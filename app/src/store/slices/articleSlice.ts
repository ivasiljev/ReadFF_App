import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Article } from "../entities/article";

const initialState: Article[] = []

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        createArticle: (state, action: PayloadAction<Article>) => {
            var createdArticle = action.payload;
            var maxId: number = Math.max(...state.map(a => a.id));
            createdArticle.id = maxId + 1;
            state.push(createdArticle);
        }
    }
})

export const { createArticle } = articleSlice.actions

export default articleSlice.reducer