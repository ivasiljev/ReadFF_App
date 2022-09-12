import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import './App.css';
import { useGetArticlesQuery, useCreateArticleMutation, useDeleteArticleMutation, useUpdateArticleMutation } from './redux/api/articlesService';
import { Article } from './redux/entities/article';

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
    const [ newArticle, setNewArticle ] = useState({ id: 0, title: "", content: "" } as Article);
    const [ selectedArticleId, setSelectedArticleId ] = useState(0);

    const { data: articles, isLoading: isLoadingRead } = useGetArticlesQuery();
    const [ createArticle, { isLoading: isLoadingCreate }] = useCreateArticleMutation();
    const [ deleteArticle, { isLoading: isLoadingDelete }] = useDeleteArticleMutation();
    const [ updateArticle, { isLoading: isLoadingUpdate }] = useUpdateArticleMutation();

    const isLoading = isLoadingRead || isLoadingCreate || isLoadingDelete || isLoadingUpdate;

    function selectArticle(id: number) {
        var article = articles?.find(a => a.id === id);
        if (!article) return;
        setNewArticle(article);
        setSelectedArticleId(id);
    }

    var loadingBlock = <></>
    if (isLoading)
        loadingBlock = (<div className='position-absolute h-100 w-100' style={{top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', lineHeight: '100vh', userSelect: 'none'}}>Loading...</div>);

    return (
        <div className="App position-relative">
            { loadingBlock }
            <header className="App-header">
                <h1>ReadFF Title</h1>
            </header>
            <main className='container pb-3'>
                <Form>
                    {selectedArticleId === 0 ? <h3>Create article</h3> : <h3>Edit article</h3>}
                    <Form.Label>Article's title</Form.Label>
                    <Form.Control className='mb-2' placeholder='Title...' value={newArticle.title} onChange={(e) => ChangeArticleTitle(newArticle, setNewArticle, e.target.value)} />
                    <Form.Label>Content</Form.Label>
                    <Form.Control placeholder='Content...' value={newArticle.content} onChange={(e) => ChangeArticleContent(newArticle, setNewArticle, e.target.value)} />
                    {selectedArticleId === 0 ?
                        <Button className='my-3' onClick={async() => { await createArticle(newArticle); setNewArticle({id: 0, title: "", content: ""}); setSelectedArticleId(0); } }>Publish</Button>
                        :
                        <div className='d-flex'>
                            <Button className='my-3' onClick={async() => { await updateArticle(newArticle); setNewArticle({id: 0, title: "", content: ""}); setSelectedArticleId(0); } }>Edit</Button>
                            <Button className='my-3 ms-3' onClick={() => { setSelectedArticleId(0); setNewArticle({id: 0, title: "", content: ""}); setSelectedArticleId(0); } }>Cancel</Button>
                        </div>}
                </Form>
                <h3>Articles</h3>
                {!articles?.length ? <h4>List of articles if empty!</h4> : <></>}
                {articles?.map((article) =>
                    <div key={article.id} className={`Card mb-3 ${selectedArticleId === article.id ? 'SelectedArticle' : ''}`} onClick={() => selectArticle(article.id)}>
                        <div className={`d-flex justify-content-between`}>
                            <h4>{article.title}</h4>
                            <Button onClick={async() => await deleteArticle(article.id)}>X</Button>
                        </div>
                        <p>{article.content}</p>
                    </div>
                )}
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default App;
