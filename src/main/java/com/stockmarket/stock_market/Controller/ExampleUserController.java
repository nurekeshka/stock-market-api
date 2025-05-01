package com.stockmarket.stock_market.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.stock_market.POJO.ExampleUser;
import com.stockmarket.stock_market.Services.ExampleUserService;

@RestController
@RequestMapping("/api/example-users")
public class ExampleUserController {

    @Autowired
    private ExampleUserService userService;

    @GetMapping
    public List<ExampleUser> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public ExampleUser addUser(@RequestBody ExampleUser user) {
        return userService.createUser(user);
    }

    @GetMapping("/{id}")
    public ExampleUser getUserById(@PathVariable String id) {
        return userService.getUserById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUserById(id);
    }
}