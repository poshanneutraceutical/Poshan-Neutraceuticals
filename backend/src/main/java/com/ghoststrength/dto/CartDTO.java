package com.ghoststrength.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {

    private Long id;

    private String customerId;

    private List<CartItemDTO> items;

    private BigDecimal totalAmount;
}