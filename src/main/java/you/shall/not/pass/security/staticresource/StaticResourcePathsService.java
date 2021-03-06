package you.shall.not.pass.security.staticresource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StaticResourcePathsService {

    @Value("classpath:static/**")
    private Resource[] resources;

    @Value("${static.resources}")
    private String context;

    public List<String> resolveStaticResources(Resource[] staticResource) {
        return Arrays.stream(staticResource)
                .filter(resource -> {
                    try {
                        return resource.getFile().isFile();
                    } catch (IOException e) {
                        // TODO replace with proper exception
                        throw new RuntimeException(e);
                    }
                }).map(resource -> {
                    try {
                        String uri = resource.getURI().toString();
                        return uri.substring(uri.indexOf(context) + context.length());
                    } catch (IOException e) {
                        // TODO replace with proper exception
                        throw new RuntimeException(e);
                    }
                }).collect(Collectors.toList());
    }

    public List<String> getAllStaticResources() {
        return resolveStaticResources(resources);
    }

}
