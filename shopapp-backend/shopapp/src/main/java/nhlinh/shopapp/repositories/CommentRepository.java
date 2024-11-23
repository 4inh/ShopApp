package nhlinh.shopapp.repositories;

import nhlinh.shopapp.models.Category;
import nhlinh.shopapp.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import nhlinh.shopapp.models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUserIdAndProductId(@Param("userId") Long userId,
                                           @Param("productId") Long productId);

    List<Comment> findByProductId(@Param("productId") Long productId);
}