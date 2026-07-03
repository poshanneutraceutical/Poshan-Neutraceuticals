package com.ghoststrength.config;

import com.ghoststrength.entity.Product;
import com.ghoststrength.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repo) {
        return args -> {
            if (repo.count() > 0) {
                log.info("Products already seeded ({} found), skipping.", repo.count());
                return;
            }
            log.info("Seeding initial product data...");

            List<Product> products = List.of(
                    Product.builder()
                            .name("Shadow Pre-Workout").price(new BigDecimal("2499.00"))
                            .description("Explosive energy and laser-sharp focus for those who train like there is no tomorrow.")
                            .category("pre-workout")
                            .imageUrl("https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?auto=compress&cs=tinysrgb&w=600")
                            .badge("BEST SELLER").featured(true).inStock(true).build(),
                    Product.builder()
                            .name("Wraith Whey Protein").price(new BigDecimal("2999.00"))
                            .description("Ultra-pure recovery fuel. Build your physique with surgical precision.")
                            .category("protein")
                            .imageUrl("https://images.pexels.com/photos/4753928/pexels-photo-4753928.jpeg?auto=compress&cs=tinysrgb&w=600")
                            .badge("NEW").featured(true).inStock(true).build(),
                    Product.builder()
                            .name("Phantom Shaker").price(new BigDecimal("499.00"))
                            .description("Engineered for relentless use. Custom edition for the warrior.")
                            .category("accessories")
                            .imageUrl("https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=600")
                            .badge(null).featured(true).inStock(true).build(),
                    Product.builder()
                            .name("Specter Creatine").price(new BigDecimal("1799.00"))
                            .description("Pharmaceutical-grade creatine monohydrate for raw strength gains.")
                            .category("creatine")
                            .imageUrl("https://images.pexels.com/photos/5257574/pexels-photo-5257574.jpeg?auto=compress&cs=tinysrgb&w=600")
                            .badge("HOT").featured(false).inStock(true).build(),
                    Product.builder()
                            .name("Revenant BCAA").price(new BigDecimal("1599.00"))
                            .description("Intra-workout amino acids to fuel your session and accelerate recovery.")
                            .category("aminos")
                            .imageUrl("https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=600")
                            .badge(null).featured(false).inStock(true).build(),
                    Product.builder()
                            .name("Banshee Fat Burner").price(new BigDecimal("2199.00"))
                            .description("Thermogenic complex designed for maximum shred and mental clarity.")
                            .category("fat-burner")
                            .imageUrl("https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=600")
                            .badge("POPULAR").featured(false).inStock(true).build()
            );
            repo.saveAll(products);
            log.info("Seeded {} products.", products.size());
        };
    }
}
