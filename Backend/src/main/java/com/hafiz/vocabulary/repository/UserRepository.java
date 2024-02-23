package com.hafiz.vocabulary.repository;

import com.hafiz.vocabulary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}