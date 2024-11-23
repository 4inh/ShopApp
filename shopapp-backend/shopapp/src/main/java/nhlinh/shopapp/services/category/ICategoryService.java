package nhlinh.shopapp.services.category;

import nhlinh.shopapp.dtos.CategoryDTO;
import nhlinh.shopapp.models.Category;

import java.util.List;

public interface ICategoryService {

    Category createCategory(CategoryDTO category);

    Category getCategoryById(long id);

    List<Category> getAllCategories();

    Category updateCategory(long categoryId, CategoryDTO category);

    Category deleteCategory(long id) throws Exception;

}
