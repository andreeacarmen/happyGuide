package hg;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Andreea on 11.12.2016.
 */

public class Credentials {

    private int id;

    public String username;
    public String password;

    public Credentials(){

    }
    public Credentials(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
