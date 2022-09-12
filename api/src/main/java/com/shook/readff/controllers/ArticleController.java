/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.shook.readff.controllers;

import com.shook.readff.entities.Article;
import com.shook.readff.repositories.ArticlesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vasil
 */
@RestController
@RequestMapping("/articles")
public class ArticleController {
    
    private final ArticlesRepository articlesRepository;
    
    @Autowired
    public ArticleController(ArticlesRepository articleRepository)
    {
        this.articlesRepository = articleRepository;
    }
    
    @GetMapping("/getAll")
    public Iterable<Article> GetArticles()
    {
        return articlesRepository.findAllByOrderByIdAsc();
    }

    @PostMapping("/create")
    public void CreateArticle(@RequestBody Article article)
    {
        try
        {
            articlesRepository.save(article);
        }
        catch (Error err)
        {
            System.out.println(err.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin("*")
    public void DeleteArticle(@PathVariable Long id)
    {
        try
        {
            articlesRepository.deleteById(id);
        }
        catch (Error err)
        {
            System.out.println(err.getMessage());
        }
    }

    @PutMapping("/update")
    @CrossOrigin("*")
    public void UpdateArticle(@RequestBody Article article)
    {
        try
        {
            articlesRepository.save(article);
        }
        catch (Error err)
        {
            System.out.println(err.getMessage());
        }
    }
}
