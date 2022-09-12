import { api } from '../api'
import { Article } from '../entities/article'

export const articlesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query<Article[], void>({
            query: () => 'articles/getAll',
            providesTags: ['Articles']
        }),
        createArticle: builder.mutation<Article, Partial<Article>>({
            query: (body) => ({
                url: 'articles/create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Articles']
        }),
        deleteArticle: builder.mutation<{ success: boolean, id: number }, number>({
            query: (id) => ({
                url: `articles/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Articles']
        }),
        updateArticle: builder.mutation<Article, Partial<Article>>({
            query: (body) => ({
                url: 'articles/update',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Articles']
        })
    })
})

export const { useGetArticlesQuery, useCreateArticleMutation, useDeleteArticleMutation, useUpdateArticleMutation } = articlesApi