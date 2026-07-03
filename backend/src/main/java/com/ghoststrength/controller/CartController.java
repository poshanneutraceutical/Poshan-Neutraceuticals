package com.ghoststrength.controller;

import com.ghoststrength.dto.AddToCartRequest;
import com.ghoststrength.dto.CartDTO;
import com.ghoststrength.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    /**
     * Add Product to Cart
     */
    @PostMapping("/add")
    public CartDTO addToCart(@Valid @RequestBody AddToCartRequest request) {
        return cartService.addToCart(request);
    }

    /**
     * Get Customer Cart
     */
    @GetMapping("/{customerId}")
    public CartDTO getCart(@PathVariable String customerId) {
        return cartService.getCart(customerId);
    }

    /**
     * Update Product Quantity
     */
    @PutMapping("/{customerId}/{productId}")
    public CartDTO updateQuantity(
            @PathVariable String customerId,
            @PathVariable Long productId,
            @RequestParam Integer quantity) {

        return cartService.updateQuantity(customerId, productId, quantity);
    }

    /**
     * Remove Product from Cart
     */
    @DeleteMapping("/{customerId}/{productId}")
    public CartDTO removeFromCart(
            @PathVariable String customerId,
            @PathVariable Long productId) {

        return cartService.removeFromCart(customerId, productId);
    }

}