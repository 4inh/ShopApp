package nhlinh.shopapp.repositories;

import nhlinh.shopapp.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Optional<Coupon> findByCode(String couponCode);
}