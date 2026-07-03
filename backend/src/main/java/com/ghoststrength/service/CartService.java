package com.ghoststrength.service;

import com.ghoststrength.dto.AddToCartRequest;
import com.ghoststrength.dto.CartDTO;
import com.ghoststrength.dto.CartItemDTO;
import com.ghoststrength.entity.Cart;
import com.ghoststrength.entity.CartItem;
import com.ghoststrength.entity.Product;
import com.ghoststrength.repository.CartItemRepository;
import com.ghoststrength.repository.CartRepository;
import com.ghoststrength.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    /**
     * Add Product To Cart
     */
    public CartDTO addToCart(AddToCartRequest request) {

        // Find Product
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Product not found"));

        // Find existing cart or create new
        Cart cart = cartRepository.findByCustomerId(request.getCustomerId())
                .orElseGet(() -> {

                    Cart newCart = Cart.builder()
                            .customerId(request.getCustomerId())
                            .items(new ArrayList<>())
                            .totalAmount(BigDecimal.ZERO)
                            .build();

                    return cartRepository.save(newCart);
                });

        // Check whether product already exists in cart
        Optional<CartItem> existingItem = cart.getItems()
                .stream()
                .filter(item ->
                        item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {

            CartItem item = existingItem.get();

            item.setQuantity(
                    item.getQuantity() + request.getQuantity());

            item.setSubtotal(
                    product.getPrice().multiply(
                            BigDecimal.valueOf(item.getQuantity())
                    ));

        } else {

            CartItem item = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .subtotal(
                            product.getPrice().multiply(
                                    BigDecimal.valueOf(request.getQuantity())
                            )
                    )
                    .build();

            cart.getItems().add(item);
        }

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    /**
     * Get Customer Cart
     */
    public CartDTO getCart(String customerId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Cart not found"));

        return convertToDTO(cart);
    }

    /**
     * Remove Product From Cart
     */
    public CartDTO removeFromCart(String customerId, Long productId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Cart not found"));

        cart.getItems().removeIf(item ->
                item.getProduct().getId().equals(productId));

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    /**
     * Update Product Quantity
     */
    public CartDTO updateQuantity(
            String customerId,
            Long productId,
            Integer quantity) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Cart not found"));

        CartItem item = cart.getItems()
                .stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() ->
                        new EntityNotFoundException("Product not found in cart"));

        item.setQuantity(quantity);

        item.setSubtotal(
                item.getProduct()
                        .getPrice()
                        .multiply(BigDecimal.valueOf(quantity))
        );

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }
    /**
     * Calculate Cart Total
     */
    private void calculateTotal(Cart cart) {

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : cart.getItems()) {
            total = total.add(item.getSubtotal());
        }

        cart.setTotalAmount(total);
    }

    /**
     * Convert Cart Entity to DTO
     */
    private CartDTO convertToDTO(Cart cart) {

        return CartDTO.builder()
                .id(cart.getId())
                .customerId(cart.getCustomerId())
                .totalAmount(cart.getTotalAmount())
                .items(
                        cart.getItems()
                                .stream()
                                .map(item -> CartItemDTO.builder()
                                        .productId(item.getProduct().getId())
                                        .productName(item.getProduct().getName())
                                        .imageUrl(item.getProduct().getImageUrl())
                                        .price(item.getProduct().getPrice())
                                        .quantity(item.getQuantity())
                                        .subtotal(item.getSubtotal())
                                        .build())
                                .toList()
                )
                .build();
    }

}
