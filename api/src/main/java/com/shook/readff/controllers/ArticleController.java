/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.shook.readff.controllers;

import com.shook.readff.entities.Article;
import com.shook.readff.repositories.ArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vasil
 */
@RestController
public class ArticleController {
    
    private final ArticlesRepository articlesRepository;
    
    @Autowired
    public ArticleController(ArticlesRepository articleRepository)
    {
        this.articlesRepository = articleRepository;
    }
    
    @GetMapping("/getArticles")
    public Iterable<Article> GetArticles()
    {
        return articlesRepository.findAll();
    }
}
