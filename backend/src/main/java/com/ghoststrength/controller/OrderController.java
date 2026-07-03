package com.ghoststrength.controller;

import com.ghoststrength.dto.CheckoutRequestDTO;
import com.ghoststrength.dto.OrderDTO;
import com.ghoststrength.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    /**
     * Checkout and Place Order
     */
    @PostMapping("/checkout")
    public OrderDTO checkout(
            @Valid @RequestBody CheckoutRequestDTO request) {

        return orderService.checkout(request);
    }

}