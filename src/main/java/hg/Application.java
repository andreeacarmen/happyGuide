package hg;

/**
 * Created by Andreea on 25.11.2016.
 */
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class Application {

    private final ArrayList<User> users = new ArrayList() {
        {
            add(new User("c.arsenescu", "Catalin Arsenescu", "parola", "Ploiesti", "You won't regret it!", "email", 50));
            add(new User("andreea.i", "Andreea Ifrim", "parola", "Craiova", "Get ready to laugh your way around the city!", "email", 75));
            add(new User("maria194", "Maria", "parola",  "Bucuresti", "I will show you the best places in town!", "email", 75));
            add(new User("john_2017", "John", "parola",  "Roma", "Be prepared to have an unforgetable experience!", "email", 75));
            add(new User("mario_mario", "Mario", "parola",  "Milano", "Read, set, fun!", "email", 75));
            add(new User("geanni23", "Geanni", "parola",  "Bruxelles", "Do you like exploring new places? Then you will sure enjoy traveling around with me", "email", 75));
            add(new User("hana_belete", "Hana", "parola",  "Helsinki", "Looking for the best places to eat and have fun? I am your person", "email", 75));
        }
    };

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository userRepository) {

        return (evt) -> users
                .forEach(
                        a -> {
                            userRepository.save(a);
                        });
    }

}