package hg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/users/{userName}")
class UserRestController {

    private final UserRepository userRepository;


    @Autowired
    UserRestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    User userDetails(@PathVariable String userName) {
        this.validateUser(userName);
        return this.userRepository.findByUsername(userName);
    }


    @RequestMapping(method = RequestMethod.POST,
            value = "/new",
            headers="Accept=application/json",
            produces= MediaType.APPLICATION_JSON_VALUE,
            consumes="*/*")
    ResponseEntity<?> add(@PathVariable String userName, @RequestBody User user) {

        User newUser = userRepository.save(new User(userName, "parola"));
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(newUser.getId()).toUri();

        return ResponseEntity.created(location).build();

    }


    private void validateUser(String userName) {
        if(userRepository.findByUsername(userName) == null) {
            throw new UserNotFoundException(userName);
        }
    }
}