import { Order } from './../entities/Order';
import { getConnection } from 'typeorm';

/**
 * Wrapper class used to interact with the Users table of the database.
 */
export class OrdersRepository {
    /**
     * Retrieve a single order object by ID
     * @param id ID of order to retrieve
     * @return order corresponding to the given ID if found, undefined otherwise
     */
    public async getOrderById(id: string): Promise<Order | undefined> {
        const order = await getConnection().getRepository(Order)
            .createQueryBuilder("order").where('order.id = :id', { id }).getOne();
        return order;
    }
}