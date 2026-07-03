package com.ghoststrength.service;

import com.ghoststrength.entity.Order;
import com.ghoststrength.entity.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${company.email}")
    private String companyEmail;

    /**
     * Contact Form Email
     */
    public void sendContactEmail(
            String name,
            String email,
            String phone,
            String message) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(companyEmail);

        mail.setSubject("New Contact Inquiry");

        mail.setText(
                "Name : " + name + "\n\n" +
                        "Email : " + email + "\n\n" +
                        "Phone : " + phone + "\n\n" +
                        "Message :\n" + message
        );

        mailSender.send(mail);
    }

    /**
     * Distributor Inquiry Email
     */
    public void sendDistributorInquiryEmail(
            String fullName,
            String email,
            String phone,
            String businessName,
            String city,
            String state,
            String message) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(companyEmail);

        mail.setSubject("New Distributor Inquiry");

        mail.setText(
                "Full Name : " + fullName + "\n\n" +
                        "Email : " + email + "\n\n" +
                        "Phone : " + phone + "\n\n" +
                        "Business Name : " + businessName + "\n\n" +
                        "City : " + city + "\n\n" +
                        "State : " + state + "\n\n" +
                        "Message :\n" + message
        );

        mailSender.send(mail);
    }

    /**
     * Order Confirmation Email
     */
    @Async
    public void sendOrderConfirmation(Order order) {

        StringBuilder products = new StringBuilder();

        for (OrderItem item : order.getItems()) {

            products.append(item.getProductName())
                    .append(" x ")
                    .append(item.getQuantity())
                    .append(" - ₹")
                    .append(item.getSubtotal())
                    .append("\n");
        }

        // Email to Customer
        SimpleMailMessage customerMail = new SimpleMailMessage();

        customerMail.setTo(order.getEmail());

        customerMail.setSubject("GhostStrength - Order Confirmation");

        customerMail.setText(
                "Hello " + order.getCustomerName() + ",\n\n" +

                        "Thank you for shopping with GhostStrength.\n\n" +

                        "Order ID : " + order.getId() + "\n\n" +

                        "Products:\n\n" +

                        products +

                        "\nTotal : ₹" + order.getTotalAmount() +

                        "\n\nOrder Status : " + order.getOrderStatus() +

                        "\nPayment Status : " + order.getPaymentStatus() +

                        "\n\nWe'll notify you once your order is shipped."

        );

        mailSender.send(customerMail);

        // Email to Company
        SimpleMailMessage companyMail = new SimpleMailMessage();

        companyMail.setTo(companyEmail);

        companyMail.setSubject("New Order Received #" + order.getId());

        companyMail.setText(

                "Customer : " + order.getCustomerName() +

                        "\nEmail : " + order.getEmail() +

                        "\nPhone : " + order.getPhone() +

                        "\n\nShipping Address:\n" +

                        order.getAddress() + ", " +

                        order.getCity() + ", " +

                        order.getState() + " - " +

                        order.getPincode() +

                        "\n\nProducts:\n\n" +

                        products +

                        "\nTotal : ₹" + order.getTotalAmount()

        );

        mailSender.send(companyMail);
    }

}