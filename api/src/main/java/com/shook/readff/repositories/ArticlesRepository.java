package com.shook.readff.repositories;

import com.shook.readff.entities.Article;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author vasil
 */
public interface ArticlesRepository extends CrudRepository<Article, Long> {
    
    Article findById(long id);
}
