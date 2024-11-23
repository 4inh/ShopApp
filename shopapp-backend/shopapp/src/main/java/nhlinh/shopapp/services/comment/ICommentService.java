package nhlinh.shopapp.services.comment;

import nhlinh.shopapp.dtos.CommentDTO;
import nhlinh.shopapp.exceptions.DataNotFoundException;
import nhlinh.shopapp.models.Comment;
import nhlinh.shopapp.responses.comment.CommentResponse;

import java.util.List;

public interface ICommentService {

    Comment insertComment(CommentDTO comment);

    void deleteComment(Long commentId);

    void updateComment(Long id, CommentDTO commentDTO) throws DataNotFoundException;

    List<CommentResponse> getCommentsByUserAndProduct(Long userId, Long productId);

    List<CommentResponse> getCommentsByProduct(Long productId);
}
