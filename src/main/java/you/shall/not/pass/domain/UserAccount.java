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
public class UserAccount {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private String userName;
    private char[] level1Password;
    private char[] level2Password;
    //TODO implement this
    private int failedAuthAttempts;
    private boolean disabled;
    //TODO use instants
    private Date disabledDate;
}
