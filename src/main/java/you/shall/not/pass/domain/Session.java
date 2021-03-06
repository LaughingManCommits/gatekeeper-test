package you.shall.not.pass.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Setter
@Getter
public class Session {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String sessionId;
    private AccessLevel level;
    private Long userId;
    private String token;
    //TODO use instants
    private Date date;
}
