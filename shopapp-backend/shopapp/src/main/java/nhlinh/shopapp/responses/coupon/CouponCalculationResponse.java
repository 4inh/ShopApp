package nhlinh.shopapp.responses.coupon;

import com.fasterxml.jackson.annotation.JsonProperty;
import nhlinh.shopapp.models.Comment;
import nhlinh.shopapp.responses.user.UserResponse;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CouponCalculationResponse {

    @JsonProperty("result")
    private Double result;
}
