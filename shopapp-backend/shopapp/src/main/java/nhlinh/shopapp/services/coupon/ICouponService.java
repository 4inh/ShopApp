package nhlinh.shopapp.services.coupon;

public interface ICouponService {

    double calculateCouponValue(String couponCode, double totalAmount);
}
