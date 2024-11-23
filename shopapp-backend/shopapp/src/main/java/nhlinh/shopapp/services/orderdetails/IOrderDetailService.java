package nhlinh.shopapp.services.orderdetails;

import nhlinh.shopapp.dtos.OrderDetailDTO;
import nhlinh.shopapp.exceptions.DataNotFoundException;
import nhlinh.shopapp.models.OrderDetail;

import java.util.List;

public interface IOrderDetailService {

    OrderDetail createOrderDetail(OrderDetailDTO newOrderDetail) throws Exception;

    OrderDetail getOrderDetail(Long id) throws DataNotFoundException;

    OrderDetail updateOrderDetail(Long id, OrderDetailDTO newOrderDetailData)
            throws DataNotFoundException;

    void deleteById(Long id);

    List<OrderDetail> findByOrderId(Long orderId);


}
