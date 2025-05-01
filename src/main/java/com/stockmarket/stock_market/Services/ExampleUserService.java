package com.stockmarket.stock_market.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.stock_market.POJO.ExampleUser;
import com.stockmarket.stock_market.Repositories.ExampleUserRepository;

@Service
public class ExampleUserService {

    @Autowired
    private ExampleUserRepository userRepository;

    public List<ExampleUser> getAllUsers() {
        return userRepository.findAll();
    }

    public ExampleUser createUser(ExampleUser user) {
        return userRepository.save(user);
    }

    public Optional<ExampleUser> getUserById(String id) {
        return userRepository.findById(id);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }
}
