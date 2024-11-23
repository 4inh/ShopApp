package nhlinh.shopapp.repositories;

import nhlinh.shopapp.models.Category;
import nhlinh.shopapp.models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
