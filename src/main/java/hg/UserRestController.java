package hg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.authentication.UserCredentials;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("/users")
class UserRestController {

    private final UserRepository userRepository;


    @Autowired
    UserRestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.GET,
                    value = "/{userName}")
    User userDetails(@PathVariable String userName) {
        this.validateUser(userName);
        return this.userRepository.findByUsername(userName);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.GET)

    List<User> allUsers() {
        return this.userRepository.findAllByOrderByIdAsc();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.POST,
            value = "/new",
            headers="Accept=application/json",
            produces= MediaType.APPLICATION_JSON_VALUE,
            consumes="*/*")
    ResponseEntity<?> add(@RequestBody User user) {

        User newUser = userRepository.save(new User(user.username, user.name, user.password, user.getLocation(), user.getDescription(), user.getEmail(), user.getHourRate()));
        System.out.println(newUser.username);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(newUser.getId()).toUri();

        return ResponseEntity.created(location).build();

    }


    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.POST,
            value = "/edit",
            headers="Accept=application/json",
            produces= MediaType.APPLICATION_JSON_VALUE,
            consumes="*/*")
    ResponseEntity<?> edit(@RequestBody User user) {

        User userR = userRepository.findByUsername(user.username);
        userRepository.delete(userR);

        User newUser = userRepository.save(new User(user.username, user.name, user.password, user.getLocation(), user.getDescription(), user.getEmail(), user.getHourRate()));
        System.out.println(newUser.username);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(newUser.getId()).toUri();

        return ResponseEntity.created(location).build();

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.POST,
            value = "/login",
            headers="Accept=application/json",
            consumes="*/*")
    public UUID auth(@RequestBody Credentials cred){
        String userName = cred.username;
        String password = cred.password;

        System.out.println("username" + userName + "password " + password);
      //  String password = "" + cred.password.hashCode();

        User user = this.userRepository.findByUsername(userName);
        System.out.println(userName);
        System.out.println(user.username);
        System.out.println(user.password);
        if(user == null || user.password.compareTo(cred.password) != 0){
            System.out.println("null");
            return null;
        } else {
            UUID uuid =  UUID.randomUUID();
            System.out.println(uuid);
            return uuid;
        }
    }


    private void validateUser(String userName) {
        if(userRepository.findByUsername(userName) == null) {
            throw new UserNotFoundException(userName);
        }
    }
}