package com.ghoststrength.service;

import com.ghoststrength.dto.CheckoutRequestDTO;
import com.ghoststrength.dto.OrderDTO;
import com.ghoststrength.dto.OrderItemDTO;
import com.ghoststrength.entity.*;
import com.ghoststrength.repository.CartRepository;
import com.ghoststrength.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final EmailService emailService;

    /**
     * Checkout Cart
     */
    public OrderDTO checkout(CheckoutRequestDTO request) {

        Cart cart = cartRepository.findByCustomerId(request.getCustomerId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cart is empty");
        }

        Order order = Order.builder()
                .customerName(request.getCustomerName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .totalAmount(cart.getTotalAmount())
                .paymentStatus("PENDING")
                .orderStatus("PLACED")
                .orderDate(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();
        // Copy Cart Items to Order Items
        for (CartItem cartItem : cart.getItems()) {

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productId(cartItem.getProduct().getId())
                    .productName(cartItem.getProduct().getName())
                    .imageUrl(cartItem.getProduct().getImageUrl())
                    .price(cartItem.getProduct().getPrice())
                    .quantity(cartItem.getQuantity())
                    .subtotal(cartItem.getSubtotal())
                    .build();

            order.getItems().add(orderItem);
        }

        // Save Order
        Order savedOrder = orderRepository.save(order);

        emailService.sendOrderConfirmation(savedOrder);

        cart.getItems().clear();
        cart.setTotalAmount(BigDecimal.ZERO);
        cartRepository.save(cart);

        return convertToDTO(savedOrder);
    }
    /**
     * Convert Order Entity to DTO
     */
    private OrderDTO convertToDTO(Order order) {

        return OrderDTO.builder()
                .id(order.getId())
                .customerName(order.getCustomerName())
                .email(order.getEmail())
                .phone(order.getPhone())
                .address(order.getAddress())
                .city(order.getCity())
                .state(order.getState())
                .pincode(order.getPincode())
                .totalAmount(order.getTotalAmount())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .orderDate(order.getOrderDate())
                .items(
                        order.getItems()
                                .stream()
                                .map(item -> OrderItemDTO.builder()
                                        .productId(item.getProductId())
                                        .productName(item.getProductName())
                                        .imageUrl(item.getImageUrl())
                                        .price(item.getPrice())
                                        .quantity(item.getQuantity())
                                        .subtotal(item.getSubtotal())
                                        .build())
                                .collect(Collectors.toList())
                )
                .build();
    }

}