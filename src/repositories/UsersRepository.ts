import { User } from './../entities/User';
import { getConnection } from 'typeorm';

/**
 * Wrapper class used to interact with the Users table of the database.
 */
export class UsersRepository {
    /**
     * Retrieve a single user object by ID
     * @param id ID of user to retrieve
     * @return user information corresponding to the given ID if found, undefined otherwise
     */
    public async getUserById(id: string): Promise<User | undefined> {
        const user = await getConnection().getRepository(User)
            .createQueryBuilder("user").where('user.id = :id', { id }).getOne();
        return user;
    }
}