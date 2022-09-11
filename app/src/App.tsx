import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { Article } from './store/entities/article';
import { createArticle } from './store/slices/articleSlice';

function ChangeArticleTitle(article: Article, setState: Dispatch<SetStateAction<Article>>, value: Article['title']) {
    setState({
        ...article,
        title: value
    })
}

function ChangeArticleContent(article: Article, setState: Dispatch<SetStateAction<Article>>, value: Article['content']) {
    setState({
        ...article,
        content: value
    })
}

function App() {
    var articles = useAppSelector((state) => state.articles);
    const dispatch = useAppDispatch();
    const [newArticle, setNewArticle] = useState({ title: "", content: "" } as Article);

    return (
        <div className="App">
            <header className="App-header">
                <h1>ReadFF Title</h1>
            </header>
            <main>
                <Form>
                    <Form.Label>Article's title</Form.Label>
                    <Form.Control placeholder='Title...' value={newArticle.title} onChange={(e) => ChangeArticleTitle(newArticle, setNewArticle, e.target.value)} />
                    <Form.Label>Content</Form.Label>
                    <Form.Control placeholder='Content...' value={newArticle.content} onChange={(e) => ChangeArticleContent(newArticle, setNewArticle, e.target.value)} />
                    <Button onClick={() => dispatch(createArticle(newArticle))}>Publish</Button>
                </Form>
                <h3>Articles</h3>
                {!articles.length ? <h4>List of articles if empty!</h4> : <></>}
                {articles.map((article) =>
                    <div>
                        <h4>{article.title}</h4>
                        <p>{article.content}</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
